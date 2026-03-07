package com.berrybeans.website.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "leadership_members")
@Data
public class LeadershipMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String photoUrl;

    @Column(nullable = false)
    private String position;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String linkedinUrl;
}
