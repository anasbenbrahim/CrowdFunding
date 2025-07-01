package com.example.crowdfunding.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String username;
    private String email;
    private String password;
    
    @ManyToMany(mappedBy = "members")
    private Set<Community> communities = new HashSet<>();
    
    @OneToMany(mappedBy = "creator")
    private Set<Community> createdCommunities = new HashSet<>();
}