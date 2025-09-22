package com.kenwrickespinosa.server_api.post;

import java.time.LocalDateTime;
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
    private String username;
    private LocalDateTime createdAt;
}
