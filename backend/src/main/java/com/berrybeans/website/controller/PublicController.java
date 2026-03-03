package com.berrybeans.website.controller;

import com.berrybeans.website.model.Project;
import com.berrybeans.website.model.Job;
import com.berrybeans.website.model.ContactMessage;
import com.berrybeans.website.repository.ProjectRepository;
import com.berrybeans.website.repository.JobRepository;
import com.berrybeans.website.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public")
@CrossOrigin(origins = "*")
public class PublicController {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @GetMapping("/projects")
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @GetMapping("/jobs")
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @PostMapping("/contact")
    public ResponseEntity<?> submitContactMessage(@RequestBody ContactMessage message) {
        contactMessageRepository.save(message);
        return ResponseEntity.ok("Message sent successfully!");
    }
}
