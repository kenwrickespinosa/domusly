package com.kenwrickespinosa.server_api.savedListing;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UuidGenerator;

import com.kenwrickespinosa.server_api.post.Post;
import com.kenwrickespinosa.server_api.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "saved_listings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SavedListing {
    @Id
    @Column(name = "saved_listing_id")
    @GeneratedValue
    @UuidGenerator
    private UUID savedListingId;

    @CreationTimestamp
    private LocalDateTime savedAt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;
}
