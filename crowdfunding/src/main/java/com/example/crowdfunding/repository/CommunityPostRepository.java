package com.example.crowdfunding.repository;

import com.example.crowdfunding.model.CommunityPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityPostRepository extends JpaRepository<CommunityPost, Long> {
    List<CommunityPost> findByCommunityIdOrderByCreatedAtDesc(Long communityId);
}