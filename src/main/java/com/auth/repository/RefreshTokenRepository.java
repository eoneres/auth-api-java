package com.auth.repository;

import com.auth.model.RefreshToken;
import com.auth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
    Optional<RefreshToken> findByToken(String token);

    void deleteByUser(User user);

    Optional<RefreshToken> findByUserId(UUID userId);

    // 🔥 ADICIONE ESTE MÉTODO
    Optional<RefreshToken> findByUser(User user);
}