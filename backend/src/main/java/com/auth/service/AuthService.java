package com.auth.service;

import com.auth.dto.request.LoginRequest;
import com.auth.dto.request.RegisterRequest;
import com.auth.dto.response.TokenResponse;
import com.auth.dto.response.UserResponse;
import com.auth.model.RefreshToken;
import com.auth.model.User;
import com.auth.repository.UserRepository;
import com.auth.util.LoggerUtil;
import com.auth.util.ValidationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    
    @Transactional
    public UserResponse register(RegisterRequest request) {
        LoggerUtil.info(AuthService.class, "Tentando registrar usuário: {}", request.getEmail());
        
        ValidationUtil.requireValid(request.getEmail(), "Email");
        ValidationUtil.requireValid(request.getPassword(), "Senha");
        ValidationUtil.requireValid(request.getName(), "Nome");
        
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }
        
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        
        user = userRepository.save(user);
        LoggerUtil.info(AuthService.class, "Usuário registrado com sucesso: {}", user.getEmail());
        
        return mapToUserResponse(user);
    }
    
    @Transactional
    public TokenResponse login(LoginRequest request) {
        LoggerUtil.info(AuthService.class, "Tentando login: {}", request.getEmail());
        
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        User user = (User) authentication.getPrincipal();
        String accessToken = jwtService.generateToken(user);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());
        
        LoggerUtil.info(AuthService.class, "Login realizado com sucesso: {}", user.getEmail());
        
        return TokenResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken.getToken())
                .tokenType("Bearer")
                .expiresIn(refreshToken.getExpiryDate().getEpochSecond())
                .build();
    }
    
    @Transactional
    public void logout(String refreshToken) {
        LoggerUtil.info(AuthService.class, "Realizando logout");
        refreshTokenService.revokeRefreshToken(refreshToken);
    }
    
    private UserResponse mapToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .build();
    }
}