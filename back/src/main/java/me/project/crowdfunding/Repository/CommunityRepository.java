package me.project.crowdfunding.Repository;

import me.project.crowdfunding.Entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Long> {
}
