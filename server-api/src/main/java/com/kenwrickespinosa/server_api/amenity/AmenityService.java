package com.kenwrickespinosa.server_api.amenity;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AmenityService {
    
    private final AmenityRepository amenityRepository;

    public Amenity save(AmenityRequest amenityRequest) {
        Amenity amenity = new Amenity();
        amenity.setName(amenityRequest.getName());
        return amenityRepository.save(amenity);
    }

    public List<Amenity> findAll() {
        return amenityRepository.findAll();
    }
}
