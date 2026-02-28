# Medical Assistant System - PowerShell Startup Script
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "Medical Assistant System - Startup Script" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan

# Set location to project root
$projectRoot = "c:\Users\hp\Desktop\AI-Powered Smart Medical Assistant for Patient Records, Report Analysis & Clinical"
Set-Location $projectRoot

Write-Host ""
Write-Host "Step 1: Cleaning up existing containers..." -ForegroundColor Yellow
docker stop postgres-medical zookeeper kafka ai-service 2>$null
docker rm postgres-medical zookeeper kafka ai-service 2>$null

Write-Host ""
Write-Host "Step 2: Starting PostgreSQL Database..." -ForegroundColor Yellow
$dbResult = docker run -d --name postgres-medical -e POSTGRES_DB=medical -e POSTGRES_USER=medical_user -e POSTGRES_PASSWORD=change_me -p 5432:5432 postgres:15-alpine
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ PostgreSQL started successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to start PostgreSQL" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 3: Waiting for database to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

Write-Host ""
Write-Host "Step 4: Starting Zookeeper..." -ForegroundColor Yellow
$zkResult = docker run -d --name zookeeper -e ZOOKEEPER_CLIENT_PORT=2181 -e ZOOKEEPER_TICK_TIME=2000 -p 2181:2181 confluentinc/cp-zookeeper:7.5.0
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Zookeeper started successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to start Zookeeper" -ForegroundColor Red
}

Start-Sleep -Seconds 5

Write-Host ""
Write-Host "Step 5: Starting Kafka..." -ForegroundColor Yellow
$kafkaResult = docker run -d --name kafka -e KAFKA_BROKER_ID=1 -e KAFKA_ZOOKEEPER_CONNECT=host.docker.internal:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -e KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=PLAINTEXT:PLAINTEXT -e KAFKA_INTER_BROKER_LISTENER_NAME=PLAINTEXT -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 -p 9092:9092 confluentinc/cp-kafka:7.5.0
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Kafka started successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to start Kafka" -ForegroundColor Red
}

Write-Host ""
Write-Host "Step 6: Waiting for Kafka to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

Write-Host ""
Write-Host "Step 7: Checking container status..." -ForegroundColor Yellow
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

Write-Host ""
Write-Host ""
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "Infrastructure services started successfully!" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Services Status:" -ForegroundColor Cyan
Write-Host "- Database: localhost:5432" -ForegroundColor Green
Write-Host "- Kafka: localhost:9092" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. To start Backend API:" -ForegroundColor Gray
Write-Host "   cd apps\backend" -ForegroundColor Gray
Write-Host "   java -jar -Dspring.profiles.active=local target/medical-backend-0.0.1-SNAPSHOT.jar" -ForegroundColor Gray
Write-Host ""
Write-Host "2. To start AI Service:" -ForegroundColor Gray
Write-Host "   cd apps\ai-service" -ForegroundColor Gray
Write-Host "   python -m uvicorn app.main:app --host 0.0.0.0 --port 8000" -ForegroundColor Gray
Write-Host ""
Write-Host "Press Enter to continue..."
Read-Host