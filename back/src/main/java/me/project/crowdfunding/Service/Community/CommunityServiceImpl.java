package me.project.crowdfunding.Service.Community;

import me.project.crowdfunding.Entity.Community;
import me.project.crowdfunding.Entity.User;
import me.project.crowdfunding.Repository.CommunityRepository;
import me.project.crowdfunding.Repository.UserRepository;
import me.project.crowdfunding.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommunityServiceImpl implements CommunityService {

    private final CommunityRepository communityRepository;
    private final UserRepository userRepository;

    @Autowired
    public CommunityServiceImpl(CommunityRepository communityRepository, UserRepository userRepository) {
        this.communityRepository = communityRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Community createCommunity(Community community, Long userId) {
        User creator = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Creator not found with id: " + userId));
        community.setCreator(creator);
        community.getMembers().add(creator);
        creator.getCommunities().add(community);
        userRepository.save(creator);
        return communityRepository.save(community);
    }

    @Override
    public Community getCommunityById(Long id) {
        return communityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Community not found with id: " + id));
    }

    @Override
    public List<Community> getAllCommunities() {
        return communityRepository.findAll();
    }

    @Override
    public Community updateCommunity(Long id, Community communityDetails) {
        Community community = getCommunityById(id);
        community.setName(communityDetails.getName());
        community.setDescription(communityDetails.getDescription());
        community.setCategory(communityDetails.getCategory());
        return communityRepository.save(community);
    }

    @Override
    public void deleteCommunity(Long id) {
        Community community = getCommunityById(id);
        // Remove community from all members' community lists
        for (User member : community.getMembers()) {
            member.getCommunities().remove(community);
            userRepository.save(member);
        }
        communityRepository.delete(community);
    }

    @Override
    public Community addMember(Long communityId, Long userId) {
        Community community = getCommunityById(communityId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
        if (!community.getMembers().contains(user)) {
            community.getMembers().add(user);
            user.getCommunities().add(community);
            userRepository.save(user);
            communityRepository.save(community);
        }
        return community;
    }

    @Override
    public Community removeMember(Long communityId, Long userId) {
        Community community = getCommunityById(communityId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
        if (community.getMembers().contains(user)) {
            community.getMembers().remove(user);
            user.getCommunities().remove(community);
            userRepository.save(user);
            communityRepository.save(community);
        }
        return community;
    }

    @Override
    public List<Community> getCommunitiesByCreator(Long userId) {
        User creator = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Creator not found with id: " + userId));
        return communityRepository.findByCreator(creator);
    }

    @Override
    public List<Community> getCommunitiesByMember(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
        return communityRepository.findByMembersContaining(user);
    }
}