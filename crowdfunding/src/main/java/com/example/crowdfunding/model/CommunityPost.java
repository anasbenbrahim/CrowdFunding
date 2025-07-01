package com.example.crowdfunding.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommunityPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String content;
    private LocalDateTime createdAt;
    
    @ManyToOne
    @JoinColumn(name = "community_id")
    private Community community;
    
    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;
    
    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }
}