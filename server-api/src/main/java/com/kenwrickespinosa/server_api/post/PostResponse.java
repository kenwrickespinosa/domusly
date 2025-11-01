package com.kenwrickespinosa.server_api.post;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private double area;
    private String username;
    private String firstname;
    private String lastname;
    private LocalDateTime createdAt;
    private List<UUID> amenityIds;
    private List<String> amenityNames;

    public PostResponse(UUID postId, String caption, String location, String contact,
            String type, String propertyType, int capacity, BigDecimal price, double area, String username,
            String firstname, String lastname, LocalDateTime createdAt, List<String> amenityNames) {
        this.postId = postId;
        this.caption = caption;
        this.location = location;
        this.contact = contact;
        this.type = type;
        this.propertyType = propertyType;
        this.capacity = capacity;
        this.price = price;
        this.area = area;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.createdAt = createdAt;
    this.amenityNames = amenityNames;
    }

    public PostResponse(UUID postId, String caption, String location, String contact,
            String type, String propertyType, int capacity, BigDecimal price, double area, String username,
            String firstname, String lastname, LocalDateTime createdAt, List<UUID> amenityIds, List<String> amenityNames) {
        this.postId = postId;
        this.caption = caption;
        this.location = location;
        this.contact = contact;
        this.type = type;
        this.propertyType = propertyType;
        this.capacity = capacity;
        this.price = price;
        this.area = area;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.createdAt = createdAt;
        this.amenityIds = amenityIds;
        this.amenityNames = amenityNames;
    }
}
