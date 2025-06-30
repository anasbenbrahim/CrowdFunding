package com.example.crowdfunding.controller;

import com.example.crowdfunding.dto.CommunityDTO;
import com.example.crowdfunding.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/communities")
public class CommunityController {

    @Autowired
    private CommunityService communityService;
    
    @GetMapping
    public ResponseEntity<List<CommunityDTO>> getAllCommunities() {
        return ResponseEntity.ok(communityService.getAllCommunities());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CommunityDTO> getCommunityById(@PathVariable Long id) {
        return communityService.getCommunityById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<CommunityDTO> createCommunity(@RequestBody Map<String, Object> payload) {
        String name = (String) payload.get("name");
        String description = (String) payload.get("description");
        Long creatorId = Long.valueOf(payload.get("creatorId").toString());
        
        CommunityDTO createdCommunity = communityService.createCommunity(name, description, creatorId);
        return new ResponseEntity<>(createdCommunity, HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<CommunityDTO> updateCommunity(
            @PathVariable Long id,
            @RequestBody Map<String, String> payload) {
        String name = payload.get("name");
        String description = payload.get("description");
        
        CommunityDTO updatedCommunity = communityService.updateCommunity(id, name, description);
        return ResponseEntity.ok(updatedCommunity);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommunity(@PathVariable Long id) {
        communityService.deleteCommunity(id);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/{communityId}/members/{userId}")
    public ResponseEntity<CommunityDTO> addMember(
            @PathVariable Long communityId,
            @PathVariable Long userId) {
        CommunityDTO updatedCommunity = communityService.addMember(communityId, userId);
        return ResponseEntity.ok(updatedCommunity);
    }
    
    @DeleteMapping("/{communityId}/members/{userId}")
    public ResponseEntity<CommunityDTO> removeMember(
            @PathVariable Long communityId,
            @PathVariable Long userId) {
        CommunityDTO updatedCommunity = communityService.removeMember(communityId, userId);
        return ResponseEntity.ok(updatedCommunity);
    }
    
    @GetMapping("/creator/{creatorId}")
    public ResponseEntity<List<CommunityDTO>> getCommunityByCreator(@PathVariable Long creatorId) {
        return ResponseEntity.ok(communityService.getCommunityByCreator(creatorId));
    }
    
    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<CommunityDTO>> getCommunityByMember(@PathVariable Long memberId) {
        return ResponseEntity.ok(communityService.getCommunityByMember(memberId));
    }
}