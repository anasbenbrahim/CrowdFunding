package me.project.crowdfunding.Repository;

import me.project.crowdfunding.Entity.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {
    List<Campaign> findByArchivedFalse();
    List<Campaign> findByEndDateBeforeAndArchivedFalse(LocalDateTime dateTime);
    List<Campaign> findByCommunitiesId(Long communityId);
}
