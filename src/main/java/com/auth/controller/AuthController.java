package com.auth.controller;

import com.auth.dto.request.LoginRequest;
import com.auth.dto.request.RefreshTokenRequest;
import com.auth.dto.request.RegisterRequest;
import com.auth.dto.response.TokenResponse;
import com.auth.dto.response.UserResponse;
import com.auth.service.AuthService;
import com.auth.service.RefreshTokenService;
import com.auth.util.LoggerUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Autenticação", description = "Endpoints de autenticação e registro")
public class AuthController {
    
    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;
    
    @PostMapping("/register")
    @Operation(summary = "Registrar novo usuário")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request) {
        LoggerUtil.request(AuthController.class, "POST", "/api/auth/register", request);
        UserResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @PostMapping("/login")
    @Operation(summary = "Login de usuário")
    public ResponseEntity<TokenResponse> login(@Valid @RequestBody LoginRequest request) {
        LoggerUtil.request(AuthController.class, "POST", "/api/auth/login", request);
        TokenResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/refresh")
    @Operation(summary = "Renovar access token")
    public ResponseEntity<TokenResponse> refresh(@Valid @RequestBody RefreshTokenRequest request) {
        LoggerUtil.request(AuthController.class, "POST", "/api/auth/refresh", request);
        TokenResponse response = refreshTokenService.refreshAccessToken(request.getRefreshToken());
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/logout")
    @Operation(summary = "Logout do usuário")
    public ResponseEntity<Void> logout(@RequestHeader("Authorization") String authHeader,
                                       @Valid @RequestBody RefreshTokenRequest request) {
        LoggerUtil.info(AuthController.class, "Logout realizado");
        authService.logout(request.getRefreshToken());
        return ResponseEntity.ok().build();
    }
}