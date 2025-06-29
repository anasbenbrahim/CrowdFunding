package com.example.crowdfunding.service;

import com.example.crowdfunding.dto.CommunityPostDTO;
import com.example.crowdfunding.dto.UserDTO;
import com.example.crowdfunding.model.Community;
import com.example.crowdfunding.model.CommunityPost;
import com.example.crowdfunding.model.User;
import com.example.crowdfunding.repository.CommunityPostRepository;
import com.example.crowdfunding.repository.CommunityRepository;
import com.example.crowdfunding.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommunityPostService {

    @Autowired
    private CommunityPostRepository communityPostRepository;
    
    @Autowired
    private CommunityRepository communityRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<CommunityPostDTO> getPostsByCommunity(Long communityId) {
        return communityPostRepository.findByCommunityIdOrderByCreatedAtDesc(communityId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public CommunityPostDTO createPost(Long communityId, Long authorId, String content) {
        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new RuntimeException("Community not found"));
        
        User author = userRepository.findById(authorId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Check if user is a member of the community
        if (!community.getMembers().contains(author)) {
            throw new RuntimeException("User is not a member of this community");
        }
        
        CommunityPost post = new CommunityPost();
        post.setCommunity(community);
        post.setAuthor(author);
        post.setContent(content);
        
        CommunityPost savedPost = communityPostRepository.save(post);
        return convertToDTO(savedPost);
    }
    
    @Transactional
    public void deletePost(Long postId, Long userId) {
        CommunityPost post = communityPostRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        
        // Only the author or community creator can delete a post
        if (!post.getAuthor().getId().equals(userId) && 
            !post.getCommunity().getCreator().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to delete this post");
        }
        
        communityPostRepository.deleteById(postId);
    }
    
    private CommunityPostDTO convertToDTO(CommunityPost post) {
        CommunityPostDTO dto = new CommunityPostDTO();
        dto.setId(post.getId());
        dto.setContent(post.getContent());
        dto.setCreatedAt(post.getCreatedAt());
        
        UserDTO authorDTO = new UserDTO();
        authorDTO.setId(post.getAuthor().getId());
        authorDTO.setUsername(post.getAuthor().getUsername());
        authorDTO.setEmail(post.getAuthor().getEmail());
        dto.setAuthor(authorDTO);
        
        return dto;
    }
}