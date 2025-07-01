package me.project.crowdfunding.Repository;

import me.project.crowdfunding.Entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import me.project.crowdfunding.Entity.User;
import java.util.List;

@Repository

public interface CommunityRepository extends JpaRepository<Community, Long> {
    List<Community> findByCreator(User creator);
    List<Community> findByMembersContaining(User member);
}
