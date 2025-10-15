package com.kenwrickespinosa.server_api.post;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, UUID> { 
    @Query(
        "SELECT p FROM Post p WHERE (:type IS NULL OR p.type = :type) AND (:propertyType IS NULL OR p.propertyType = :propertyType)"
    )
    List<Post> findByFilters(@Param("type") String type, @Param("propertyType") String propertyType);
}
