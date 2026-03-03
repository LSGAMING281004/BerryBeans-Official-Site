package com.berrybeans.website.repository;

import com.berrybeans.website.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
