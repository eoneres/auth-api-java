package com.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.auth.model")
@EnableJpaRepositories(basePackages = "com.auth.repository")
public class AuthApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(AuthApiApplication.class, args);
        System.out.println("""

                ╔══════════════════════════════════════════════════════════╗
                ║   🚀 Auth API iniciada com sucesso!                      ║
                ║                                                          ║
                ║   📍 API: http://localhost:8080                         ║
                ║   📍 Swagger: http://localhost:8080/swagger-ui.html     ║
                ║                                                          ║
                ║   🔐 Credenciais de teste:                               ║
                ║      Email: admin@email.com                             ║
                ║      Senha: admin123                                     ║
                ║                                                          ║
                ║      Email: user@email.com                              ║
                ║      Senha: user123                                      ║
                ╚══════════════════════════════════════════════════════════╝
                """);
    }
}