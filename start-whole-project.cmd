@echo off
setlocal

set "ROOT=%~dp0"
pushd "%ROOT%" || (
  echo [ERROR] Could not open project root.
  exit /b 1
)

echo ===============================================
echo AI Medical Assistant - One Command Startup
echo ===============================================
echo.

echo [INFO] Ensuring infrastructure containers are running...
docker start postgres-medical >nul 2>&1 || docker run -d --name postgres-medical -e POSTGRES_DB=medical -e POSTGRES_USER=medical_user -e POSTGRES_PASSWORD=change_me -p 5432:5432 postgres:15-alpine >nul
docker start zookeeper >nul 2>&1 || docker run -d --name zookeeper -e ZOOKEEPER_CLIENT_PORT=2181 -e ZOOKEEPER_TICK_TIME=2000 -p 2181:2181 confluentinc/cp-zookeeper:7.5.0 >nul
docker start kafka >nul 2>&1 || docker run -d --name kafka -e KAFKA_BROKER_ID=1 -e KAFKA_ZOOKEEPER_CONNECT=host.docker.internal:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -e KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=PLAINTEXT:PLAINTEXT -e KAFKA_INTER_BROKER_LISTENER_NAME=PLAINTEXT -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 -p 9092:9092 confluentinc/cp-kafka:7.5.0 >nul

echo [INFO] Checking Backend API (8080)...
powershell -NoProfile -Command "if (Get-NetTCPConnection -LocalPort 8080 -State Listen -ErrorAction SilentlyContinue) { exit 0 } else { exit 1 }"
if errorlevel 1 (
  echo [INFO] Starting Backend API in new window...
  start "Backend API" cmd /k "cd /d ""%ROOT%apps\backend"" && java -jar target\medical-backend-0.0.1-SNAPSHOT.jar"
) else (
  echo [INFO] Backend API already running.
)

echo [INFO] Checking AI Service (8000)...
powershell -NoProfile -Command "if (Get-NetTCPConnection -LocalPort 8000 -State Listen -ErrorAction SilentlyContinue) { exit 0 } else { exit 1 }"
if errorlevel 1 (
  echo [INFO] Starting AI Service in new window...
  start "AI Service" cmd /k "cd /d ""%ROOT%apps\ai-service"" && python -m uvicorn simple_main:app --host 0.0.0.0 --port 8000"
) else (
  echo [INFO] AI Service already running.
)

echo [INFO] Checking Frontend (5173)...
powershell -NoProfile -Command "if (Get-NetTCPConnection -LocalPort 5173 -State Listen -ErrorAction SilentlyContinue) { exit 0 } else { exit 1 }"
if errorlevel 1 (
  echo [INFO] Starting Frontend in new window...
  start "Frontend UI" cmd /k "cd /d ""%ROOT%"" && call start-frontend.cmd"
) else (
  echo [INFO] Frontend already running.
)

echo.
echo [INFO] Waiting 12 seconds for services to settle...
timeout /t 12 /nobreak >nul

echo [INFO] Ensuring demo login user exists...
powershell -NoProfile -Command "try { $body = @{ email = 'demo.clinician@hospital.com'; password = 'SecurePass123!'; role = 'CLINICIAN' } | ConvertTo-Json; Invoke-RestMethod -Uri 'http://localhost:8080/auth/register' -Method POST -ContentType 'application/json' -Body $body | Out-Null; Write-Host '[INFO] Demo user created.' } catch { Write-Host '[INFO] Demo user already exists or backend not ready yet.' }"

echo.
echo [INFO] Single app link:
echo        http://localhost:5173
echo.
echo [INFO] Backend health:
echo        http://localhost:8080/actuator/health
echo [INFO] AI health:
echo        http://localhost:8000/health
echo [INFO] Demo login credentials:
echo        Email: demo.clinician@hospital.com
echo        Password: SecurePass123!
echo.
echo [INFO] Opening app in browser...
start "" "http://localhost:5173"

popd
exit /b 0
