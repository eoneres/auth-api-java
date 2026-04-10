# 🔐 Auth API - Java + Spring Boot + JWT + AWS

[![Java](https://img.shields.io/badge/Java-21-blue.svg)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![JWT](https://img.shields.io/badge/JWT-0.12.3-orange.svg)](https://jwt.io/)
[![Docker](https://img.shields.io/badge/Docker-24.0-blue.svg)](https://www.docker.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue.svg)](https://www.postgresql.org/)

## 🧠 Desafio Resolvido

Empresas precisam de uma API de autenticação escalável, stateless e pronta para produção. Este projeto implementa:

- ✅ Login com JWT (access token + refresh token)
- ✅ Refresh token rotativo com revogação
- ✅ Blacklist de tokens via Redis
- ✅ Containerização com Docker
- ✅ Deploy automatizado na AWS
- ✅ Documentação interativa com Swagger

## 🛠️ Tecnologias

| Categoria | Tecnologia |
|-----------|------------|
| Framework | Spring Boot 3.2 |
| Security | JWT + Spring Security |
| Database | PostgreSQL 15 |
| Cache | Redis 7 |
| Container | Docker + Docker Compose |
| Cloud | AWS (EC2, RDS, ECR) |
| Docs | OpenAPI 3 (Swagger) |

## 📍 Acesso Rápido

| Serviço | URL |
|---------|-----|
| API | http://localhost:8080 |
| Swagger UI | http://localhost:8080/swagger-ui.html |
| OpenAPI JSON | http://localhost:8080/v3/api-docs |
| Actuator | http://localhost:8080/actuator/health |

## 🚀 Como Rodar (1 comando)

### Windows
```bash
scripts\setup.bat

📊 Diagrama de Arquitetura

[Cliente] → [HTTPS] → [AWS EC2: Spring Boot]
                         ↓
                    [AWS RDS: PostgreSQL]
                         ↓
                    [ElastiCache: Redis]


🧪 Testes Realizados

Teste	Status
Registro de usuário	✅
Login com JWT	✅
Refresh token	✅
Rota protegida (/users/me)	✅
Logout com revogação	✅
Containerização com Docker	✅
Documentação Swagger	✅
