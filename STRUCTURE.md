# Project Structure Documentation

This document outlines the refactored directory layout following industry-standard practices for scalable, maintainable projects.

---

## Directory Hierarchy

```
AI-Powered Smart Medical Assistant/
├── apps/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── main/
│   │   │   │   ├── java/com/example/medical/
│   │   │   │   │   ├── auth/          # Authentication & JWT
│   │   │   │   │   ├── doctor/        # Doctor management
│   │   │   │   │   ├── patient/       # Patient CRUD
│   │   │   │   │   ├── report/        # Medical reports
│   │   │   │   │   ├── prescription/  # Prescription mgmt
│   │   │   │   │   ├── emergency/     # Emergency access
│   │   │   │   │   ├── messaging/     # Kafka integration
│   │   │   │   │   ├── observability/ # Metrics & logging
│   │   │   │   │   └── security/      # Security config
│   │   │   │   └── resources/
│   │   │   │       └── application.yml
│   │   │   └── test/java/...         # Unit & integration tests
│   │   ├── target/                   # Build artifacts
│   │   └── pom.xml                   # Maven configuration
│   │
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── components/           # Reusable React components
│   │   │   ├── pages/                # Page-level components
│   │   │   ├── hooks/                # Custom React hooks
│   │   │   ├── services/             # API client services
│   │   │   ├── utils/                # Helper functions
│   │   │   ├── styles/               # TailwindCSS config
│   │   │   ├── App.jsx               # Root component
│   │   │   └── main.jsx              # Entry point
│   │   ├── public/                   # Static assets
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   ├── tailwind.config.js
│   │   └── postcss.config.cjs
│   │
│   └── ai-service/
│       ├── app/
│       │   ├── main.py               # FastAPI application
│       │   ├── models.py             # Pydantic models
│       │   ├── routes/               # API endpoints
│       │   ├── services/             # Business logic
│       │   └── utils/                # Helper functions
│       ├── requirements.txt          # Python dependencies
│       ├── Dockerfile                # Container build
│       └── test_predictor.py         # Tests
│
├── automation/
│   └── n8n/
│       └── n8n_workflows.json        # Workflow definitions
│
├── infra/
│   ├── docker/
│   │   ├── docker-compose.yml        # Service orchestration
│   │   ├── Dockerfile.backend        # Backend image
│   │   ├── Dockerfile                # Frontend image
│   │   ├── prometheus.yml            # Metrics config
│   │   └── logstash.conf             # Log pipeline
│   │
│   └── scripts/
│       ├── build-backend.ps1         # Build script
│       ├── start-dev.ps1             # Dev startup
│       ├── start-complete.sh         # Full startup
│       ├── test-database.ps1         # DB tests
│       └── test_ml_system.*          # AI tests
│
├── docs/
│   ├── architecture/
│   │   ├── SYSTEM_DESIGN.md
│   │   ├── API_ARCHITECTURE.md
│   │   └── DATABASE_SCHEMA.md
│   ├── api/
│   │   ├── AUTHENTICATION.md
│   │   ├── PATIENTS_API.md
│   │   ├── REPORTS_API.md
│   │   └── AI_SERVICES.md
│   ├── deployment/
│   │   ├── DOCKER_SETUP.md
│   │   ├── KUBERNETES.md
│   │   └── PRODUCTION.md
│   └── [Feature guides & troubleshooting]
│
├── data/
│   ├── samples/
│   │   ├── login.json                # Login example
│   │   └── register.json             # Registration example
│   └── schemas/
│       ├── database-setup.sql        # Database initialization
│       └── sample-data.sql           # Test data
│
├── tests/
│   ├── unit/
│   │   ├── backend/                  # Java unit tests
│   │   └── frontend/                 # React unit tests
│   └── integration/
│       ├── api/                      # API integration tests
│       └── database/                 # Database tests
│
├── assets/
│   ├── images/                       # Project images
│   ├── styles/                       # Shared styles
│   └── icons/                        # UI icons
│
├── .github/
│   ├── workflows/                    # GitHub Actions
│   └── copilot-instructions.md       # Development guide
│
├── README.md                         # Project overview
├── STRUCTURE.md                      # This file
├── LICENSE                           # MIT License
└── smart-medical-assistant/          # Legacy module (archival)
```

---

## Directory Purpose Guide

### `/apps` - Core Applications
- **Purpose**: Contains all three main application components
- **Rationale**: Separates concerns by keeping each application isolated with own dependencies, configs, and build processes
- **When to add**: New major application feature should go to appropriate subdirectory, not root level

### `/apps/backend`
- **Java Spring Boot REST API**
- **Language**: Java 21
- **Build**: Maven (pom.xml)
- **Framework**: Spring Boot 3.3.2
- **Key packages**:
  - `auth/`: JWT, Spring Security
  - `patient/`, `doctor/`, `report/`: Domain entities
  - `messaging/`: Kafka producers/consumers
  - `observability/`: Metrics, audit logs
- **Startup**: `java -jar target/medical-backend-0.0.1-SNAPSHOT.jar`

### `/apps/frontend`
- **React Single-Page Application**
- **Language**: JavaScript/JSX
- **Build**: Vite
- **Styling**: TailwindCSS + PostCSS
- **Key dirs**:
  - `components/`: Reusable UI components
  - `pages/`: Full page views
  - `services/`: API client logic
  - `hooks/`: Custom React hooks
- **Startup**: `npm run dev` → http://localhost:5173

### `/apps/ai-service`
- **FastAPI Python Service**
- **Language**: Python 3.11
- **Build**: pip + requirements.txt
- **Models**: BioClinicalBERT, Hugging Face transformers
- **Key modules**:
  - `routes/`: REST endpoints (/chat, /predict)
  - `services/`: Model inference, preprocessing
  - `models.py`: Request/response schemas
- **Startup**: `uvicorn app.main:app --reload --port 8000`

### `/automation`
- **Purpose**: Workflow automation & integrations
- **Current**: n8n workflow definitions for document processing, alerts
- **Future**: Additional automation tools, scheduled jobs

### `/infra` - Infrastructure & DevOps
- **`docker/`**: Container orchestration configs
  - `docker-compose.yml`: All services (PostgreSQL, Kafka, ELK, N8N, etc.)
  - Dockerfile(s): Image build specifications
  - Config files: prometheus.yml, logstash.conf
- **`scripts/`**: Build & deployment automation
  - PowerShell scripts for Windows
  - Bash scripts for Linux/macOS
  - Testing utilities

### `/docs` - Documentation
- **`architecture/`**: System design, ER diagrams, patterns
- **`api/`**: Endpoint documentation, authentication flows
- **`deployment/`**: Docker, Kubernetes, production setup
- **Root docs**: Feature guides, troubleshooting, compliance

### `/data` - Data & Samples
- **`samples/`**: Example API request/response payloads
- **`schemas/`**: SQL initialization & test data
- **Purpose**: Enables onboarding and testing without production data

### `/tests` - Automated Testing
- **`unit/`**: Isolated component tests
- **`integration/`**: API, database, message queue tests
- **Purpose**: Separate from application code for cleaner test discovery

### `/assets` - Static Resources
- **images/**: Project screenshots, diagrams
- **styles/**: Shared CSS, design tokens
- **icons/**: SVG/PNG UI icons

---

## Key Principles

### 1. **Separation of Concerns**
- Each application (`backend`, `frontend`, `ai-service`) is independently deployable
- Infrastructure is separate from application code
- Documentation is centralized in `/docs`

### 2. **Scalability**
- Structure supports adding new services (add `/apps/new-service`)
- Monolithic configuration doesn't block parallel development
- Easy to convert `/apps/backend` to microservices later

### 3. **Industry Standards**
- Follows conventions used by major projects (Spring Boot templates, Create React App structure)
- Familiar to developers transitioning from other projects
- Supports enterprise CI/CD pipelines

### 4. **DevOps Friendly**
- All infrastructure in `/infra` → single source of truth
- Scripts folder makes automation discoverable
- Docker setup is unified, not scattered

### 5. **Documentation as Code**
- Docs live alongside code (`/docs`)
- Can reference code with relative links
- Keeps documentation synchronized with implementation

---

## Migration Reference

| Old Location | New Location | Notes |
|--------------|--------------|-------|
| `backend/` | `apps/backend/` | Maven project unchanged |
| `frontend/` | `apps/frontend/` | Vite config paths updated |
| `ai-service/` | `apps/ai-service/` | Python paths adjusted |
| `*.md` docs | `docs/` | Organized by category |
| `*.sql` | `data/schemas/` | Database scripts consolidated |
| `*.json` samples | `data/samples/` | Test data organized |
| `build-*.ps1` | `infra/scripts/` | Scripts grouped |
| `docker-compose.yml` | `infra/docker/` | Docker files together |
| `Dockerfile*` | `infra/docker/` | All containers in one place |
| `*.yml` configs | `infra/docker/` | Config files grouped |
| `n8n_workflows.json` | `automation/n8n/` | Automation isolated |

---

## Updating Configuration Files

### Docker Compose Paths
When updating `infra/docker/docker-compose.yml`:
- Backend context: `../../apps/backend`
- Frontend context: `../../apps/frontend`
- AI service context: `../../apps/ai-service`
- Log volume: `../../apps/backend/logs`

### Dockerfile Paths
When updating Dockerfile:
- COPY commands: Use relative paths from `infra/docker/`
- Example: `COPY ../../apps/backend/target/app.jar /app/`

### Script References
When updating shell/PowerShell scripts in `infra/scripts/`:
- Reference applications: `../../apps/backend`, `../../apps/frontend`
- Reference docker-compose: `../docker/docker-compose.yml`

---

## Best Practices

### Adding Files
1. **Application code** → `apps/<component>/`
2. **Configuration** → `infra/docker/` or `apps/<component>/src/main/resources/`
3. **Documentation** → `docs/<category>/`
4. **Test data** → `data/samples/` or `data/schemas/`
5. **Scripts** → `infra/scripts/`

### Naming Conventions
- **Directories**: lowercase with hyphens (`api-service`, `config-files`)
- **Files**: same as convention of the language (camelCase for JS, snake_case for Python, PascalCase for Java)
- **Branches**: `feature/description` or `fix/description`

### File Organization
- **Keep files close**: Related code should be in same directory
- **Avoid deep nesting**: Max 3-4 levels under `/apps/<component>`
- **Use index files**: `__init__.py`, `index.js` to simplify imports

---

## IDE Configuration

### IntelliJ IDEA / VS Code
- **Project root**: `AI-Powered Smart Medical Assistant/`
- **Backend module**: `apps/backend`
- **Frontend module**: `apps/frontend`
- **Run configs**:
  - Backend: `cd apps/backend && mvn spring-boot:run`
  - Frontend: `cd apps/frontend && npm run dev`
  - AI: `cd apps/ai-service && python -m uvicorn app.main:app --reload`

### GitHub Configuration
- **Actions workflows**: `.github/workflows/` (for CI/CD)
- **Branch protection**: Require tests to pass
- **Code owners**: CODEOWNERS file pointing to maintainers per directory

---

## Next Steps

1. **Update all relative paths** in configuration files
2. **Test local startup** from new structure
3. **Verify CI/CD** pipeline paths
4. **Update documentation links** to reference new paths
5. **Commit as single refactoring commit** with clear message

---

**Last Updated**: February 1, 2026  
**Status**: Structure Refactored ✅
