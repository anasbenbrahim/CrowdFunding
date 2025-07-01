package me.project.crowdfunding.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "_campaigns")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Campaign {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private Double goalAmount;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private boolean archived;

    @ManyToOne
    private User user;

    @OneToMany()
    private List<Community> communities;
}
