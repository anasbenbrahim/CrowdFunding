package me.project.crowdfunding.Repository;

import me.project.crowdfunding.Entity.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, Long> {
    List<Campaign> findByArchivedFalse();
    List<Campaign> findByEndDateBeforeAndArchivedFalse(LocalDateTime dateTime);
    List<Campaign> findByCommunitiesId(Long communityId);
}
