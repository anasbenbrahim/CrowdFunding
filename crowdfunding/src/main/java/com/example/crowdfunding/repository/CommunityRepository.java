package com.example.crowdfunding.repository;

import com.example.crowdfunding.model.Community;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Long> {
    List<Community> findByCreatorId(Long creatorId);
    List<Community> findByMembersId(Long memberId);
}