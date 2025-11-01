package com.kenwrickespinosa.server_api.amenity;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/amenities")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AmenityController {
    
    private final AmenityService amenityService;

    @PostMapping
    public ResponseEntity<Amenity> save(@RequestBody AmenityRequest amenityRequest) {
        Amenity savedAmenity = amenityService.save(amenityRequest);
        return ResponseEntity.ok(savedAmenity);
    }

    @GetMapping
    public ResponseEntity<List<Amenity>> findAll() {
        List<Amenity> amenityList = amenityService.findAll();
        return ResponseEntity.ok(amenityList);
    }
}
