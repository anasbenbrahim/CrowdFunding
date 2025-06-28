package me.project.crowdfunding.Service.Campaign;

import me.project.crowdfunding.Entity.Campaign;
import me.project.crowdfunding.dto.CampaignDTO;

import java.util.List;

public interface CampaignService {
    Campaign createCampaign(CampaignDTO campaignDTO);
    Campaign updateCampaign(Long id, CampaignDTO campaignDTO);
    Campaign addCommunityToCampaign(Long campaignId, Long communityId);
    Campaign removeCommunityFromCampaign(Long campaignId, Long communityId);
    List<Campaign> getCampaignsByCommunity(Long communityId);
    List<Campaign> getActiveCampaigns();
    void archiveExpiredCampaigns();
}
