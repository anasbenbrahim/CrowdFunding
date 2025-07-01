package me.project.crowdfunding.Controller;

import me.project.crowdfunding.Entity.Community;
import me.project.crowdfunding.Service.Community.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/communities")
public class CommunityController {

    private final CommunityService communityService;

    @Autowired
    public CommunityController(CommunityService communityService) {
        this.communityService = communityService;
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Community> createCommunity(@RequestBody Community community, @PathVariable Long userId) {
        Community createdCommunity = communityService.createCommunity(community, userId);
        return new ResponseEntity<>(createdCommunity, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Community> getCommunityById(@PathVariable Long id) {
        Community community = communityService.getCommunityById(id);
        return ResponseEntity.ok(community);
    }

    @GetMapping
    public ResponseEntity<List<Community>> getAllCommunities() {
        List<Community> communities = communityService.getAllCommunities();
        return ResponseEntity.ok(communities);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Community> updateCommunity(@PathVariable Long id, @RequestBody Community communityDetails) {
        Community updatedCommunity = communityService.updateCommunity(id, communityDetails);
        return ResponseEntity.ok(updatedCommunity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommunity(@PathVariable Long id) {
        communityService.deleteCommunity(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{communityId}/members/{userId}")
    public ResponseEntity<Community> addMemberToCommunity(@PathVariable Long communityId, @PathVariable Long userId) {
        Community community = communityService.addMember(communityId, userId);
        return ResponseEntity.ok(community);
    }

    @DeleteMapping("/{communityId}/members/{userId}")
    public ResponseEntity<Community> removeMemberFromCommunity(@PathVariable Long communityId, @PathVariable Long userId) {
        Community community = communityService.removeMember(communityId, userId);
        return ResponseEntity.ok(community);
    }

    @GetMapping("/creator/{userId}")
    public ResponseEntity<List<Community>> getCommunitiesByCreator(@PathVariable Long userId) {
        List<Community> communities = communityService.getCommunitiesByCreator(userId);
        return ResponseEntity.ok(communities);
    }

    @GetMapping("/member/{userId}")
    public ResponseEntity<List<Community>> getCommunitiesByMember(@PathVariable Long userId) {
        List<Community> communities = communityService.getCommunitiesByMember(userId);
        return ResponseEntity.ok(communities);
    }
}