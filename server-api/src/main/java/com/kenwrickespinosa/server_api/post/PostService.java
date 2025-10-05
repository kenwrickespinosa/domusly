package com.kenwrickespinosa.server_api.post;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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

    public List<PostResponse> findAll() {
        List<Post> posts = postRepository.findAll();
        List<PostResponse> response = new ArrayList<>();
        for (Post post : posts) {
            List<String> amenityNames = post.getAmenities().stream().map(Amenity::getName).toList();
            List<UUID> amenityIds = post.getAmenities().stream().map(Amenity::getAmenityId).toList();
            response.add(
                new PostResponse(
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
                    amenityIds,
                    amenityNames
                )
            );
        }
        return response;
    }

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
        post.setPrice(postRequest.getPrice());
        post.setUser(user);
        post.setAmenities(amenities);

        Post savedPost = postRepository.save(post);

        // List<UUID> postIdStream = savedPost.getAmenities().stream().map(Amenity::getAmenityId).toList();

        return new PostResponse(
                savedPost.getPostId(),
                savedPost.getCaption(),
                savedPost.getLocation(),
                savedPost.getContact(),
                savedPost.getType(),
                savedPost.getPropertyType(),
                savedPost.getCapacity(),
                savedPost.getPrice(),
                savedPost.getUser().getUsername(),
                savedPost.getCreatedAt());
    }
}
