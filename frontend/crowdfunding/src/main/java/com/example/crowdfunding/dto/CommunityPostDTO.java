package com.example.crowdfunding.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommunityPostDTO {
    private Long id;
    private String content;
    private LocalDateTime createdAt;
    private UserDTO author;
}