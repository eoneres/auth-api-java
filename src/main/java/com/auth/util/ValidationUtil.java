package com.auth.util;

import java.util.Collection;
import java.util.Optional;

public class ValidationUtil {
    
    public static boolean isValid(String value) {
        return value != null && !value.trim().isEmpty() 
               && !"undefined".equalsIgnoreCase(value)
               && !"null".equalsIgnoreCase(value);
    }
    
    public static <T> boolean isValid(T value) {
        if (value == null) return false;
        if (value instanceof String) return isValid((String) value);
        if (value instanceof Collection) return !((Collection<?>) value).isEmpty();
        if (value instanceof Optional) return ((Optional<?>) value).isPresent();
        return true;
    }
    
    public static String sanitize(String value) {
        if (!isValid(value)) return null;
        return value.trim().toLowerCase();
    }
    
    public static String requireValid(String value, String fieldName) {
        if (!isValid(value)) {
            throw new IllegalArgumentException(fieldName + " não pode ser nulo ou vazio");
        }
        return value.trim();
    }
    
    public static boolean isValidEmail(String email) {
        if (!isValid(email)) return false;
        String emailRegex = "^[A-Za-z0-9+_.-]+@(.+)$";
        return email.matches(emailRegex);
    }
}