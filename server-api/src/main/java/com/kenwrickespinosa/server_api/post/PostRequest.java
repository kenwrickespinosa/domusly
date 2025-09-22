package com.kenwrickespinosa.server_api.post;

import java.util.Set;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PostRequest {
    
    private String caption;
    private String location;
    private String contact;
    private String type;    // rent | sale
    private String propertyType;    // house | apartment | dorm | condo
    private int capacity;

    // private UUID userId;

    private Set<UUID> amenityIds;
}
