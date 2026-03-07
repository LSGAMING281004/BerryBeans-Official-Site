package com.berrybeans.website.repository;

import com.berrybeans.website.model.LeadershipMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeadershipRepository extends JpaRepository<LeadershipMember, Long> {
}
