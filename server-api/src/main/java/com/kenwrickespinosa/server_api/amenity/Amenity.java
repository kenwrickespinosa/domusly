package com.kenwrickespinosa.server_api.amenity;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kenwrickespinosa.server_api.post.Post;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "amenities")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Amenity {
    
    @Id
    @Column(name = "amenity_id")
    @GeneratedValue
    @UuidGenerator
    private UUID amenityId;

    @Column(nullable = false, unique = true)
    private String name;

    @ManyToMany(mappedBy = "amenities")
    @JsonIgnore
    private Set<Post> posts = new HashSet<>();
}
