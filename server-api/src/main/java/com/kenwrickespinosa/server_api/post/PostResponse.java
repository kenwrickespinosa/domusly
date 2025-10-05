package com.kenwrickespinosa.server_api.post;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PostResponse {

    private UUID postId;
    private String caption;
    private String location;
    private String contact;
    private String type;
    private String propertyType;
    private int capacity;
    private BigDecimal price;
    private String username;
    private LocalDateTime createdAt;
    private List<UUID> amenityIds;
    private List<String> amenityNames;

    public PostResponse(UUID postId, String caption, String location, String contact,
            String type, String propertyType, int capacity, BigDecimal price, String username,
            LocalDateTime createdAt) {
        this.postId = postId;
        this.caption = caption;
        this.location = location;
        this.contact = contact;
        this.type = type;
        this.propertyType = propertyType;
        this.capacity = capacity;
        this.price = price;
        this.username = username;
        this.createdAt = createdAt;
    }

    public PostResponse(UUID postId, String caption, String location, String contact,
            String type, String propertyType, int capacity, BigDecimal price, String username,
            LocalDateTime createdAt, List<String> amenityNames) {
        this.postId = postId;
        this.caption = caption;
        this.location = location;
        this.contact = contact;
        this.type = type;
        this.propertyType = propertyType;
        this.capacity = capacity;
        this.price = price;
        this.username = username;
        this.createdAt = createdAt;
        this.amenityNames = amenityNames;
    }
}
