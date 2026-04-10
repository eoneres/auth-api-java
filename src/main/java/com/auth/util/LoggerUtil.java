package com.auth.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoggerUtil {
    
    public static <T> void info(Class<T> clazz, String message, Object... args) {
        Logger logger = LoggerFactory.getLogger(clazz);
        logger.info(formatMessage(message, args));
    }
    
    public static <T> void error(Class<T> clazz, String message, Throwable error, Object... args) {
        Logger logger = LoggerFactory.getLogger(clazz);
        logger.error(formatMessage(message, args), error);
    }
    
    public static <T> void debug(Class<T> clazz, String message, Object... args) {
        if (isDevelopment()) {
            Logger logger = LoggerFactory.getLogger(clazz);
            logger.debug(formatMessage(message, args));
        }
    }
    
    public static <T> void request(Class<T> clazz, String method, String url, Object body) {
        Logger logger = LoggerFactory.getLogger(clazz);
        logger.info("📥 [REQUEST] {} {} - Body: {}", method, url, body);
    }
    
    public static <T> void warn(Class<T> clazz, String message, Object... args) {
        Logger logger = LoggerFactory.getLogger(clazz);
        logger.warn(formatMessage(message, args));
    }
    
    private static String formatMessage(String message, Object... args) {
        try {
            return String.format(message, args);
        } catch (Exception e) {
            return message;
        }
    }
    
    private static boolean isDevelopment() {
        return "development".equals(System.getenv("SPRING_PROFILES_ACTIVE"));
    }
}