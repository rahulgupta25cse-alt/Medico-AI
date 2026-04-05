# Docker Frontend Setup Guide

## ✅ No Node.js Installation Required!

Your frontend runs entirely in Docker. This guide shows you how to use it.

---

## 🚀 Quick Start (2 Minutes)

### Step 1: Start All Services
Open PowerShell in your project root and run:

```powershell
docker-compose up --build
```

**What this does:**
- ✅ Builds frontend Docker image (installs Node.js, dependencies, builds app)
- ✅ Starts all backend services (PostgreSQL, Kafka, AI service)
- ✅ Starts frontend on http://localhost:3000
- ✅ Starts monitoring services (optional)

**Wait for:**
```
✓ frontend-app is now serving port 3000
✓ gateway (backend) is running on port 8080
✓ All database connections OK
```

### Step 2: Open Your Browser
```
http://localhost:3000
```

### Step 3: Login
```
Email:    doctor@hospital.com
Password: SecurePass123!
```

---

## 📊 Service Status

Once running, all services are available:

| Service | URL | Access | Status |
|---------|-----|--------|--------|
| Frontend | http://localhost:3000 | Browser | ✅ |
| Backend API | http://localhost:8080 | API calls | ✅ |
| Design System | http://localhost:3000/design-system | Browser | ✅ |
| PostgreSQL | localhost:5432 | db tools | ✅ |
| Kafka | localhost:9092 | internal | ✅ |
| Prometheus | http://localhost:9090 | Browser | ✅ (optional) |
| Grafana | http://localhost:3000 | Browser | ✅ (optional) |

---

## 🎯 Common Commands

### Start Everything
```powershell
docker-compose up --build
```
**Use this:** First time or after code changes

### Start without Rebuild
```powershell
docker-compose up
```
**Use this:** If images already built

### Start in Background
```powershell
docker-compose up -d
```
**Then view logs with:**
```powershell
docker-compose logs -f frontend
```

### Stop All Services
```powershell
docker-compose down
```
**Use this:** When done developing

### Clean Everything (Start Fresh)
```powershell
docker-compose down -v
docker-compose up --build
```
**Use this:** If database is corrupted or you want clean slate

### View Service Logs
```powershell
# Frontend logs
docker-compose logs -f frontend

# Backend logs
docker-compose logs -f gateway

# All logs
docker-compose logs -f

# Last 100 lines
docker-compose logs --tail 100
```

### Access Container Shell
```powershell
# Frontend shell
docker exec -it frontend-app sh

# Backend shell
docker exec -it gateway bash

# PostgreSQL
docker exec -it postgres-medical psql -U medical_user -d medical
```

---

## 🔧 How It Works

### Frontend Dockerfile (2-Stage Build)

**Stage 1: Builder**
- Uses `node:20-alpine` image
- Installs npm dependencies
- Builds optimized production bundle
- Result: `dist/` folder with static files

**Stage 2: Production**
- Uses lightweight `node:20-alpine`
- Copies pre-built `dist/` folder
- Runs using `serve` (lightweight HTTP server)
- Listens on port 3000
- Includes health checks

### Build Process
```
┌─────────────────────────────────────────┐
│ Step 1: docker-compose up --build       │
└────────────────┬────────────────────────┘
                 ↓
    ┌────────────────────────────┐
    │ Build Frontend Image       │
    │ - Install Node modules     │
    │ - Run npm run build        │
    │ - Create dist/ folder      │
    └────────────┬───────────────┘
                 ↓
    ┌────────────────────────────┐
    │ Start Frontend Container   │
    │ - Copy dist/ files         │
    │ - Run serve on port 3000   │
    │ - Ready for browser        │
    └────────────────────────────┘
```

**Time:** Usually 2-5 minutes on first run, <1 minute on subsequent runs

---

## 🚨 Troubleshooting

### "Port 3000 already in use"
**Problem:** Another service using port 3000

**Solution:**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process (replace PID with actual number)
taskkill /PID <PID> /F

# Then retry
docker-compose up
```

### "Build failed - npm not found"
**Problem:** Docker couldn't build image

**Solution:**
```powershell
# Clean build
docker-compose down -v
docker system prune -f
docker-compose up --build
```

### "Frontend shows error connecting to backend"
**Problem:** API calls failing

**Solution:**
1. Check backend is running: `docker-compose logs -f gateway`
2. Verify API URL in frontend: `http://localhost:8080`
3. Check CORS settings in backend

### "Container exits immediately"
**Problem:** Container crashes on startup

**Solution:**
```powershell
# View error logs
docker-compose logs frontend

# Rebuild
docker-compose down -v
docker-compose up --build
```

### "Docker Compose not found"
**Problem:** Docker or Docker Compose not installed

**Solution:**
1. Download [Docker Desktop](https://www.docker.com/products/docker-desktop)
2. Install and restart computer
3. Verify: `docker --version` and `docker-compose --version`

---

## 📁 Docker Files Explained

### `frontend/Dockerfile` (Created)
- Frontend build configuration
- Multi-stage build for optimization
- Produces lightweight production image
- ~200MB final image size

### `docker-compose.yml` (Updated)
- **New `frontend` service** added
- Builds from `./frontend/Dockerfile`
- Depends on `gateway` (backend) service
- Exposes port 3000
- Includes health checks
- Auto-restarts on failure

---

## 🎨 Making Changes

### Change Frontend Code
```powershell
# 1. Edit your code in frontend/src/

# 2. Rebuild container
docker-compose down
docker-compose up --build

# Changes appear automatically in browser
```

### Change Styling (Tailwind)
```powershell
# 1. Edit frontend/tailwind.config.js

# 2. Rebuild
docker-compose down
docker-compose up --build

# Styles updated
```

### Change Environment Variables
Edit `frontend/Dockerfile` or `docker-compose.yml`:
```yaml
environment:
  - VITE_API_BASE_URL=http://localhost:8080
  - VITE_LOG_LEVEL=info
```

Then rebuild:
```powershell
docker-compose up --build
```

---

## 📊 Development Workflow

### Typical Day
```powershell
# Morning: Start everything
docker-compose up -d

# During day: Edit code, save, refresh browser

# End of day: Stop services
docker-compose down
```

### Code Change Workflow
```
1. Edit file (e.g., src/components/PatientList.jsx)
   ↓
2. Save file
   ↓
3. Rebuild frontend image (takes 1-2 minutes)
   docker-compose up --build
   ↓
4. Browser refreshes automatically
   ↓
5. See your changes
```

### Production Deployment
```powershell
# Build for production
docker-compose -f docker-compose.prod.yml build

# Push to registry
docker push your-registry/medical-frontend:1.0.0

# Deploy to server
docker pull your-registry/medical-frontend:1.0.0
docker run -p 3000:3000 your-registry/medical-frontend:1.0.0
```

---

## ✅ Verification Checklist

- [ ] Docker Desktop installed and running
- [ ] `docker --version` works
- [ ] `docker-compose --version` works
- [ ] `docker-compose up --build` completes successfully
- [ ] Browser loads http://localhost:3000
- [ ] Login page appears
- [ ] Can login with test credentials
- [ ] Design system loads at http://localhost:3000/design-system
- [ ] Backend API responds at http://localhost:8080
- [ ] No errors in `docker-compose logs`

---

## 📚 Alternative: Local Development (If You Prefer)

If you want to develop on your local machine (requires Node.js 18+):

### Install Node.js
Download from: https://nodejs.org/ (LTS version)

### Start Only Backend Services
```powershell
docker-compose up -d postgres zookeeper kafka ai-service
```

### Start Frontend Locally
```powershell
cd frontend
npm install
npm run dev
```

Then access: `http://localhost:5173`

**Advantages:**
- ✅ Faster development (no Docker rebuild)
- ✅ Hot reload works instantly
- ✅ Easier debugging

**Disadvantages:**
- ❌ Need Node.js installed
- ❌ Need npm/node in PATH
- ❌ Different environment than production

---

## 🎯 Next Steps

1. ✅ Start services: `docker-compose up --build`
2. ✅ Wait for all containers to start (2-5 minutes)
3. ✅ Open: http://localhost:3000
4. ✅ Login with test credentials
5. ✅ Explore the application
6. ✅ View design system at /design-system
7. ✅ Read [COMPLETE_STARTUP_GUIDE.md](COMPLETE_STARTUP_GUIDE.md) for more

---

## 📞 Getting Help

**Logs:** `docker-compose logs -f`  
**Status:** `docker-compose ps`  
**Rebuild:** `docker-compose down -v && docker-compose up --build`  
**Reset:** Clean up and restart everything  

---

**Ready to start?**
```powershell
docker-compose up --build
```

Then open: http://localhost:3000 🚀

