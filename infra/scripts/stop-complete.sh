#!/bin/bash
# Complete Project Stop Script

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
COMPOSE_FILE="$ROOT_DIR/infra/docker/docker-compose.yml"

echo "🛑 Stopping Medical Assistant Application..."
echo ""

stop_if_running() {
    local pattern="$1"
    local label="$2"
    local pids

    pids="$(pgrep -f "$pattern" || true)"
    if [ -n "$pids" ]; then
        echo -e "${BLUE}Stopping ${label}...${NC}"
        kill $pids || true
        sleep 1
        echo -e "${GREEN}✓ ${label} stopped${NC}"
    else
        echo -e "${YELLOW}${label} not running${NC}"
    fi
}

echo -e "${BLUE}[1/4]${NC} Stopping backend..."
stop_if_running "medical-backend-.*\\.jar|com\\.example\\.medical\\.MedicalApplication" "Backend"

echo ""
echo -e "${BLUE}[2/4]${NC} Stopping frontend..."
stop_if_running "vite|npm run dev" "Frontend"

echo ""
echo -e "${BLUE}[3/4]${NC} Stopping AI service..."
stop_if_running "uvicorn app\\.main:app" "AI service"

echo ""
echo -e "${BLUE}[4/4]${NC} Stopping Docker containers..."
if command -v docker > /dev/null 2>&1; then
    if docker info > /dev/null 2>&1; then
        docker compose -f "$COMPOSE_FILE" down || true
        echo -e "${GREEN}✓ Docker containers stopped${NC}"
    else
        echo -e "${YELLOW}Docker daemon is not running; skipping compose down${NC}"
    fi
else
    echo -e "${YELLOW}Docker is not installed; skipping compose down${NC}"
fi

echo ""
echo -e "${GREEN}✅ Shutdown complete${NC}"
