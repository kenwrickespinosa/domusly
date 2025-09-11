package com.kenwrickespinosa.server_api.token;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TokenRepository extends JpaRepository<Token, UUID> {
    @Query(value = """
            select t from Token t 
            inner join t.user u
            where u.user_id = :id and (t.expired = false and t.revoked = false) 
            """)
    List<Token> findAllValidTokenById(UUID id);

    Optional<Token> findByToken(String token);
}
