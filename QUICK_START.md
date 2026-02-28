# Medical Assistant System - Quick Start Guide

Due to terminal display issues, here are manual instructions to run the system:

## Option 1: Use Provided Scripts

### PowerShell (Recommended)
1. Open PowerShell as Administrator
2. Set execution policy: `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`
3. Run: `.\start-system.ps1`
4. In another terminal, run: `.\start-ai-service.ps1`

### Batch File
1. Open Command Prompt as Administrator  
2. Run: `start-system.bat`

## Option 2: Manual Steps

### 1. Start Infrastructure Services

```powershell
# Start PostgreSQL Database
docker run -d --name postgres-medical -e POSTGRES_DB=medical -e POSTGRES_USER=medical_user -e POSTGRES_PASSWORD=change_me -p 5432:5432 postgres:15-alpine

# Start Zookeeper
docker run -d --name zookeeper -e ZOOKEEPER_CLIENT_PORT=2181 -e ZOOKEEPER_TICK_TIME=2000 -p 2181:2181 confluentinc/cp-zookeeper:7.5.0

# Start Kafka
docker run -d --name kafka -e KAFKA_BROKER_ID=1 -e KAFKA_ZOOKEEPER_CONNECT=host.docker.internal:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -e KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=PLAINTEXT:PLAINTEXT -e KAFKA_INTER_BROKER_LISTENER_NAME=PLAINTEXT -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 -p 9092:9092 confluentinc/cp-kafka:7.5.0
```

### 2. Start Backend API

```powershell
cd apps/backend
java -jar -Dspring.profiles.active=local target/medical-backend-0.0.1-SNAPSHOT.jar
```

### 3. Start AI Service

```powershell
cd apps/ai-service
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### 4. Start Frontend (Optional)

```powershell
cd apps/frontend
npm install
npm run dev
```

## Verify Services

After starting, check these URLs:

- **Backend API**: http://localhost:8080/health
- **AI Service**: http://localhost:8000/docs
- **Frontend**: http://localhost:3000 (if started)
- **Database**: localhost:5432

## API Testing

### Register a User
```bash
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"doctor@hospital.com","password":"SecurePass123!","role":"CLINICIAN"}'
```

### Login
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"doctor@hospital.com","password":"SecurePass123!"}'
```

### Test Patient Endpoint
```bash
curl http://localhost:8080/patients \
  -H "Authorization: Bearer <your-jwt-token>"
```

## Stop Services

```powershell
# Stop containers
docker stop postgres-medical zookeeper kafka

# Remove containers  
docker rm postgres-medical zookeeper kafka

# Stop backend (Ctrl+C in terminal)
# Stop AI service (Ctrl+C in terminal)
```

## Troubleshooting

1. **Port conflicts**: Make sure ports 5432, 2181, 9092, 8080, 8000, 3000 are free
2. **Docker not running**: Start Docker Desktop
3. **Java not found**: Install Java 11+
4. **Python issues**: Install Python 3.8+
5. **Network issues**: Check firewall and proxy settings

## System Architecture

- **PostgreSQL**: User data, patients, reports
- **Kafka**: Async messaging (document-uploaded events)
- **Spring Boot**: REST API, authentication (JWT), business logic
- **FastAPI**: AI services, ML predictions, OCR
- **Frontend**: React/Vue dashboard (optional)

The system is now ready for development and testing!