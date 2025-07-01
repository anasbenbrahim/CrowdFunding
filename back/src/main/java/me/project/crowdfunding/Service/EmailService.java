package me.project.crowdfunding.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendVerificationEmail(String to, String verificationCode) {
        String subject = "Vérification de votre compte";
        String confirmationUrl = "http://localhost:5000/api/auth/verify?code=" + verificationCode;
        String message = "Cliquez sur le lien pour vérifier votre compte : " + confirmationUrl;
        sendEmail(to, subject, message);
    }

    public void sendLockNotification(String email) {
        String subject = "Compte temporairement bloqué";
        String message = "Votre compte a été bloqué pour 15 minutes en raison de tentatives de connexion échouées. "
                + "Si ce n'était pas vous, veuillez changer votre mot de passe immédiatement.";
        sendEmail(email, subject, message);
    }

    public void sendEmail(String to, String subject, String text) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(to);
        email.setSubject(subject);
        email.setText(text);
        javaMailSender.send(email);
    }

    

    public void sendCode(String to, String code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Code de réinitialisation de mot de passe");
        message.setText("Votre code de réinitialisation est : " + code);
        javaMailSender.send(message);
    }

  



    public void sendPasswordResetEmail(String to, String resetCode) {
        String subject = "Réinitialisation de votre mot de passe";
        String resetUrl = "http://localhost:2000/api/auth/reset-password?code=" + resetCode;
        String message = "Cliquez sur le lien pour réinitialiser votre mot de passe : " + resetUrl;

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(to);
        email.setSubject(subject);
        email.setText(message);
        javaMailSender.send(email);
    }
}

    

