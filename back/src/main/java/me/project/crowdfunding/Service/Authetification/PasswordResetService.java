package me.project.crowdfunding.Service.Authetification;

public interface PasswordResetService {
    void sendResetCode(String email);
    boolean verifyCode(String email, String code);
    void resetPassword(String email, String code, String newPassword);
}
