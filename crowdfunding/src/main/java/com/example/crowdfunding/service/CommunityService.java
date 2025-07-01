package com.example.crowdfunding.service;

import com.example.crowdfunding.dto.CommunityDTO;
import com.example.crowdfunding.dto.UserDTO;
import com.example.crowdfunding.model.Community;
import com.example.crowdfunding.model.User;
import com.example.crowdfunding.repository.CommunityRepository;
import com.example.crowdfunding.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommunityService {

    @Autowired
    private CommunityRepository communityRepository;

    @Autowired
    private UserRepository userRepository;

    public List<CommunityDTO> getAllCommunities() {
        return communityRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<CommunityDTO> getCommunityById(Long id) {
        return communityRepository.findById(id)
                .map(this::convertToDTO);
    }

    @Transactional
    public CommunityDTO createCommunity(String name, String description, Long creatorId) {
        User creator = userRepository.findById(creatorId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Community community = new Community();
        community.setName(name);
        community.setDescription(description);
        community.setCreator(creator);
        community.getMembers().add(creator); // Creator is automatically a member

        Community savedCommunity = communityRepository.save(community);
        return convertToDTO(savedCommunity);
    }

    @Transactional
    public CommunityDTO updateCommunity(Long id, String name, String description) {
        Community community = communityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Community not found"));

        community.setName(name);
        community.setDescription(description);

        Community updatedCommunity = communityRepository.save(community);
        return convertToDTO(updatedCommunity);
    }

    @Transactional
    public void deleteCommunity(Long id) {
        communityRepository.deleteById(id);
    }

    @Transactional
    public CommunityDTO addMember(Long communityId, Long userId) {
        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new RuntimeException("Community not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        community.getMembers().add(user);
        Community updatedCommunity = communityRepository.save(community);
        return convertToDTO(updatedCommunity);
    }

    @Transactional
    public CommunityDTO removeMember(Long communityId, Long userId) {
        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new RuntimeException("Community not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        community.getMembers().remove(user);
        Community updatedCommunity = communityRepository.save(community);
        return convertToDTO(updatedCommunity);
    }

    public List<CommunityDTO> getCommunityByCreator(Long creatorId) {
        return communityRepository.findByCreatorId(creatorId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<CommunityDTO> getCommunityByMember(Long memberId) {
        return communityRepository.findByMembersId(memberId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateCommunityContribution(Long communityId, Double amount) {
        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new RuntimeException("Community not found"));
        community.setTotalContributions(community.getTotalContributions() + amount);
        communityRepository.save(community);
    }

    private CommunityDTO convertToDTO(Community community) {
        CommunityDTO dto = new CommunityDTO();
        dto.setId(community.getId());
        dto.setName(community.getName());
        dto.setDescription(community.getDescription());
        dto.setCreatedAt(community.getCreatedAt());
        
        // Set creator
        UserDTO creatorDTO = new UserDTO();
        creatorDTO.setId(community.getCreator().getId());
        creatorDTO.setUsername(community.getCreator().getUsername());
        creatorDTO.setEmail(community.getCreator().getEmail());
        dto.setCreator(creatorDTO);
        
        // Set members
        dto.setMembers(community.getMembers().stream()
                .map(user -> {
                    UserDTO userDTO = new UserDTO();
                    userDTO.setId(user.getId());
                    userDTO.setUsername(user.getUsername());
                    userDTO.setEmail(user.getEmail());
                    return userDTO;
                })
                .collect(Collectors.toSet()));
        
        dto.setMemberCount(community.getMemberCount());
        
        return dto;
    }
}
