package com.example.crowdfunding.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String description;
    private BigDecimal fundingGoal;
    private BigDecimal currentFunding;
    private LocalDateTime deadline;
    private LocalDateTime createdAt;
    
    @ManyToOne
    @JoinColumn(name = "creator_id")
    private User creator;
    
    // Add relationship to community
    @ManyToOne
    @JoinColumn(name = "community_id")
    private Community community;
    
    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        if (currentFunding == null) {
            currentFunding = BigDecimal.ZERO;
        }
    }
}