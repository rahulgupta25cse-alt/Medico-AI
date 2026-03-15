# Dashboard UI Implementation - Complete Setup Guide

## Quick Start

This guide shows you how to integrate the modern AI Medical Assistant Dashboard into your application.

## Step 1: Import Components

Add these imports to your main `App.jsx`:

```jsx
import AIAssistantDashboard from './pages/dashboard/AIAssistantDashboard'
import EmergencyContactPanel from './components/common/EmergencyContactPanel'
import VitalSigns from './components/common/VitalSigns'
import { ThemeProvider } from './context/ThemeContext'
import MobileLayout from './components/layout/MobileLayout'
```

## Step 2: Setup Routing

Add these routes to your React Router configuration:

```jsx
// In your router configuration
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AIAssistantDashboard from './pages/dashboard/AIAssistantDashboard'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/dashboard/ai-assistant',
        element: <AIAssistantDashboard />
    },
    // ... other routes
])
```

## Step 3: Wrap App with ThemeProvider

Update your `main.jsx`:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </React.StrictMode>
)
```

## Step 4: Add Emergency Panel Globally

In your main `App.jsx`:

```jsx
import EmergencyContactPanel from './components/common/EmergencyContactPanel'

export default function App() {
    return (
        <>
            {/* Your existing routes and components */}
            <Routes>
                {/* ... routes */}
            </Routes>
            
            {/* Emergency panel available everywhere */}
            <EmergencyContactPanel />
        </>
    )
}
```

## Step 5: Use Components in Pages

### Example 1: Standalone Dashboard Page
```jsx
import AIAssistantDashboard from './pages/dashboard/AIAssistantDashboard'

export default function DashboardPage() {
    return (
        <div className="min-h-screen">
            <AIAssistantDashboard />
        </div>
    )
}
```

### Example 2: Dashboard with VitalSigns Widget
```jsx
import VitalSigns from './components/common/VitalSigns'

export default function HealthPage() {
    return (
        <div className="p-8 bg-gradient-to-br from-slate-950 to-blue-950">
            <h1 className="text-3xl font-bold text-white mb-8">Health Monitoring</h1>
            <VitalSigns size="default" />
        </div>
    )
}
```

### Example 3: Compact Vital Signs in Sidebar
```jsx
import VitalSigns from './components/common/VitalSigns'

export default function Sidebar() {
    return (
        <aside className="w-80 bg-slate-900 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Your Health</h2>
            <VitalSigns size="compact" />
        </aside>
    )
}
```

### Example 4: Mobile Layout Wrapper
```jsx
import MobileLayout from './components/layout/MobileLayout'
import AIAssistantDashboard from './pages/dashboard/AIAssistantDashboard'

export default function MobileDashboard() {
    return (
        <MobileLayout 
            title="Medical Assistant"
            showBackButton={false}
        >
            <AIAssistantDashboard />
        </MobileLayout>
    )
}
```

## Usage Examples

### Using Theme Context
```jsx
import { useTheme } from './context/ThemeContext'

export default function MyComponent() {
    const { accentColor, setAccentColor, getAccent } = useTheme()
    const accent = getAccent()
    
    return (
        <div style={{ color: accent.primary }}>
            {/* Your component */}
        </div>
    )
}
```

### Connecting Chat Functionality
```jsx
const handleSendMessage = async (message) => {
    try {
        const response = await apiClient.post('/api/chat', {
            message: message,
            userId: user.id,
            timestamp: new Date()
        })
        
        setChatMessages(prev => [...prev, {
            type: 'bot',
            message: response.data.reply,
            timestamp: new Date()
        }])
    } catch (error) {
        console.error('Error sending message:', error)
    }
}
```

### Connecting Symptom Analyzer
```jsx
const handleAnalyzeSymptoms = async () => {
    setLoading(true)
    try {
        const response = await apiClient.post('/api/analyze', {
            symptoms: selectedSymptoms,
            description: symptoms,
            userId: user.id
        })
        
        setRecommendations(response.data.recommendations)
        setActiveTab('recommendations')
    } catch (error) {
        console.error('Error analyzing symptoms:', error)
        // Show error toast
    } finally {
        setLoading(false)
    }
}
```

### Fetching Real Health Data
```jsx
useEffect(() => {
    const fetchHealthData = async () => {
        try {
            const response = await apiClient.get('/api/health/vitals')
            setVitals(response.data)
        } catch (error) {
            console.error('Error fetching health data:', error)
        }
    }
    
    // Poll every 30 seconds
    const interval = setInterval(fetchHealthData, 30000)
    fetchHealthData()
    
    return () => clearInterval(interval)
}, [])
```

## File Structure After Integration

```
src/
├── App.jsx                              # Main app with routes
├── main.jsx                             # Entry point with ThemeProvider
├── pages/
│   ├── dashboard/
│   │   ├── AIAssistantDashboard.jsx    # ✅ Main dashboard
│   │   ├── AIAssistantDashboard.css    # ✅ Dashboard styles
│   │   └── DashboardHome.jsx           # Existing dashboard
│   ├── ai/                             # AI module
│   └── ...
├── components/
│   ├── common/
│   │   ├── EmergencyContactPanel.jsx   # ✅ Emergency panel
│   │   └── VitalSigns.jsx              # ✅ Vital signs
│   ├── layout/
│   │   ├── MobileLayout.jsx            # ✅ Mobile layout
│   │   ├── MobileLayout.css            # ✅ Mobile styles
│   │   └── ...
│   └── ...
├── context/
│   ├── ThemeContext.jsx                # ✅ Theme provider
│   ├── AuthContext.jsx                 # Existing
│   └── ...
├── services/
│   ├── api.js                          # API client
│   └── ...
└── styles/
    └── index.css                       # Global styles
```

## API Integration Points

### Backend Endpoints Required

```bash
# Authentication
POST   /auth/login
POST   /auth/register
GET    /auth/verify

# Health Data
GET    /api/health/vitals              # Get vital signs
POST   /api/health/vitals              # Log vital signs
GET    /api/health/history

# AI Services
POST   /api/ai/chat                    # Chat with AI
POST   /api/ai/analyze-symptoms        # Symptom analysis
GET    /api/ai/recommendations         # Medicine recommendations
POST   /api/ai/report                  # Generate health report

# Appointments
GET    /api/appointments
POST   /api/appointments
PUT    /api/appointments/{id}

# Emergency
GET    /api/emergency/contacts
POST   /api/emergency/call
```

## Environment Configuration

Create a `.env` file in the frontend root:

```env
VITE_API_URL=http://localhost:8080
VITE_AI_SERVICE_URL=http://localhost:8000
VITE_APP_NAME=Medical Assistant
VITE_THEME=dark
VITE_ACCENT_COLOR=cyan
```

## Styling Customization

### Change Primary Colors

Edit `tailwind.config.js`:

```javascript
theme: {
    extend: {
        colors: {
            primary: {
                50: '#f0f7ff',
                // ... your custom colors
                950: '#082f49',
            }
        }
    }
}
```

### Add Custom Fonts

```css
/* In index.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

body {
    font-family: 'Inter', sans-serif;
}
```

## Testing

### Unit Tests
```jsx
import { render, screen } from '@testing-library/react'
import AIAssistantDashboard from './AIAssistantDashboard'

describe('AIAssistantDashboard', () => {
    it('should render all tabs', () => {
        render(<AIAssistantDashboard />)
        expect(screen.getByText('AI Chat')).toBeInTheDocument()
        expect(screen.getByText('Symptom Checker')).toBeInTheDocument()
    })
})
```

### E2E Tests
```javascript
// Cypress example
describe('Dashboard Navigation', () => {
    it('should navigate between tabs', () => {
        cy.visit('/dashboard/ai-assistant')
        cy.contains('Symptom Checker').click()
        cy.url().should('include', 'symptoms')
    })
})
```

## Performance Tips

1. **Lazy Load Dashboard**
   ```jsx
   const AIAssistantDashboard = lazy(() => 
       import('./pages/dashboard/AIAssistantDashboard')
   )
   ```

2. **Memoize Components**
   ```jsx
   const HealthReportCard = memo(({ report }) => (
       // Component
   ))
   ```

3. **Optimize Images**
   - Use WebP format
   - Lazy load images
   - Compress SVGs

4. **Code Splitting**
   - Split by route
   - Split large components
   - Dynamic imports

## Troubleshooting

### Components Not Rendering
- Check imports are correct
- Verify CSS files are imported
- Check for console errors

### Styles Not Applying
- Ensure Tailwind is configured
- Check `content` paths in `tailwind.config.js`
- Rebuild Tailwind CSS

### Icons Not Showing
```bash
npm install lucide-react
```

### Theme Not Applying
- Wrap app with `<ThemeProvider>`
- Check `useTheme()` is in correct component
- Verify context is exported correctly

## Browser DevTools Tips

1. **Element Inspector**
   - Check computed styles
   - Inspect Tailwind classes

2. **Network Tab**
   - Monitor API calls
   - Check response times

3. **Performance Tab**
   - Profile animations
   - Check component renders
   - Identify bottlenecks

## Further Customization

### Adding New Features
1. Create component in `components/`
2. Import in dashboard
3. Add to appropriate section
4. Style with Tailwind classes

### Extending Functionality
1. Add API calls in services
2. Update components to use data
3. Add error handling
4. Add success/error notifications

## Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [Vite Guide](https://vitejs.dev)
- [React Router](https://reactrouter.com)

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review integration guide
3. Check browser console for errors
4. Verify API endpoints
5. Contact development team

---

**Last Updated**: March 15, 2026
