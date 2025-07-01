package me.project.crowdfunding.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor @AllArgsConstructor
public class CampaignDTO {
    private Long id;
    private String title;
    private String description;
    private Double goalAmount;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Long creatorId;
    private List<Long> communityIds;
}
