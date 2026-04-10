package com.auth.service;

import com.auth.dto.response.TokenResponse;
import com.auth.model.RefreshToken;
import com.auth.model.User;
import com.auth.repository.RefreshTokenRepository;
import com.auth.repository.UserRepository;
import com.auth.util.LoggerUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    
    @Value("${jwt.refresh-expiration}")
    private Long refreshExpiration;
    
    @Transactional
    public RefreshToken createRefreshToken(UUID userId) {
        LoggerUtil.info(RefreshTokenService.class, "Criando refresh token para user: {}", userId);
        
        RefreshToken refreshToken = RefreshToken.builder()
                .user(userRepository.findById(userId).orElseThrow())
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusMillis(refreshExpiration))
                .revoked(false)
                .build();
        
        refreshTokenRepository.deleteByUser(refreshToken.getUser());
        return refreshTokenRepository.save(refreshToken);
    }
    
    @Transactional
    public TokenResponse refreshAccessToken(String refreshTokenValue) {
        LoggerUtil.info(RefreshTokenService.class, "Renovando access token com refresh: {}", refreshTokenValue);
        
        RefreshToken refreshToken = refreshTokenRepository.findByToken(refreshTokenValue)
                .orElseThrow(() -> new RuntimeException("Refresh token não encontrado"));
        
        if (refreshToken.isRevoked()) {
            throw new RuntimeException("Refresh token revogado");
        }
        
        if (refreshToken.getExpiryDate().isBefore(Instant.now())) {
            throw new RuntimeException("Refresh token expirado");
        }
        
        User user = refreshToken.getUser();
        String newAccessToken = jwtService.generateToken(user);
        
        return TokenResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(refreshTokenValue)
                .tokenType("Bearer")
                .expiresIn(Instant.now().plusMillis(refreshExpiration).getEpochSecond())
                .build();
    }
    
    @Transactional
    public void revokeRefreshToken(String refreshTokenValue) {
        LoggerUtil.info(RefreshTokenService.class, "Revogando refresh token: {}", refreshTokenValue);
        
        Optional<RefreshToken> refreshToken = refreshTokenRepository.findByToken(refreshTokenValue);
        refreshToken.ifPresent(token -> {
            token.setRevoked(true);
            refreshTokenRepository.save(token);
        });
    }
}