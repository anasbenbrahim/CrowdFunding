package me.project.crowdfunding.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "_communities")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Community {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
