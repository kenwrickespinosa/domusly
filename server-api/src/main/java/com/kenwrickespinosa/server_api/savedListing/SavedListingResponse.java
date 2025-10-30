package com.kenwrickespinosa.server_api.savedListing;

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
public class SavedListingResponse {
    private UUID postId;
    private String caption;
    private String location;
    private String contact;
    private String type;
    private String propertyType;
    private int capacity;
    private BigDecimal price;
    private String username;
    private String firstname;
    private String lastname;
    private LocalDateTime createdAt;
    private List<String> amenityNames;
}
