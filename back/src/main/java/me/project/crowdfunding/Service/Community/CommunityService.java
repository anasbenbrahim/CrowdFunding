package me.project.crowdfunding.Service.Community;

import me.project.crowdfunding.Entity.Community;
import me.project.crowdfunding.Entity.User;

import java.util.List;

public interface CommunityService {
    Community createCommunity(Community community, Long userId);
    Community getCommunityById(Long id);
    List<Community> getAllCommunities();
    Community updateCommunity(Long id, Community communityDetails);
    void deleteCommunity(Long id);
    Community addMember(Long communityId, Long userId);
    Community removeMember(Long communityId, Long userId);
    List<Community> getCommunitiesByCreator(Long userId);
    List<Community> getCommunitiesByMember(Long userId);
}