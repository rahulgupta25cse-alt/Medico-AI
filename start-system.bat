@echo off
echo ===============================================
echo Medical Assistant System - Startup Script
echo ===============================================

echo.
echo Step 1: Starting PostgreSQL Database...
docker run -d --name postgres-medical -e POSTGRES_DB=medical -e POSTGRES_USER=medical_user -e POSTGRES_PASSWORD=change_me -p 5432:5432 postgres:15-alpine
if %errorlevel% neq 0 (
    echo Error starting PostgreSQL. Checking if already running...
    docker start postgres-medical
)

echo.
echo Step 2: Waiting for database to be ready...
timeout /t 10

echo.
echo Step 3: Starting Kafka Infrastructure...
docker run -d --name zookeeper -e ZOOKEEPER_CLIENT_PORT=2181 -e ZOOKEEPER_TICK_TIME=2000 -p 2181:2181 confluentinc/cp-zookeeper:7.5.0
timeout /t 5
docker run -d --name kafka -e KAFKA_BROKER_ID=1 -e KAFKA_ZOOKEEPER_CONNECT=host.docker.internal:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -e KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=PLAINTEXT:PLAINTEXT -e KAFKA_INTER_BROKER_LISTENER_NAME=PLAINTEXT -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 -p 9092:9092 confluentinc/cp-kafka:7.5.0

echo.
echo Step 4: Starting Backend Service...
cd /d "%~dp0apps\backend"
java -jar -Dspring.profiles.active=local target/medical-backend-0.0.1-SNAPSHOT.jar

echo.
echo ===============================================
echo Services should be running on:
echo - Backend API: http://localhost:8080
echo - Database: localhost:5432
echo - Kafka: localhost:9092
echo ===============================================
pause