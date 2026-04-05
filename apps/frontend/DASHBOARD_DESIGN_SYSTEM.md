# Healthcare Dashboard Design System

## Design Philosophy

### Core Principles
1. **Patient-Centric**: Data presented in context of patient health
2. **Clear Hierarchy**: Most critical information first
3. **Minimal Cognitive Load**: Reduce decision-making friction
4. **Medical Accuracy**: Display medically relevant metrics
5. **Accessibility First**: WCAG 2.1 AA compliant
6. **Mobile Responsive**: Works on all device sizes
7. **Intuitive Navigation**: Predictable information architecture

### Color System for Medical Context

```javascript
// Status Indicators
CRITICAL: #dc2626 (Red)         // Immediate action needed
WARNING: #f59e0b (Amber)        // Attention required
CAUTION: #eab308 (Yellow)       // Monitor closely
NORMAL: #10b981 (Green)         // Healthy range
INFO: #0284c7 (Blue)            // Information
NEUTRAL: #6b7280 (Gray)         // Inactive/historical

// Semantic Meaning
Normal Lab Result: #10b981
Abnormal Lab Result: #f59e0b
Critical Lab Result: #dc2626
Pending Result: #0284c7
No Data: #d1d5db
```

### Typography for Medical Data

```javascript
// Hierarchy
Heading 1 (Dashboard Title): 2xl (24px) Bold
Heading 2 (Section): xl (20px) SemiBold
Heading 3 (Subsection): lg (18px) SemiBold
Body (Content): base (16px) Regular
Small (Secondary): sm (14px) Regular
Caption (Metadata): xs (12px) Regular

// Data Display
Metric Values: lg (18px) Bold        // Numbers like BP, HR
Metric Labels: sm (14px) SemiBold    // What the metric is
Timestamps: xs (12px) Regular        // When data was collected
```

### Spacing & Layout Grid

```javascript
// Base unit: 4px
Micro spacing: 4px, 8px
Padding: 16px, 24px, 32px
Margin: 16px, 24px, 32px
Gap (Grid): 16px, 24px
Gap (Flex): 8px, 12px, 16px

// Breakpoints
Mobile: 0-640px
Tablet: 641px-1024px
Desktop: 1025px-1440px
Large: 1441px+
```

### Accessibility Standards

```javascript
// WCAG 2.1 AA Compliance
Color Contrast: 4.5:1 for text, 3:1 for graphics
Focus Indicators: Visible 3px outline
Keyboard Navigation: Tab order logical
Screen Reader: All content has meaningful labels
Motion: Respect prefers-reduced-motion
Text: Min 14px for body, sufficient line-height (1.5+)
```

---

## Dashboard Component Library

### 1. Metric Card (Basic)
```
┌─────────────────────────────────────┐
│ Label (Timestamp)                   │
├─────────────────────────────────────┤
│                                     │
│  120/80 mmHg    ✓ Normal            │
│  Blood Pressure                     │
│                                     │
│  Last: 2hrs ago  | Goal: <130/80    │
└─────────────────────────────────────┘

// Features
- Status badge (Normal/Warning/Critical)
- Current value (bold, large)
- Metric name
- Last reading timestamp
- Target/goal reference
- Trend indicator (↑ ↓ ─)
```

### 2. Quick Stats Row
```
┌──────────┬──────────┬──────────┬──────────┐
│  HR      │  SPO2    │  TEMP    │  WEIGHT  │
│  78 bpm  │  98%     │  37°C    │  72.5kg  │
│  Normal  │  Normal  │  Normal  │  ▼ -0.5  │
└──────────┴──────────┴──────────┴──────────┘

// Inline metrics for quick overview
- Compact card format
- Single metric per card
- Status color indicator
- Trend arrow
- Responsive (1-4 cols based on screen)
```

### 3. Time Series Chart
```
Chart Title
─────────────────────────────────
│
│   ___
│  /   \___     Legend
│ /         \__ • BP Systolic
│/            \_ • BP Diastolic
└─────────────────────────────────
  Jan 1  Jan 8  Jan 15  Jan 22

// Best for:
- Vital trends over time
- Weight tracking
- Lab value trends
- Medication compliance
```

### 4. Status Timeline
```
Date/Time  Event              Status
─────────────────────────────────────
Jan 22     Medication taken    ✓ Complete
Jan 22     Glucose check       ✓ Completed: 145 mg/dL
Jan 21     Doctor appointment  ✓ Completed
Jan 21     Lab draw            ✓ Completed
Jan 20     Follow-up reminder  ⟲ Pending

// Used for:
- Patient events chronologically
- Appointment tracking
- Medication adherence
- Lab results history
```

### 5. Alert Banner
```
┌──────────────────────────────────────┐
│ ⚠  WARNING: Blood pressure elevated  │
│ Systolic 158 mmHg (Goal: <130)       │
│ [Learn More] [Dismiss]               │
└──────────────────────────────────────┘

// Types
- Critical (red background)
- Warning (yellow background)
- Info (blue background)
- Success (green background)
```

### 6. Data Table (Medical Results)
```
Lab Test           Result    Reference   Status    Date
────────────────────────────────────────────────────────
Hemoglobin         14.2 g/dL 12-16       ✓ Normal  Jan 20
Glucose (Fasting)  145 mg/dL 70-100      ⚠ High    Jan 20
Cholesterol        215 mg/dL <200        ⚠ High    Jan 20
HDL Cholesterol    45 mg/dL  >40         ✓ Normal  Jan 20

// Features
- Sortable columns
- Color-coded status
- Reference ranges visible
- Date information
- Expandable detail rows
```

### 7. Navigation Sidebar
```
┌─────────────────────┐
│ MEDICAL ASSISTANT   │
├─────────────────────┤
│ ⌂ Dashboard         │
│ 📋 Medical Records  │
│ 💊 Medications      │
│ 🩺 Lab Results      │
│ 📅 Appointments     │
│ ❤️  Health Goals    │
│ ⚙️  Settings        │
├─────────────────────┤
│ Dr. Sarah Johnson   │
│ [Logout]            │
└─────────────────────┘

// Responsive
- Full sidebar (desktop)
- Hamburger menu (tablet)
- Bottom nav (mobile)
```

### 8. Card Grid Layout
```
[16px] [Card] [24px gap] [Card] [24px gap] [Card] [16px]
       [350px]            [350px]             [350px]

// Responsive
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column
- Gaps: 24px desktop, 16px tablet, 12px mobile
```

---

## Medical Data Visualization Best Practices

### 1. Vital Signs Display

```
┌─ VITAL SIGNS ─────────────────┐
│                               │
│  Heart Rate    Resp. Rate     │
│  78 bpm        16 bpm         │
│  Normal ✓      Normal ✓       │
│                               │
│  Blood Pressure  Temperature  │
│  120/80 mmHg     37°C         │
│  Normal ✓        Normal ✓     │
│                               │
│  SpO2           Blood Glucose │
│  98%            145 mg/dL     │
│  Normal ✓       High ⚠        │
│                               │
└───────────────────────────────┘

// Why this layout:
- Pairs related metrics (BP = systolic/diastolic)
- Immediate status visibility
- Consistent unit display
- Medical convention: top-left to bottom-right order
```

### 2. Lab Results Visualization

```
Normal Range Visualization
─────────────────────────────────
Hemoglobin: 14.2 g/dL
[Low] ◄─── 12 |████| 16 ───► [High]
       Your Result ^

// Features
- Reference range shown
- Position on scale
- Over/under indication
- Color: Green (normal), Yellow (caution), Red (critical)
```

### 3. Medication Adherence

```
Weekly Adherence Chart
┌─ 6 pills missed (86% adherence) ─┐
│                                  │
│ Mon ✓ Tue ✗ Wed ✓ Thu ✓ Fri ✓  │
│ Sat ✓ Sun ✓                      │
│                                  │
│ Trend: ↑ Improving               │
│ Next reminder: Tue 8:00 AM       │
└──────────────────────────────────┘

// Visual adherence tracking
- Daily check marks
- Weekly summary
- Trend indicator
- Next dose reminder
```

### 4. Weight Tracking

```
Weight Trend (Last 30 Days)
─────────────────────────────
Goal: 70kg
Current: 72.5kg (+2.5kg above goal)

   75kg |        ╱─
   74kg |   ╱───╱
   73kg |  ╱
   72kg | ╱
   71kg |
   70kg |________________ Goal line
        └─────────────────────
          Jan 1   Jan 15   Jan 22

// Clear trend visualization
- Goal line shown
- Current vs target
- Variance indicated
- Progress timeline
```

---

## Dashboard Navigation Structure

### Information Hierarchy Principle

```
Level 1: Critical/Time-Sensitive
├─ Alerts (abnormal results, missed appointments)
├─ Overdue items
└─ Pending actions

Level 2: Current Status
├─ Today's vitals
├─ Current medications
└─ Upcoming appointments

Level 3: Historical/Reference
├─ Lab results history
├─ Trend charts
└─ Health records
```

### Cognitive Load Reduction

**Principle**: Show only what user needs NOW

```
// ❌ DON'T: Show everything
Dashboard: 50+ data points, 15 charts, overwhelming

// ✅ DO: Progressive disclosure
Dashboard (3 sections):
  1. Alerts & Today's Data (3-5 items)
  2. Key Metrics (6 cards)
  3. [View More] → Detailed section

[View More] → Detailed Dashboard:
  - Complete health picture
  - All metrics
  - Advanced analytics
```

---

## Accessibility Implementation

### Screen Reader Optimization

```javascript
// ❌ Avoid
<div>120/80</div>

// ✅ Do this
<div aria-label="Blood Pressure: 120 systolic, 80 diastolic, Normal">
  <span aria-hidden="true">120/80 mmHg</span>
</div>

// ✅ Or use ARIA live regions for updates
<div aria-live="polite" aria-label="Alert">
  ⚠ Blood pressure elevated
</div>
```

### Keyboard Navigation

```
Tab Order Logic:
1. Alerts (if present)
2. Primary navigation
3. Action buttons
4. Metric cards
5. View more links

// Focus management
- Visible 3px outline
- Color + shape change
- Never use outline: none
```

### Color Accessibility

```
// ✓ Status System (not color-alone)
❌ Red                    → ❌ Red + Symbol
⚠  Yellow                → ⚠ Yellow + Symbol
✓ Green                  → ✓ Green + Symbol

// Contrast Ratios
Text on background: 4.5:1 minimum
Icons on background: 3:1 minimum
Graphs: Use patterns + color
```

### Mobile Accessibility

```
- Touch targets: 44x44px minimum
- Text: 16px minimum (no zoom)
- Line height: 1.5+ for readability
- Labels always visible (not placeholder text)
- Logical tab order
```

---

## State Management in Dashboards

### Data Fetching States

```javascript
// Initial Load
┌─────────────────────────────┐
│   Loading...                │
│   ⟳ Fetching your data      │
└─────────────────────────────┘

// Loaded
┌─────────────────────────────┐
│   Dashboard content         │
└─────────────────────────────┘

// Error
┌─────────────────────────────┐
│   ⚠ Error loading data      │
│   Please refresh page       │
│   [Retry] [Go Back]         │
└─────────────────────────────┘

// Empty State
┌─────────────────────────────┐
│   📋 No data available yet  │
│                             │
│   Start by:                 │
│   • Add vitals [+]          │
│   • Upload results [+]      │
│   • Schedule checkup [+]    │
└─────────────────────────────┘
```

### Real-time Updates

```
// For live data (vitals)
┌─────────────────────────────┐
│ Heart Rate: 78 bpm          │
│ Last: 2 min ago ⟳ Refreshing│
│                             │
│ (Auto-refresh every 60sec)  │
└─────────────────────────────┘
```

---

## Performance Considerations

### Data Loading Strategy

```
// Immediate Display (No loading state)
- User name, profile picture
- Last known vital signs
- Upcoming appointments (cached)

// Background Load (Loading state ok)
- Real-time vitals
- Lab results
- Detailed health history

// Lazy Load (On click)
- Detailed patient records
- Historical charts
- Medication history
```

### Rendering Optimization

```javascript
// Don't render 100 data points initially
// Paginate or virtualize:

// Page 1: Latest 10 results
// [Load More] → Page 2: Results 11-20
// [Load More] → Page 3: Results 21-30

// Or use infinite scroll for tables
```

---

## Medical Domain Considerations

### Units of Measurement

```javascript
// Always include units
✓ 120/80 mmHg (not just 120/80)
✓ 98.6°F or 37°C (depending on region)
✓ 145 mg/dL (glucose)
✓ 72.5 kg (weight)
✓ 165 cm (height)
```

### Reference Ranges

```
// Always provide context
Value: 14.2 g/dL
Reference Range: 12-16 g/dL
Status: ✓ Normal

// Users should know if abnormal
Value: 215 mg/dL
Reference Range: <200 mg/dL
Status: ⚠ High
Action: Consult with doctor
```

### Time Zones & Timestamps

```
// Include timezone for international apps
Last reading: Jan 22, 2:15 PM EST
Appointment: Jan 25, 10:00 AM PST

// Show relative time + absolute
Heart Rate: 78 bpm (2 mins ago)
Blood Pressure: 120/80 mmHg (Today at 8:15 AM)
```

### Privacy Considerations

```
// In shared dashboards, hide sensitive info
Doctor sees: Patient name, ID, condition, treatments
Doctor doesn't see: Social security, address, emergency contacts

// Doctor's dashboard
Visible: Medical notes, vitals, treatment plans
Hidden: Billing info, insurance, payment status
```

---

## Motion & Interaction Design

### Micro-interactions

```javascript
// Transition when data updates
// Fade in: 200ms ease-out

// Hover states
Button: Subtle background change
Link: Underline appears
Card: Slight shadow increase

// Loading indicator
// Smooth rotate: 1s linear infinite

// Success feedback
// Flash color: 500ms then fade back
```

### Scroll Behavior

```
// Sticky header
Dashboard title + navigation stay in place
Metrics scroll below

// Smooth scroll
To jump to section:
Scroll to target: 300ms ease-out

// Infinite scroll
Load next page when user scrolls to bottom
```

### Animation Performance

```javascript
// Use transform & opacity (GPU accelerated)
// transform: translateY(-10px)
// opacity: 0.8

// Avoid animating:
// - width/height
// - left/right/top/bottom
// - box-shadow

// Keep frame rate: 60 FPS
// Use will-change for expensive elements
```

---

## Responsive Design Breakpoints

### Mobile (0-640px)
```
- Single column layouts
- Bottom navigation (tab bar)
- Larger touch targets (48px)
- Simplified charts (fewer data points)
- Expandable sections
```

### Tablet (641-1024px)
```
- 2-column grids
- Hamburger menu or side drawer
- Medium touch targets (44px)
- More detailed charts
- Optimized spacing
```

### Desktop (1025px+)
```
- 3-4 column grids
- Full sidebar navigation
- Normal interactive elements
- Comprehensive data visualization
- Advanced features visible
```

---

## Dark Mode Support

### Implementation

```javascript
// Use CSS variables
--color-bg-primary: #ffffff (light)
--color-bg-primary: #1a1a1a (dark)

--color-text-primary: #000000 (light)
--color-text-primary: #ffffff (dark)

// Medical data visibility in dark mode
Abnormal results: Still visible (#ff6b6b)
Charts: Good contrast maintained
Status indicators: Fully visible
```

### Medical Context in Dark Mode

```
// Be cautious: Some clinical settings require light mode
// Health monitoring: Ambient light
// Hospital setting: Bright light (better with light mode)
// Home setting: Dark mode ok

// Consider: Let user choose
Settings → Theme → Light / Dark / System
```

---

## Reference: Dashboard Layout Grid

```
┌──────────────────────────────────────────────┐
│ LOGO  Dashboard     🔔  👤 Name              │  Header
├──────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────┐  │
│ │  SECTION 1: Alerts                      │  │
│ │  [Critical items if any]                │  │
│ └─────────────────────────────────────────┘  │
│                                              │
│ ┌──────────┬──────────┬──────────┐           │
│ │ Metric 1 │ Metric 2 │ Metric 3 │           │  Quick Stats
│ │ (Card)   │ (Card)   │ (Card)   │           │
│ └──────────┴──────────┴──────────┘           │
│                                              │
│ ┌──────────┬──────────────────────┐          │
│ │ Chart    │  Status/Timeline     │          │  Content
│ │ (Time    │  (Key events)        │          │
│ │ series)  │                      │          │
│ └──────────┴──────────────────────┘          │
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │ [View Full Records] [More Actions]       │ │  Footer CTA
│ └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

---

**Next**: See PATIENT_DASHBOARD.md, DOCTOR_DASHBOARD.md, ADMIN_DASHBOARD.md for specific implementations.
