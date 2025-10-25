package com.kenwrickespinosa.server_api.savedListing;

import java.util.List;
import java.util.UUID;

import org.springframework.security.core.Authentication;
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
                amenityNames);
    }

    public List<SavedListingResponse> findAllByUser(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username);

        List<SavedListing> savedListings = savedListingRepository.findAllByUser(user);

        return savedListings.stream()
                .map(saved -> mapToSavedListingResponse(saved.getPost()))
                .toList();
    }

    public SavedListingResponse save(Authentication authentication, UUID postId) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username);

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        boolean alreadySaved = savedListingRepository.existsByUserAndPost(user, post);
        if (alreadySaved) {
            throw new RuntimeException("This post is already saved");
        }

        SavedListing savedListing = new SavedListing();
        savedListing.setUser(user);
        savedListing.setPost(post);

        savedListingRepository.save(savedListing);
        return mapToSavedListingResponse(post);
    }
}
