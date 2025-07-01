package me.project.crowdfunding.Controller;

import lombok.RequiredArgsConstructor;
import me.project.crowdfunding.Entity.Campaign;
import me.project.crowdfunding.Service.Campaign.CampaignService;
import me.project.crowdfunding.dto.CampaignDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/campaign")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class CampaignController {

    @Autowired
    private CampaignService campaignService;

    @PostMapping
    public ResponseEntity<Campaign> createCampaign(@RequestBody CampaignDTO campaignDTO) {
        Campaign campaign = campaignService.createCampaign(campaignDTO);
        return ResponseEntity.ok(campaign);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Campaign> updateCampaign(@PathVariable Long id, @RequestBody CampaignDTO campaignDTO) {
        Campaign campaign = campaignService.updateCampaign(id, campaignDTO);
        return ResponseEntity.ok(campaign);
    }

    @PostMapping("/{campaignId}/communities/{communityId}")
    public ResponseEntity<Campaign> addCommunityToCampaign(@PathVariable Long campaignId, @PathVariable Long communityId) {
        Campaign campaign = campaignService.addCommunityToCampaign(campaignId, communityId);
        return ResponseEntity.ok(campaign);
    }

    @DeleteMapping("/{campaignId}/communities/{communityId}")
    public ResponseEntity<Campaign> removeCommunityFromCampaign(@PathVariable Long campaignId, @PathVariable Long communityId) {
        Campaign campaign = campaignService.removeCommunityFromCampaign(campaignId, communityId);
        return ResponseEntity.ok(campaign);
    }

    @GetMapping("/community/{communityId}")
    public ResponseEntity<List<Campaign>> getCampaignsByCommunity(@PathVariable Long communityId) {
        List<Campaign> campaigns = campaignService.getCampaignsByCommunity(communityId);
        return ResponseEntity.ok(campaigns);
    }

    @GetMapping("/achifage")
    public ResponseEntity<List<Campaign>> getActiveCampaigns() {
        List<Campaign> campaigns = campaignService.getActiveCampaigns();
        return ResponseEntity.ok(campaigns);
    }

}
