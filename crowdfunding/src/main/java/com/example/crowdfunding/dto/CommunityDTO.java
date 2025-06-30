package com.example.crowdfunding.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommunityDTO {
    private Long id;
    private String name;
    private String description;
    private LocalDateTime createdAt;
    private UserDTO creator;
    private Set<UserDTO> members;
    private int memberCount;
}