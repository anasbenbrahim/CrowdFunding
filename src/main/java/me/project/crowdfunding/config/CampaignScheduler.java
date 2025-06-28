package me.project.crowdfunding.config;

import me.project.crowdfunding.Service.Campaign.CampaignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class CampaignScheduler {

    @Autowired
    private CampaignService campaignService;

    @Scheduled(cron = "0 0 * * * *")
    public void archiveExpiredCampaigns() {
        campaignService.archiveExpiredCampaigns();
    }
}
