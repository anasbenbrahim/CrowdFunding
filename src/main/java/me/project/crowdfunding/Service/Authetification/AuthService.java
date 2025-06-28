package me.project.crowdfunding.Service.Authetification;

import me.project.crowdfunding.Entity.User;
import me.project.crowdfunding.dto.AuthentificationRequest;
import me.project.crowdfunding.dto.AuthetificationResponse;
import me.project.crowdfunding.dto.ResetPasswordDto;
import me.project.crowdfunding.dto.SignUpRequest;
import org.springframework.http.ResponseEntity;
import io.jsonwebtoken.io.IOException;
import jakarta.servlet.http.HttpServletResponse;

import java.util.List;

public interface AuthService {

    // Authentication Methods
    AuthetificationResponse register(SignUpRequest signUpRequest);
    
    ResponseEntity<String> login(AuthentificationRequest authenticationRequest, 
                               HttpServletResponse response) throws IOException;

    // User Management Methods
    List<User> users();
    
    String deleteUser(Long id);
    
    User getUser(Long userId);
    
    SignUpRequest updateUserProfile(Long userId, SignUpRequest signUpRequest);

    // Password Management
    User resetPassword(ResetPasswordDto resetPasswordDto);
}