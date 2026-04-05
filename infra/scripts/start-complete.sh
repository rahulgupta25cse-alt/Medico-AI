#!/bin/bash
# Complete Project Startup Script

set -e  # Exit on error

echo "🏥 Starting Medical Assistant Application..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color
ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
COMPOSE_FILE="$ROOT_DIR/infra/docker/docker-compose.yml"
BACKEND_PID=""
FRONTEND_PID=""
AI_PID=""

# Check if Docker is installed
echo -e "${BLUE}[1/5]${NC} Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}Docker not found. Please install Docker.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker is installed${NC}"

if ! docker info > /dev/null 2>&1; then
    echo -e "${YELLOW}Docker daemon is not running. Start Docker Desktop and retry.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker daemon is running${NC}"

# Start Docker containers
echo ""
echo -e "${BLUE}[2/5]${NC} Starting Docker containers..."
docker compose -f "$COMPOSE_FILE" up -d
echo -e "${GREEN}✓ Docker containers started${NC}"

# Wait for services to be ready
echo ""
echo -e "${BLUE}[3/5]${NC} Waiting for services to be ready..."
sleep 10
echo -e "${GREEN}✓ Services are ready${NC}"

# Build and start backend
echo ""
echo -e "${BLUE}[4/5]${NC} Starting backend application..."
cd "$ROOT_DIR/apps/backend"
mvn clean package -DskipTests -q
java -jar target/medical-backend-*.jar &
BACKEND_PID=$!
sleep 5
echo -e "${GREEN}✓ Backend started (PID: $BACKEND_PID)${NC}"

# Start frontend
echo ""
echo -e "${BLUE}[5/5]${NC} Starting frontend application..."
cd "$ROOT_DIR/apps/frontend"
npm install -q
npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend started (PID: $FRONTEND_PID)${NC}"

# Start AI service
echo ""
echo -e "${BLUE}[Bonus]${NC} Starting AI service..."
cd "$ROOT_DIR/apps/ai-service"
python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000 &
AI_PID=$!
echo -e "${GREEN}✓ AI service started (PID: $AI_PID)${NC}"

echo ""
echo -e "${GREEN}✅ Medical Assistant is running!${NC}"
echo ""
echo "📱 Services:"
echo "  - Frontend:     http://localhost:3000"
echo "  - Backend API:  http://localhost:8080"
echo "  - AI Service:   http://localhost:8000"
echo "  - Prometheus:   http://localhost:9090"
echo "  - Grafana:      http://localhost:3001 (admin/admin)"
echo "  - Kibana:       http://localhost:5601"
echo ""
echo "🛑 To stop the application:"
echo "  1. Press Ctrl+C to stop this script"
echo "  2. Kill backend: kill $BACKEND_PID"
echo "  3. Kill frontend: kill $FRONTEND_PID"
echo "  4. Kill AI service: kill $AI_PID"
echo "  5. Stop Docker: docker compose -f \"$COMPOSE_FILE\" down"
echo ""

# Keep script running
wait
