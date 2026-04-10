package com.auth.service;

import com.auth.dto.response.UserResponse;
import com.auth.model.User;
import com.auth.repository.UserRepository;
import com.auth.util.LoggerUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;
    
    public UserResponse getCurrentUser() {
        LoggerUtil.info(UserService.class, "Buscando usuário atual");
        
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return mapToUserResponse(user);
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