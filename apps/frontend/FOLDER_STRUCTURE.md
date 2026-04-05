# Medical Assistant - Frontend Folder Structure & Architecture

## Project Structure

```
frontend/
├── public/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── logo.svg
│   │   │   ├── hero-medical.png
│   │   │   └── placeholder-avatar.png
│   │   ├── icons/
│   │   │   ├── upload.svg
│   │   │   ├── download.svg
│   │   │   └── alert.svg
│   │   └── fonts/
│   ├── favicon.ico
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx                    # Reusable button component
│   │   │   ├── Modal.jsx                     # Modal dialog component
│   │   │   ├── Card.jsx                      # Card wrapper component
│   │   │   ├── Badge.jsx                     # Status/label badges
│   │   │   ├── Loader.jsx                    # Loading spinner
│   │   │   ├── Toast.jsx                     # Toast notifications
│   │   │   ├── ProtectedRoute.jsx            # Route guard (CREATED)
│   │   │   ├── Alert.jsx                     # Alert component
│   │   │   └── index.js                      # Barrel export
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.jsx                    # Top navigation bar
│   │   │   ├── Sidebar.jsx                   # Side navigation
│   │   │   ├── DashboardLayout.jsx           # Main dashboard wrapper
│   │   │   ├── Footer.jsx                    # Footer component
│   │   │   └── index.js                      # Barrel export
│   │   │
│   │   ├── patient/
│   │   │   ├── PatientCard.jsx               # Patient info card
│   │   │   ├── PatientForm.jsx               # Patient form (create/edit)
│   │   │   ├── PatientList.jsx               # Patient list with filters
│   │   │   ├── ReportUploader.jsx            # File upload component
│   │   │   ├── ReportViewer.jsx              # Medical report viewer
│   │   │   ├── PrescriptionCard.jsx          # Prescription display
│   │   │   └── index.js                      # Barrel export
│   │   │
│   │   ├── doctor/
│   │   │   ├── DoctorCard.jsx                # Doctor info card
│   │   │   ├── DoctorForm.jsx                # Doctor form (create/edit)
│   │   │   ├── DoctorSchedule.jsx            # Doctor availability calendar
│   │   │   └── index.js                      # Barrel export
│   │   │
│   │   ├── ai/
│   │   │   ├── SymptomChecker.jsx            # AI symptom analyzer
│   │   │   ├── ChatBot.jsx                   # AI chatbot interface
│   │   │   ├── ReportAnalysis.jsx            # AI report analysis
│   │   │   └── index.js                      # Barrel export
│   │   │
│   │   └── auth/
│   │       ├── LoginForm.jsx                 # Login form component
│   │       ├── RegisterForm.jsx              # Registration form component
│   │       └── index.js                      # Barrel export
│   │
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── LoginPage.jsx                 # Login page (CREATED)
│   │   │   ├── RegisterPage.jsx              # Registration page
│   │   │   ├── ForgotPasswordPage.jsx        # Password reset page
│   │   │   └── index.js                      # Barrel export
│   │   │
│   │   ├── patient/
│   │   │   ├── PatientDashboard.jsx          # Main patient dashboard (CREATED)
│   │   │   ├── PatientDetailsPage.jsx        # Individual patient details
│   │   │   ├── MedicalRecordsPage.jsx        # Medical records view
│   │   │   ├── PrescriptionsPage.jsx         # Prescriptions list
│   │   │   ├── ReportsPage.jsx               # Reports view
│   │   │   ├── UploadReportPage.jsx          # Report upload page
│   │   │   └── index.js                      # Barrel export
│   │   │
│   │   ├── doctor/
│   │   │   ├── DoctorDashboard.jsx           # Doctor main dashboard
│   │   │   ├── DoctorSchedulePage.jsx        # Doctor schedule management
│   │   │   ├── PatientsListPage.jsx          # Doctor's patients list
│   │   │   └── index.js                      # Barrel export
│   │   │
│   │   ├── ai/
│   │   │   ├── SymptomCheckerPage.jsx        # Symptom checker full page
│   │   │   ├── ChatbotPage.jsx               # Chatbot full page
│   │   │   └── index.js                      # Barrel export
│   │   │
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx            # Admin overview
│   │   │   ├── UsersManagementPage.jsx       # User management
│   │   │   ├── SystemLogsPage.jsx            # System logs view
│   │   │   └── index.js                      # Barrel export
│   │   │
│   │   ├── NotFoundPage.jsx                  # 404 page
│   │   ├── UnauthorizedPage.jsx              # 403 page
│   │   ├── ServerErrorPage.jsx               # 500 page
│   │   └── index.js                          # Barrel export
│   │
│   ├── services/
│   │   ├── api.js                            # Axios instance + interceptors (CREATED)
│   │   ├── authService.js                    # Auth API calls (CREATED)
│   │   ├── patientService.js                 # Patient API calls (CREATED)
│   │   ├── doctorService.js                  # Doctor API calls
│   │   ├── reportService.js                  # Report API calls
│   │   ├── prescriptionService.js            # Prescription API calls
│   │   ├── aiService.js                      # AI service API calls
│   │   ├── emergencyService.js               # Emergency access API calls
│   │   └── index.js                          # Service barrel export
│   │
│   ├── hooks/
│   │   ├── useAuth.js                        # Auth context hook (CREATED)
│   │   ├── usePatients.js                    # Fetch patients hook
│   │   ├── useDoctors.js                     # Fetch doctors hook
│   │   ├── useReports.js                     # Fetch reports hook
│   │   ├── usePrescriptions.js               # Fetch prescriptions hook
│   │   ├── useFileUpload.js                  # File upload with progress
│   │   ├── useForm.js                        # Form state management
│   │   ├── useLocalStorage.js                # Local storage hook
│   │   ├── useDebounce.js                    # Debounce hook
│   │   ├── useFetch.js                       # Generic fetch hook
│   │   └── index.js                          # Hooks barrel export
│   │
│   ├── context/
│   │   ├── AuthContext.jsx                   # Auth state (CREATED)
│   │   ├── ThemeContext.jsx                  # Theme/dark mode
│   │   ├── NotificationContext.jsx           # Notifications/toasts
│   │   ├── UserPreferencesContext.jsx        # User settings
│   │   └── index.js                          # Context barrel export
│   │
│   ├── utils/
│   │   ├── constants.js                      # App constants
│   │   ├── helpers.js                        # Utility functions
│   │   ├── validators.js                     # Form validators
│   │   ├── formatters.js                     # Data formatters
│   │   ├── errorHandler.js                   # Error handling utilities
│   │   ├── storageManager.js                 # LocalStorage wrapper
│   │   └── index.js                          # Utils barrel export
│   │
│   ├── styles/
│   │   ├── globals.css                       # Global styles
│   │   ├── variables.css                     # CSS variables
│   │   ├── animations.css                    # Animations
│   │   └── responsive.css                    # Responsive utilities
│   │
│   ├── types/
│   │   ├── index.d.ts                        # TypeScript type definitions
│   │   ├── auth.d.ts                         # Auth types
│   │   ├── patient.d.ts                      # Patient types
│   │   ├── doctor.d.ts                       # Doctor types
│   │   └── report.d.ts                       # Report types
│   │
│   ├── constants/
│   │   ├── apiEndpoints.js                   # API endpoints
│   │   ├── appConfig.js                      # App configuration
│   │   ├── messages.js                       # Error/success messages
│   │   └── roles.js                          # User role constants
│   │
│   ├── App.jsx                               # Root app component (CREATED)
│   ├── main.jsx                              # Entry point (CREATED)
│   └── index.css                             # Root styles (CREATED)
│
├── .env                                      # Environment variables (CREATED)
├── .env.example                              # Environment template (CREATED)
├── .gitignore
├── .eslintrc.js                              # ESLint config
├── .prettierrc.js                            # Prettier config
├── package.json                              # Dependencies (CREATED)
├── vite.config.js                            # Vite configuration (CREATED)
├── tailwind.config.js                        # Tailwind configuration (CREATED)
├── postcss.config.js                         # PostCSS configuration (CREATED)
├── index.html                                # HTML entry point (CREATED)
├── README.md                                 # Frontend documentation (CREATED)
└── FOLDER_STRUCTURE.md                       # This file
```

## Folder Purpose & Conventions

### 1. **public/** - Static Assets
- Contains static files that don't get processed by Vite
- **Naming**: lowercase with hyphens (e.g., `hero-medical.png`)
- Assets optimized for web (SVG for icons, compressed images)

### 2. **src/components/** - Reusable Components
**Naming Convention**: PascalCase (e.g., `PatientCard.jsx`)

#### common/
- **Purpose**: Shared UI components used across app
- **Examples**: Button, Modal, Card, Badge, Loader, Toast
- **Usage**: Import from barrel export: `import { Button, Modal } from '@/components/common'`

#### layout/
- **Purpose**: Layout wrappers (Navbar, Sidebar, Footer)
- **Examples**: DashboardLayout, AuthLayout
- **Pattern**: Accept `children` prop for page content

#### patient/, doctor/, ai/, auth/
- **Purpose**: Domain-specific components
- **Organization**: Group by feature domain
- **Reusability**: Can be used in multiple pages

### 3. **src/pages/** - Page Components
**Naming Convention**: PascalCase ending with `Page` (e.g., `PatientDashboard.jsx`, `LoginPage.jsx`)

- **Purpose**: Full page components mapped to routes
- **Structure**: One folder per route section (auth, patient, doctor, admin)
- **Pattern**: Pages compose smaller components
- **Responsibility**: Handle routing, page-level state, layout selection

### 4. **src/services/** - API Layer
**Naming Convention**: camelCase (e.g., `patientService.js`)

```javascript
// Pattern: One service per domain
// authService.js - login, logout, register
// patientService.js - CRUD operations on patients
// reportService.js - report upload, fetch, analysis

// Usage:
import { patientService } from '@/services'
const { data } = await patientService.getPatients()
```

**Best Practices**:
- Abstract API calls away from components
- Return promises (axios handles HTTP)
- Consistent naming: `get*`, `create*`, `update*`, `delete*`
- Handle errors in service or let component handle via try/catch

### 5. **src/hooks/** - Custom React Hooks
**Naming Convention**: camelCase starting with `use` (e.g., `useAuth.js`, `usePatients.js`)

```javascript
// Pattern: useQuery hook for data fetching
const usePatients = () => {
  return useQuery({
    queryKey: ['patients'],
    queryFn: patientService.getPatients,
  })
}

// Pattern: useAuth for authentication state
const { user, login, logout } = useAuth()

// Pattern: useFetch for generic data loading
const { data, loading, error } = useFetch('/patients')
```

**Built-in Hooks Used**:
- `useContext` - Access global state (auth, theme)
- `useState` - Local component state
- `useEffect` - Side effects
- `useQuery` (React Query) - Server state management
- `useMutation` (React Query) - Mutations

### 6. **src/context/** - Global State Management
**Naming Convention**: PascalCase ending with `Context` (e.g., `AuthContext.jsx`)

```javascript
// Pattern: Context + Provider + Hook
// 1. Create context
// 2. Create provider component
// 3. Export custom hook for easy access

// Usage:
import { useAuth } from '@/context/AuthContext'
const { user, login } = useAuth()
```

**Contexts**:
- `AuthContext`: User, token, login/logout
- `ThemeContext`: Light/dark mode
- `NotificationContext`: Toast messages
- `UserPreferencesContext`: UI preferences

### 7. **src/utils/** - Utility Functions
**Naming Convention**: camelCase (e.g., `formatters.js`, `validators.js`)

```javascript
// validators.js - Form validation
export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
export const validatePassword = (pwd) => pwd.length >= 8

// formatters.js - Data formatting
export const formatDate = (date) => new Date(date).toLocaleDateString()
export const formatCurrency = (amount) => `$${(amount / 100).toFixed(2)}`

// helpers.js - General utilities
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
export const getInitials = (name) => name.split(' ').map(n => n[0]).join('')
```

### 8. **src/constants/** - Hardcoded Values
**Naming Convention**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `USER_ROLES`)

```javascript
// apiEndpoints.js
export const API_ENDPOINTS = {
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  PATIENTS: '/patients',
  REPORTS: '/reports',
}

// roles.js
export const USER_ROLES = {
  PATIENT: 'PATIENT',
  CLINICIAN: 'CLINICIAN',
  ADMIN: 'ADMIN',
}
```

### 9. **src/styles/** - Global Styling
- **index.css**: Root imports (Tailwind, CSS variables)
- **variables.css**: CSS custom properties
- **animations.css**: Reusable animations
- **responsive.css**: Media query utilities

## Naming Conventions Summary

| Type | Example | Pattern |
|------|---------|---------|
| Components | `PatientCard.jsx` | PascalCase |
| Pages | `PatientDashboard.jsx` | PascalCase + "Page" suffix |
| Services | `patientService.js` | camelCase + "Service" suffix |
| Hooks | `usePatients.js` | camelCase + "use" prefix |
| Context | `AuthContext.jsx` | PascalCase + "Context" suffix |
| Utils | `formatters.js` | camelCase |
| Constants | `USER_ROLES` | UPPER_SNAKE_CASE |
| Files | `auth.d.ts` | lowercase with dots |
| Folders | `src/components/` | lowercase/kebab-case |

## Import Path Aliases

Configure in `vite.config.js`:
```javascript
resolve: {
  alias: {
    '@': resolve(__dirname, './src'),
    '@/components': resolve(__dirname, './src/components'),
    '@/pages': resolve(__dirname, './src/pages'),
    '@/services': resolve(__dirname, './src/services'),
    '@/hooks': resolve(__dirname, './src/hooks'),
    '@/context': resolve(__dirname, './src/context'),
    '@/utils': resolve(__dirname, './src/utils'),
  }
}
```

**Usage**:
```javascript
// Instead of: ../../../services/patientService
import { patientService } from '@/services'
import { PatientCard } from '@/components/patient'
```

## Component Structure Template

### Simple Component
```javascript
// src/components/patient/PatientCard.jsx
const PatientCard = ({ patient, onSelect }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold">{patient.firstName} {patient.lastName}</h3>
      <p className="text-gray-600">{patient.email}</p>
      <button onClick={() => onSelect(patient.id)}>View</button>
    </div>
  )
}

export default PatientCard
```

### Container Component (with data fetching)
```javascript
// src/pages/patient/PatientDashboard.jsx
import { useQuery } from '@tanstack/react-query'
import { patientService } from '@/services'
import { PatientCard } from '@/components/patient'

const PatientDashboard = () => {
  const { data: patients, isLoading, error } = useQuery({
    queryKey: ['patients'],
    queryFn: patientService.getPatients,
  })

  if (isLoading) return <Loader />
  if (error) return <Alert type="error" message="Failed to load patients" />

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {patients.map(patient => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
    </div>
  )
}

export default PatientDashboard
```

## Best Practices

### 1. **Component Composition**
- Keep components small and focused (Single Responsibility)
- Compose larger features from smaller components
- Use composition over inheritance

### 2. **State Management**
- **Local state** (`useState`): Component-specific
- **Global state** (`Context`): Auth, theme, user prefs
- **Server state** (`React Query`): API data, caching
- **Form state** (`useForm` hook): Form validation, submission

### 3. **Data Fetching**
- Use `React Query` for server state (caching, refetching, offline support)
- Place data fetching in custom hooks
- Handle loading/error states consistently

### 4. **Error Handling**
- Create error boundary for unhandled errors
- Show user-friendly error messages
- Log errors for debugging

### 5. **Performance**
- Use `React.memo` for expensive renders
- Lazy load pages with `React.lazy()`
- Optimize images (use WebP, compress)
- Use `useMemo`/`useCallback` sparingly

### 6. **Accessibility**
- Use semantic HTML (button, form, nav)
- Add ARIA labels where needed
- Ensure keyboard navigation
- Color contrast for readability

### 7. **Testing Structure**
```
src/
├── components/
│   ├── PatientCard.jsx
│   └── PatientCard.test.jsx    # Co-locate tests with components
├── hooks/
│   ├── usePatients.js
│   └── usePatients.test.js
└── services/
    ├── patientService.js
    └── patientService.test.js
```

## File Size Guidelines

| Type | Max Size |
|------|----------|
| Component | 300 lines |
| Page | 400 lines |
| Service | 250 lines |
| Hook | 200 lines |
| Util | 150 lines |

If exceeding limits, break into smaller files.

## Common Patterns

### Protected Route Pattern
```javascript
<Route
  path="/patient/dashboard"
  element={
    <ProtectedRoute allowedRoles={['PATIENT', 'CLINICIAN']}>
      <PatientDashboard />
    </ProtectedRoute>
  }
/>
```

### Form Handling Pattern
```javascript
const MyForm = () => {
  const { values, errors, handleSubmit } = useForm({
    initialValues: { name: '', email: '' },
    onSubmit: async (values) => {
      await patientService.createPatient(values)
    },
    validate: { email: validateEmail }
  })
  
  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  )
}
```

### Data Fetching Pattern
```javascript
const usePatients = (filters = {}) => {
  return useQuery({
    queryKey: ['patients', filters],
    queryFn: () => patientService.getPatients(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  })
}
```

## Development Workflow

1. **Create folder structure** for new feature
2. **Start with hooks** (data fetching)
3. **Build components** (small, reusable)
4. **Compose pages** (use components)
5. **Add routes** (connect pages)
6. **Test** (unit, integration)
7. **Optimize** (performance, accessibility)

## Next Steps

1. Create remaining service files (doctorService, reportService, etc.)
2. Implement custom hooks for data fetching
3. Build reusable UI components
4. Create page components for main features
5. Set up error boundaries and error handling
6. Add unit tests for critical functions
7. Implement analytics/logging

---

**References**:
- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [React Query](https://tanstack.com/query/)
- [Tailwind CSS](https://tailwindcss.com)
- [Component Patterns](https://patterns.dev/posts/component-composition-guide)
