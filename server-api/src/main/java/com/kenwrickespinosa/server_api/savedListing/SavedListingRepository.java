package com.kenwrickespinosa.server_api.savedListing;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kenwrickespinosa.server_api.post.Post;
import com.kenwrickespinosa.server_api.user.User;

@Repository
public interface SavedListingRepository extends JpaRepository<SavedListing, UUID> { 
    public boolean existsByUserAndPost(User user, Post post);
    public Optional<SavedListing> findByUserUserIdAndPostPostId(UUID userId, UUID postId);
    public List<SavedListing> findAllByUser(User user);
}
