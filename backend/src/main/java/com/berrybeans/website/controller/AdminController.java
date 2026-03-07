package com.berrybeans.website.controller;

import com.berrybeans.website.model.Project;
import com.berrybeans.website.model.Job;
import com.berrybeans.website.model.ContactMessage;
import com.berrybeans.website.model.LeadershipMember;
import com.berrybeans.website.repository.ProjectRepository;
import com.berrybeans.website.repository.JobRepository;
import com.berrybeans.website.repository.ContactMessageRepository;
import com.berrybeans.website.repository.LeadershipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.lang.NonNull;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @Autowired
    private LeadershipRepository leadershipRepository;

    // Projects CRUD
    @GetMapping("/projects")
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @PostMapping("/projects")
    public Project createProject(@RequestBody @NonNull Project project) {
        return projectRepository.save(project);
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable @NonNull Long id) {
        projectRepository.deleteById(id);
        return ResponseEntity.ok("Project deleted");
    }

    // Jobs CRUD
    @GetMapping("/jobs")
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @PostMapping("/jobs")
    public Job createJob(@RequestBody @NonNull Job job) {
        return jobRepository.save(job);
    }

    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable @NonNull Long id) {
        jobRepository.deleteById(id);
        return ResponseEntity.ok("Job deleted");
    }

    // Contact Messages View
    @GetMapping("/messages")
    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findAll();
    }

    @DeleteMapping("/messages/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable @NonNull Long id) {
        contactMessageRepository.deleteById(id);
        return ResponseEntity.ok("Message deleted");
    }

    // Leadership CRUD
    @GetMapping("/leadership")
    public List<LeadershipMember> getAllLeadership() {
        return leadershipRepository.findAll();
    }

    @PostMapping("/leadership")
    public LeadershipMember createLeader(@RequestBody @NonNull LeadershipMember member) {
        return leadershipRepository.save(member);
    }

    @PutMapping("/leadership/{id}")
    public ResponseEntity<?> updateLeader(@PathVariable @NonNull Long id,
            @RequestBody @NonNull LeadershipMember updated) {
        return leadershipRepository.findById(id).map(existing -> {
            existing.setName(updated.getName());
            existing.setPhotoUrl(updated.getPhotoUrl());
            existing.setPosition(updated.getPosition());
            existing.setDescription(updated.getDescription());
            existing.setLinkedinUrl(updated.getLinkedinUrl());
            return ResponseEntity.ok(leadershipRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/leadership/{id}")
    public ResponseEntity<?> deleteLeader(@PathVariable @NonNull Long id) {
        leadershipRepository.deleteById(id);
        return ResponseEntity.ok("Leadership member deleted");
    }
}
