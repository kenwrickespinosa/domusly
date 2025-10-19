package com.kenwrickespinosa.server_api.savedListing;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.kenwrickespinosa.server_api.amenity.Amenity;
import com.kenwrickespinosa.server_api.post.Post;
import com.kenwrickespinosa.server_api.post.PostRepository;
import com.kenwrickespinosa.server_api.user.User;
import com.kenwrickespinosa.server_api.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SavedListingService {
    private final SavedListingRepository savedListingRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    // Helper method - convert Post to SavedListingResponse
    private SavedListingResponse mapToSavedListingResponse(Post post) {
        List<String> amenityNames = post.getAmenities().stream()
                .map(Amenity::getName)
                .toList();

        return new SavedListingResponse(
                post.getPostId(),
                post.getCaption(),
                post.getLocation(),
                post.getContact(),
                post.getType(),
                post.getPropertyType(),
                post.getCapacity(),
                post.getPrice(),
                post.getUser().getUsername(),
                post.getCreatedAt(),
                amenityNames
        );
    }

    public List<SavedListingResponse> findAll() {
        List<SavedListing> savedListings = savedListingRepository.findAll();

        return savedListings.stream()
                .map(saved -> mapToSavedListingResponse(saved.getPost()))
                .toList();
    }

    public SavedListingResponse save(UUID userId, UUID postId) {
        // Find the user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Find the post
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
                
        // First check if user already saved this post or not
        boolean alreadySaved = savedListingRepository.existsByUserAndPost(user, post);
        if (alreadySaved) {
            throw new RuntimeException("This post is already saved");
        }

        // Save
        SavedListing savedListing = new SavedListing();
        savedListing.setUser(user);
        savedListing.setPost(post);

        savedListingRepository.save(savedListing);

        return mapToSavedListingResponse(post);
    }
}
