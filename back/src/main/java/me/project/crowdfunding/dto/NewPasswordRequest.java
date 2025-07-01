package me.project.crowdfunding.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewPasswordRequest {
    private String email;
    private String code;
    private String newPassword;
}

