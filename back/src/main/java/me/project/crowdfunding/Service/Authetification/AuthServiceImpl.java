package me.project.crowdfunding.Service.Authetification;

import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.project.crowdfunding.Entity.User;
import me.project.crowdfunding.Enum.UserRole;
import me.project.crowdfunding.Repository.UserRepository;
import me.project.crowdfunding.Service.EmailService;
import me.project.crowdfunding.dto.*;
import me.project.crowdfunding.exceptions.EmailAlreadyExistsException;
import me.project.crowdfunding.exceptions.UserNotFoundException;
import me.project.crowdfunding.security.LoginAttemptService;
import me.project.crowdfunding.utils.JwtUtil;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {


    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private LoginAttemptService loginAttemptService;


    @Override
    public AuthetificationResponse register(SignUpRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new EmailAlreadyExistsException("Email already in use: " + signUpRequest.getEmail());
        }

        String verificationCode = UUID.randomUUID().toString();
        UserRole role = signUpRequest.getRole() != null ? signUpRequest.getRole() : UserRole.SIMPLE_USER;

        User user = User.builder()
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .firstName(signUpRequest.getFirstName())
                .lastName(signUpRequest.getLastName())
                .address(signUpRequest.getAddress())
                .phoneNumber(signUpRequest.getPhoneNumber())
                .role(role)
                .isEmailVerified(false)
                .emailVerificationCode(verificationCode)
                .build();

        userRepository.save(user);
        emailService.sendVerificationEmail(user.getEmail(), verificationCode);

        return AuthetificationResponse.builder()
                .Token("Vérifiez votre email pour activer votre compte")
                .build();
    }

   @Override
    public ResponseEntity<String> login(AuthentificationRequest authenticationRequest,
                                    HttpServletResponse response) throws IOException {

    String email = authenticationRequest.getEmail();

    if (loginAttemptService.isBlocked(email)) {
        return ResponseEntity.status(HttpStatus.LOCKED)
                .body("Trop de tentatives échouées. Compte bloqué pour 15 minutes.");
    }

    try {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, authenticationRequest.getPassword())
        );
    } catch (BadCredentialsException e) {
        loginAttemptService.loginFailed(email);

        int remainingAttempts = 5 - loginAttemptService.getAttempts(email);
        if (remainingAttempts <= 0) {
            emailService.sendLockNotification(email);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Email ou mot de passe incorrect. Tentatives restantes : " + Math.max(0, remainingAttempts));
    }


    loginAttemptService.loginSucceeded(email);

    Optional<User> userOptional = userRepository.findByEmail(email);
    if (userOptional.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur introuvable.");
    }

    User user = userOptional.get();
    if (!user.isEmailVerified()) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body("Veuillez vérifier votre adresse email avant de vous connecter.");
    }

    String jwtToken = jwtUtil.generateToken(user);
    JSONObject jsonResponse = new JSONObject()
            .put("userId", user.getId())
            .put("role", user.getRole());

    response.addHeader("Access-Control-Expose-Headers", "Authorization");
    response.addHeader("Access-Control-Allow-Headers",
            "Authorization,X-PINGOTHER,Origin,X-Requested-With,Content-Type,Accept,X-Custom-header");
    response.addHeader("Authorization", "Bearer " + jwtToken);

    return ResponseEntity.ok().body(jsonResponse.toString());
    }
    


    @Override
    public List<User> users() {
        return userRepository.findAll();
    }

    @Override
    public String deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            return "Échec : utilisateur avec ID " + id + " introuvable.";
        }
        userRepository.deleteById(id);
        return "Succès : utilisateur avec ID " + id + " supprimé.";
    }

    @Override
    public User getUser(Long userId) {
        return userRepository.findById(userId)
                            .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
    }

    @Override
    public SignUpRequest updateUserProfile(Long userId, SignUpRequest signUpRequest) {
        User user = userRepository.findById(userId)
                                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));

        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        user.setAddress(signUpRequest.getAddress());
        user.setPhoneNumber(signUpRequest.getPhoneNumber());
        user.setEmail(signUpRequest.getEmail());

        userRepository.save(user);
        return signUpRequest;
    }




    @Override
    public User resetPassword(ResetPasswordDto resetPasswordDto) {
        log.info("Processing password update for userID: {}", resetPasswordDto.getUserId());

        User user = userRepository.findById(resetPasswordDto.getUserId())
                                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(resetPasswordDto.getOldPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid old password");
        }

        user.setPassword(passwordEncoder.encode(resetPasswordDto.getNewPassword()));
        return userRepository.save(user);
    }


    @PostConstruct
    public void createAdminAccount() {
        if (userRepository.findUserByRole(UserRole.ADMIN).isEmpty()) {
            User admin = User.builder()
                .email("admin@test.com")
                .firstName("Admin")
                .lastName("Admin")
                .phoneNumber("123456789")
                .address("Admin Address")
                .role(UserRole.ADMIN)
                .password(passwordEncoder.encode("admin"))
                .isEmailVerified(true)
                .build();
            
            userRepository.save(admin);
            log.info("Admin account created successfully");
        }
    }
}