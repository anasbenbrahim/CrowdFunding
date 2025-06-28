package me.project.crowdfunding.Service.Campaign;


import lombok.RequiredArgsConstructor;
import me.project.crowdfunding.Entity.Campaign;
import me.project.crowdfunding.Entity.Community;
import me.project.crowdfunding.Entity.User;
import me.project.crowdfunding.Repository.CampaignRepository;
import me.project.crowdfunding.Repository.CommunityRepository;
import me.project.crowdfunding.Repository.UserRepository;
import me.project.crowdfunding.dto.CampaignDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.Override;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CampaignServiceImpl implements CampaignService{

    @Autowired
    private CampaignRepository campaignRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommunityRepository communityRepository;

    @Override
    public Campaign createCampaign(CampaignDTO campaignDTO) {
        Campaign campaign = new Campaign();
        campaign.setTitle(campaignDTO.getTitle());
        campaign.setDescription(campaignDTO.getDescription());
        campaign.setGoalAmount(campaignDTO.getGoalAmount());
        campaign.setStartDate(campaignDTO.getStartDate());
        campaign.setEndDate(campaignDTO.getEndDate());
        campaign.setArchived(false);

        User creator = userRepository.findById(campaignDTO.getCreatorId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        campaign.setUser(creator);

        // Associer les communautés
        if (campaignDTO.getCommunityIds() != null && !campaignDTO.getCommunityIds().isEmpty()) {
            List<Community> communities = communityRepository.findAllById(campaignDTO.getCommunityIds());
            if (communities.size() != campaignDTO.getCommunityIds().size()) {
                throw new RuntimeException("One or more communities not found");
            }
            campaign.setCommunities(communities);
        }

        return campaignRepository.save(campaign);
    }

    @Override
    public Campaign updateCampaign(Long id, CampaignDTO campaignDTO) {
        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));

        campaign.setTitle(campaignDTO.getTitle());
        campaign.setDescription(campaignDTO.getDescription());
        campaign.setGoalAmount(campaignDTO.getGoalAmount());
        campaign.setStartDate(campaignDTO.getStartDate());
        campaign.setEndDate(campaignDTO.getEndDate());

        // Mettre à jour les associations de communautés
        if (campaignDTO.getCommunityIds() != null) {
            List<Community> communities = communityRepository.findAllById(campaignDTO.getCommunityIds());
            if (communities.size() != campaignDTO.getCommunityIds().size()) {
                throw new RuntimeException("One or more communities not found");
            }
            campaign.setCommunities(communities);
        } else {
            campaign.setCommunities(null);
        }

        return campaignRepository.save(campaign);
    }

    @Override
    public Campaign addCommunityToCampaign(Long campaignId, Long communityId) {
        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));
        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new RuntimeException("Community not found"));

        List<Community> communities = campaign.getCommunities();
        if (!communities.contains(community)) {
            communities.add(community);
            campaign.setCommunities(communities);
            return campaignRepository.save(campaign);
        }
        return campaign;
    }

    @Override
    public Campaign removeCommunityFromCampaign(Long campaignId, Long communityId) {
        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));
        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new RuntimeException("Community not found"));

        List<Community> communities = campaign.getCommunities();
        if (communities.remove(community)) {
            campaign.setCommunities(communities);
            return campaignRepository.save(campaign);
        }
        return campaign;
    }

    public List<Campaign> getCampaignsByCommunity(Long communityId) {
        return campaignRepository.findByCommunitiesId(communityId);
    }

    public List<Campaign> getActiveCampaigns() {
        return campaignRepository.findByArchivedFalse();
    }

    @Override
    public void archiveExpiredCampaigns() {
        List<Campaign> expiredCampaigns = campaignRepository.findByEndDateBeforeAndArchivedFalse(LocalDateTime.now());
        expiredCampaigns.forEach(campaign -> {
            campaign.setArchived(true);
            campaignRepository.save(campaign);
        });
    }
    
}
