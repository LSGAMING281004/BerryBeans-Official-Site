package com.berrybeans.website.repository;

import com.berrybeans.website.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
}
