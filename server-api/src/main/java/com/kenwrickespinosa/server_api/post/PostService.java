package com.kenwrickespinosa.server_api.post;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.kenwrickespinosa.server_api.amenity.Amenity;
import com.kenwrickespinosa.server_api.amenity.AmenityRepository;
import com.kenwrickespinosa.server_api.user.User;
import com.kenwrickespinosa.server_api.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {
    
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final AmenityRepository amenityRepository;

    public PostResponse save(PostRequest postRequest, UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Set<Amenity> amenities = new HashSet<>();
        if (postRequest.getAmenityIds() != null) {
            amenities = new HashSet<>(amenityRepository.findAllById(postRequest.getAmenityIds()));
        }

        Post post = new Post();
        post.setCaption(postRequest.getCaption());
        post.setLocation(postRequest.getLocation());
        post.setContact(postRequest.getContact());
        post.setType(postRequest.getType());
        post.setPropertyType(postRequest.getPropertyType());
        post.setCapacity(postRequest.getCapacity());
        post.setUser(user);
        post.setAmenities(amenities);

        Post savedPost = postRepository.save(post);

        return new PostResponse(
            savedPost.getPostId(),
            savedPost.getCaption(),
            savedPost.getLocation(),
            savedPost.getContact(),
            savedPost.getType(),
            savedPost.getPropertyType(),
            savedPost.getCapacity(),
            savedPost.getUser().getUsername(),
            savedPost.getCreatedAt()
        );
    }
}
