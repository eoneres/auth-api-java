@echo off
setlocal enabledelayedexpansion
set PROJECT_NAME=Auth API Java + Spring Boot

echo ╔══════════════════════════════════════════════════════════╗
echo ║   🚀 Setup Automático - %PROJECT_NAME%   ║
echo ╚══════════════════════════════════════════════════════════╝
echo.

REM 1. Verificar Docker
echo [1/6] Verificando Docker...
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker nao encontrado! Instale o Docker Desktop
    pause
    exit /b 1
)
echo ✅ Docker OK

REM 2. Criar .env
echo [2/6] Configurando variaveis de ambiente...
if not exist .env (
    copy .env.example .env >nul
    echo ✅ Arquivo .env criado
) else (
    echo ⚠️  .env ja existe, mantendo
)

REM 3. Build e subir containers
echo [3/6] Buildando e subindo containers...
docker-compose down -v >nul 2>&1
docker-compose up -d --build

REM 4. Aguardar backend ficar pronto
echo [4/6] Aguardando backend inicializar...
timeout /t 20 /nobreak >nul

REM 5. Verificar saúde
echo [5/6] Verificando saude da API...
curl -s http://localhost:8081/actuator/health >nul   REM ← Mudar para 8081
if errorlevel 1 (
    echo ⚠️  API ainda nao respondeu, aguardando mais...
    timeout /t 10 /nobreak >nul
) else (
    echo ✅ API online!
)

REM 6. Testar endpoints
echo [6/6] Testando endpoints...
echo.
echo Testando registro...
curl -X POST http://localhost:8081/api/auth/register ^   REM ← Mudar para 8081
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"NovoUsuario\",\"email\":\"novo@email.com\",\"password\":\"senha123\"}" ^
  -s -o nul -w "   Status: %%{http_code}\n"

echo.
echo Testando login...
curl -X POST http://localhost:8081/api/auth/login ^   REM ← Mudar para 8081
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@email.com\",\"password\":\"admin123\"}" ^
  -s -o nul -w "   Status: %%{http_code}\n"

echo.
echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║   ✅ Setup concluido com sucesso!                        ║
echo ║                                                          ║
echo ║   📍 API: http://localhost:8081                         ║   REM ← Mudar para 8081
echo ║   📍 Swagger: http://localhost:8081/swagger-ui.html     ║   REM ← Mudar para 8081
echo ║                                                          ║
echo ║   🔐 Credenciais de teste:                               ║
echo ║      Email: admin@email.com                             ║
echo ║      Senha: admin123                                     ║
echo ║                                                          ║
echo ║      Email: user@email.com                              ║
echo ║      Senha: user123                                      ║
echo ║                                                          ║
echo ║   📝 Para ver logs: docker logs auth-backend -f         ║
echo ║   🛑 Para parar: docker-compose down                    ║
echo ╚══════════════════════════════════════════════════════════╝
echo.
pause