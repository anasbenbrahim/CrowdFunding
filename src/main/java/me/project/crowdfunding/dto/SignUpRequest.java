package me.project.crowdfunding.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.project.crowdfunding.Enum.UserRole;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignUpRequest {
    private String email;
    private String password ;
    private String firstName ;
    private String lastName;
    private String address;
    private String phoneNumber;
    private UserRole role ;
    
}
