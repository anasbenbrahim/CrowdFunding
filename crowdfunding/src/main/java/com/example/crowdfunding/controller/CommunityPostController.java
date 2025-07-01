package com.example.crowdfunding.controller;

import com.example.crowdfunding.dto.CommunityPostDTO;
import com.example.crowdfunding.service.CommunityPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/communities/{communityId}/posts")
public class CommunityPostController {

    @Autowired
    private CommunityPostService communityPostService;
    
    @GetMapping
    public ResponseEntity<List<CommunityPostDTO>> getPostsByCommunity(@PathVariable Long communityId) {
        return ResponseEntity.ok(communityPostService.getPostsByCommunity(communityId));
    }
    
    @PostMapping
    public ResponseEntity<CommunityPostDTO> createPost(
            @PathVariable Long communityId,
            @RequestBody Map<String, Object> payload) {
        Long authorId = Long.valueOf(payload.get("authorId").toString());
        String content = (String) payload.get("content");
        
        CommunityPostDTO createdPost = communityPostService.createPost(communityId, authorId, content);
        return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
    }
    
    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deletePost(
            @PathVariable Long communityId,
            @PathVariable Long postId,
            @RequestParam Long userId) {
        communityPostService.deletePost(postId, userId);
        return ResponseEntity.noContent().build();
    }
}