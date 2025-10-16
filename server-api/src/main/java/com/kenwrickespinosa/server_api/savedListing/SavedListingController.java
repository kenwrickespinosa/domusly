package com.kenwrickespinosa.server_api.savedListing;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/saved-listings")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class SavedListingController {

    private final SavedListingService savedListingService;

    @GetMapping
    public ResponseEntity<List<SavedListingResponse>> findAll() {
        List<SavedListingResponse> savedListings = savedListingService.findAll();
        return ResponseEntity.ok(savedListings);
    }

    @PostMapping
    public ResponseEntity<SavedListingResponse> save(
            @RequestParam UUID userId,
            @RequestParam UUID postId
    ) {
        SavedListingResponse response = savedListingService.save(userId, postId);
        return ResponseEntity.ok(response);
    }
}
