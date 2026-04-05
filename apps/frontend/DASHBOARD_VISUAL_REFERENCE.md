# Dashboard Wireframe & UI Reference Guide

## Visual Guide to Dashboard Layouts

### Patient Dashboard - Detailed Wireframe

```
┌─────────────────────────────────────────────────────────────────────────┐
│ HEADER (Height: 80px, Background: White, Border: 1px gray)             │
│                                                                         │
│ ┌────────┐  Welcome, Sarah         [🔔]  [👤] Dr. Sarah               │
│ │ LOGO   │  Patient Portal          6 new messages                      │
│ └────────┘                                    [⚙️] [Logout]             │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ ALERT SECTION (Only if present, 16px margin)                           │
│                                                                         │
│ ┌──────────────────────────────────────────────────────────────────┐   │
│ │ ⚠ WARNING: Blood pressure elevated                              │   │
│ │ Systolic 158 mmHg (Goal: <130)                                  │   │
│ │ [Learn More] [Dismiss]                                          │   │
│ └──────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ VITALS SECTION (Background: Light Gray, Padding: 24px)                 │
│                                                                         │
│  Today's Vitals                          [Last: 2 hours ago] [Refresh] │
│                                                                         │
│  ┌─────────────┬─────────────┬─────────────┬──────────────┐            │
│  │ ❤️ Heart    │ 🩸 Blood    │ 💨 SpO2    │ 🌡️ Temp      │            │
│  │ Rate        │ Pressure    │             │               │            │
│  │             │             │             │               │            │
│  │ 78 bpm      │ 120/80      │ 98%         │ 37.0°C        │            │
│  │ Normal ✓    │ Normal ✓    │ Normal ✓    │ Normal ✓      │            │
│  └─────────────┴─────────────┴─────────────┴──────────────┘            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ KEY METRICS SECTION (3 cards, 24px gap)                                │
│                                                                         │
│ ┌──────────────────────┐  ┌──────────────────────┐  ┌───────────────┐ │
│ │ WEIGHT TREND         │  │ MEDICATIONS          │  │ APPOINTMENTS  │ │
│ │                      │  │                      │  │               │ │
│ │ Current: 72.5 kg     │  │ 3 Active             │  │ Jan 25, 2:00 PM
│ │ Goal: 70 kg          │  │ Adherence: 95% ✓     │  │ Cardiology    │ │
│ │ Status: +2.5 ↑       │  │                      │  │ Dr. Smith     │ │
│ │                      │  │ Next: Metformin      │  │               │ │
│ │ [Sparkline chart]    │  │ Today, 6:00 PM       │  │ Jan 28, 10 AM │ │
│ │ Avg: 72.8 kg         │  │                      │  │ Lab Work      │ │
│ │                      │  │ [View Schedule]      │  │               │ │
│ │ [View Chart]         │  │ [Add Reminder]       │  │ [Schedule New]│ │
│ └──────────────────────┘  └──────────────────────┘  └───────────────┘ │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ RECENT ACTIVITY SECTION                                                │
│                                                                         │
│ Recent Activity                             [View Full Timeline]        │
│                                                                         │
│ ──────────────────────────────────────────────────────────────────     │
│ Jan 22  ✓ Weight recorded: 72.5 kg                                     │
│         Last: 2 days ago                                               │
│                                                                         │
│ Jan 22  ✓ Medication taken: Metformin 500mg                            │
│         Last: 8 hours ago                                              │
│                                                                         │
│ Jan 21  ⚠ Lab results: Glucose 145 mg/dL (Elevated)                   │
│         [View Results]                                                 │
│                                                                         │
│ Jan 21  📝 Doctor's note: Continue exercise routine                     │
│         From: Dr. Sarah Johnson                                        │
│                                                                         │
│ Jan 20  ✓ Blood pressure: 120/80 mmHg                                  │
│         Status: Normal                                                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ QUICK ACTIONS (Bottom section, Button Group)                           │
│                                                                         │
│  ┌───────────────────┐  ┌───────────────────┐  ┌──────────────────┐  │
│  │ 📋 Medical Records│  │ 💊 Add Measurement│  │ 📞 Message Doctor│  │
│  └───────────────────┘  └───────────────────┘  └──────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Doctor Dashboard - Detailed Wireframe

```
┌──────────────────────────────────────────────────────────────────────────┐
│ HEADER (Height: 80px)                                                    │
│                                                                          │
│ ┌────────┐  Dr. Sarah Johnson        [Search: Find patient...] [🔔] [👤]│
│ │ LOGO   │  Cardiology                                                   │
│ └────────┘  5 patients today      [⚙️] [Logout]                         │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│ CRITICAL ALERTS (If present)                                             │
│                                                                          │
│ ┌────────────────────────────────────────────────────────────────────┐  │
│ │ ❌ CRITICAL: David Chen - Glucose: 285 mg/dL                      │  │
│ │ Last measured: 30 mins ago                                        │  │
│ │ [Contact Patient] [View Results] [Dismiss]                       │  │
│ └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│ TODAY'S SCHEDULE (Primary section, ~40% width)                           │
│                                                                          │
│ Today's Schedule                    Progress: 2/5 completed              │
│                                     [Full Schedule] [Add Appointment]    │
│                                                                          │
│ ┌──────────────────────────────────────────────────────────┐            │
│ │ ➤ 10:15 AM - John Doe (52, M)       Status: NEXT         │            │
│ │   Chief Complaint: Hypertension follow-up                │            │
│ │   Room: 203                                              │            │
│ │   Duration: 30 min                                       │            │
│ │                                                          │            │
│ │   [Start Visit] [View Patient] [Reschedule] [Notes]     │            │
│ └──────────────────────────────────────────────────────────┘            │
│                                                                          │
│ ┌──────────────────────────────────────────────────────────┐            │
│ │ ○ 10:45 AM - Sarah Miller (45, F)       Status: UPCOMING│            │
│ │   Chief Complaint: Chest pain                           │            │
│ │   Room: 205                                              │            │
│ │   Duration: 45 min                                       │            │
│ │                                                          │            │
│ │   [View Patient] [Reschedule]                           │            │
│ └──────────────────────────────────────────────────────────┘            │
│                                                                          │
│ ┌──────────────────────────────────────────────────────────┐            │
│ │ ✓ 9:30 AM - Michael Brown (62, M)     Status: COMPLETED│            │
│ │   Chief Complaint: Medication review                    │            │
│ │   Completed: 20 min ago                                 │            │
│ │   Duration: 30 min                                       │            │
│ │                                                          │            │
│ │   [View Notes]                                          │            │
│ └──────────────────────────────────────────────────────────┘            │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│ ALERTS & PENDING (Right section, ~30% width)                            │
│                                                                          │
│ Alerts & Pending Items                                                  │
│                                                                          │
│ ❌ CRITICAL: 1                                                          │
│ • David Chen - Glucose elevated                                         │
│   [Contact] [View Results]                                              │
│                                                                          │
│ ⚠ WARNING: 3                                                            │
│ • 2 abnormal lab results pending                                        │
│ • 3 prescriptions pending approval                                      │
│ • 1 patient message                                                     │
│                                                                          │
│ [Manage All Alerts]                                                     │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│ PATIENT LIST (Below schedule)                                            │
│                                                                          │
│ Your Patients (This Week)     Filter: [All ▼] [Status ▼] [Search]    │
│                                                                          │
│ Patient Name     │ Age │ Gender │ Condition      │ Next Visit           │
│ ─────────────────────────────────────────────────────────────────────   │
│ Sarah Miller     │ 45  │ F      │ Hypertension   │ Jan 25, 2:00 PM      │
│ Michael Brown    │ 62  │ M      │ Diabetes       │ Jan 25, 3:00 PM      │
│ Jennifer Lee  ⚠  │ 38  │ F      │ Migraine       │ Jan 28, 10:00 AM     │
│ David Chen    ❌  │ 71  │ M      │ Cardiology     │ Feb 1, 11:00 AM      │
│ Lisa Anderson    │ 55  │ F      │ Checkup        │ Feb 2, 2:00 PM       │
│                                                                          │
│ [View All 35 Patients] [Add New Patient]                               │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│ CLINICAL METRICS & ACTIONS (Bottom)                                      │
│                                                                          │
│ ┌─────────────┬─────────────┬─────────────┐                            │
│ │ Patients    │ Appts Today │ Avg Wait    │                            │
│ │ 142 total   │ 5 scheduled │ 12 minutes  │                            │
│ └─────────────┴─────────────┴─────────────┘                            │
│                                                                          │
│ ┌────────────────────┐  ┌──────────────────────────────────────────┐   │
│ │ 🔍 Search Patient  │  │ Patient Population (by condition)        │   │
│ │ [Search...]        │  │ Hypertension:  42 (29%) ████████         │   │
│ │                    │  │ Diabetes:      38 (27%) ███████          │   │
│ │ 📋 Patient Mgmt    │  │ Cardiology:    28 (20%) █████            │   │
│ │ 📊 My Reports      │  │ Other:         34 (24%) ██████           │   │
│ │ 💬 Messages        │  └──────────────────────────────────────────┘   │
│ │ ✏️  Clinical Notes │                                              │
│ └────────────────────┘                                              │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### Admin Dashboard - Detailed Wireframe

```
┌──────────────────────────────────────────────────────────────────────────┐
│ HEADER (Height: 80px)                                                    │
│                                                                          │
│ ┌────────┐  Admin Dashboard          System Status: ✓ All Online       │
│ │ LOGO   │  Hospital IT                                        [👤]    │
│ └────────┘  Last: 2 mins ago [Refresh]                    [⚙️] [Logout]│
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│ SYSTEM HEALTH (Real-time status cards)                                  │
│                                                                          │
│ ┌──────────┬──────────┬──────────┬────────────┐                         │
│ │ ✓ API    │ ✓ DB     │ ✓ Kafka  │ ⚠ Disk    │                         │
│ │ Server   │ Server   │ Broker   │ Space      │                         │
│ │ 99.9%    │ 145ms    │ 0 lag    │ 87% used  │                         │
│ │ Online   │ Online   │ Online   │ Warning   │                         │
│ └──────────┴──────────┴──────────┴────────────┘                         │
│                                                                          │
│ [View Detailed Status] [Health Logs]                                    │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│ CRITICAL ALERTS (If any)                                                 │
│                                                                          │
│ ┌────────────────────────────────────────────────────────────────────┐  │
│ │ ⚠ Database Response Time High                                      │  │
│ │ Latency: 1,250ms (Normal: 300ms) | Started: 15 mins ago           │  │
│ │ [Investigate] [Dismiss] [Notify Team]                             │  │
│ └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│ KEY METRICS (2x3 grid)                                                   │
│                                                                          │
│ ┌──────────────┬──────────────┬──────────────┐                         │
│ │ Total Users  │ Active Today │ New This Mo. │                         │
│ │ 2,845        │ 1,243 (43%)  │ 127          │                         │
│ │              │ ↑ 12% vs yd  │ ↑ 8 this wk  │                         │
│ ├──────────────┼──────────────┼──────────────┤                         │
│ │ System       │ Error Rate   │ Data Usage   │                         │
│ │ Uptime: 99.9%│ 0.3%         │ 842 GB (78%) │                         │
│ │ ↓ -0.1%      │ ↓ -0.2%      │ ↑ +23GB wk   │                         │
│ └──────────────┴──────────────┴──────────────┘                         │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│ USER MANAGEMENT & ANALYTICS (Split view)                                   │
│                                                                            │
│ ┌─────────────────────────────────────┐ ┌───────────────────────────────┐ │
│ │ USER MANAGEMENT                     │ │ DAILY ACTIVE USERS            │ │
│ │                                     │ │                               │ │
│ │ [+ Add User] [Bulk Import] [Export] │ │ 1,600 |            ╱╲        │ │
│ │                                     │ │ 1,400 |        ╱╲╱  ╲       │ │
│ │ Filter: [All ▼] Role: [All ▼]      │ │ 1,200 |    ╱╲╱      ╲      │ │
│ │ [Search: ________]                  │ │ 1,000 | ╱╲╱          ╲     │ │
│ │                                     │ │       └─────────────────      │ │
│ │ Name          │ Email  │ Role │ St  │ │ Jan 1  Jan 10  Jan 20 Jan 30│ │
│ │ Sarah Johnson │ sarah@ │Dr    │Act  │ │ Avg: 1,187 users/day       │ │
│ │ John Smith    │ john@  │Admin │Act  │ │ Peak: Jan 20 (1,543)       │ │
│ │ Maria Garcia  │ maria@ │Nurse │Act  │ └───────────────────────────────┘ │
│ │ David Lee     │ david@ │Dr    │Act  │                                   │
│ │ Lisa Chen     │ lisa@  │Pt    │Pend │                                   │
│ │                                     │                                   │
│ │ [Edit] [Deactivate] [Audit Log]    │ [View Performance] [Export]      │
│ │ Showing 5 of 2,845 users [Next ▼]  │                                   │
│ └─────────────────────────────────────┘ └───────────────────────────────┘ │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│ COMPLIANCE & SECURITY (Bottom)                                            │
│                                                                          │
│ ┌──────────────────────────────┐ ┌──────────────────────────────────┐  │
│ │ COMPLIANCE STATUS            │ │ SECURITY STATUS                  │  │
│ │ HIPAA: ✓ 98%                 │ │ Score: 94/100 ⭐⭐⭐⭐☆         │  │
│ │ [██████████░]                │ │                                  │  │
│ │ Last Audit: Jan 15           │ │ Failed Logins (24h): 34          │  │
│ │ Outstanding Items: 2         │ │ MFA Enrollment: 93% (2,651)     │  │
│ │ • Training due: Jan 30       │ │ Password Changes: 127 (week)    │  │
│ │ • Policy review due: Feb 5   │ │                                  │  │
│ │                              │ │ [View Report]                    │  │
│ │ [View Report]                │ │                                  │  │
│ └──────────────────────────────┘ └──────────────────────────────────┘  │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│ QUICK ADMIN ACTIONS (Floating buttons)                                   │
│                                                                          │
│ ┌──────────────┬──────────────┬──────────────────────┐                  │
│ │ 🔨 System    │ 👥 Users     │ 🔐 Security         │                  │
│ │ Maintenance  │ Management   │ Settings            │                  │
│ ├──────────────┼──────────────┼──────────────────────┤                  │
│ │ 📋 Reports   │ 📦 Backup    │ ⚙️ Configuration     │                  │
│ └──────────────┴──────────────┴──────────────────────┘                  │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Color Reference Guide

### Status Colors
```
┌─────────────────┬──────────┬──────────────┬─────────────────────┐
│ Status          │ Hex      │ Visual       │ Medical Meaning     │
├─────────────────┼──────────┼──────────────┼─────────────────────┤
│ Critical        │ #dc2626  │ ███          │ Immediate action    │
│ Warning         │ #f59e0b  │ ███          │ Requires attention  │
│ Caution         │ #eab308  │ ███          │ Monitor closely     │
│ Normal/Healthy  │ #10b981  │ ███          │ Within range        │
│ Info            │ #0284c7  │ ███          │ Information         │
│ Neutral/Gray    │ #6b7280  │ ███          │ Inactive/historical │
└─────────────────┴──────────┴──────────────┴─────────────────────┘
```

### Text Color Hierarchy
```
Primary Text (Metric values):    #1f2937 (Dark Gray) - Bold, 18px
Secondary Text (Labels):          #6b7280 (Medium Gray) - 14px
Tertiary Text (Captions):        #9ca3af (Light Gray) - 12px
Link Text:                        #0284c7 (Blue) - Underlined
Success Text:                     #10b981 (Green)
Error Text:                       #dc2626 (Red)
```

### Background Colors
```
Card Background:                  #ffffff (White)
Alternate Row:                    #f9fafb (Very Light Gray)
Section Background:               #f3f4f6 (Light Gray)
Alert Background (Critical):      #fee2e2 (Light Red)
Alert Background (Warning):       #fef3c7 (Light Yellow)
Alert Background (Success):       #dcfce7 (Light Green)
```

---

## Component Size Reference

### Metric Card (Responsive)
```
Desktop (> 1024px):
  Width: 350px
  Height: 180px
  Padding: 24px
  
Tablet (641-1024px):
  Width: 100%
  Height: 140px
  Padding: 16px
  
Mobile (< 640px):
  Width: 100%
  Height: 120px
  Padding: 12px
```

### Vital Sign Card
```
All screen sizes:
  Width: flex (25% desktop, 50% tablet, 100% mobile)
  Height: 140px
  Padding: 16px
  
Large number: 28px bold
Unit: 14px regular
Status badge: 12px small
```

### Button Sizes
```
Large (Primary action):     48px height, 24px horizontal padding
Medium (Standard):          40px height, 16px horizontal padding
Small (Secondary):          32px height, 12px horizontal padding
Touch target minimum:       44x44px (WCAG AA)
```

---

## Typography Scale

```
H1 (Dashboard Title):      24px, Bold (600)     Line-height: 1.2
H2 (Section Title):        20px, Semibold (600) Line-height: 1.3
H3 (Card Title):          18px, Semibold (600) Line-height: 1.4
Body (Main text):         16px, Regular (400)  Line-height: 1.5
Small (Secondary):        14px, Regular (400)  Line-height: 1.5
Caption (Meta):           12px, Regular (400)  Line-height: 1.4
Metric Value:             28px, Bold (700)     Line-height: 1.0
```

---

## Spacing System

```
Base Unit: 4px

Micro spacing:      4px, 8px
Component padding:  12px, 16px, 24px
Component margin:   16px, 24px, 32px
Section gap:        24px (desktop), 16px (tablet), 12px (mobile)
```

---

## Interactive States

### Button States
```
Default:      Background: #0284c7, Text: White, Cursor: pointer
Hover:        Background: #0369a1, Box-shadow: 0 4px 6px rgba(0,0,0,0.1)
Active:       Background: #0c63e4, Border: 2px inset
Focus:        Outline: 3px solid #0284c7, Outline-offset: 2px
Disabled:     Background: #d1d5db, Cursor: not-allowed, Opacity: 0.6
Loading:      Icon rotates 1s infinite linear
```

### Link States
```
Default:      Color: #0284c7, Underline: none
Hover:        Color: #0369a1, Underline: present
Active:       Color: #0c63e4
Focus:        Outline: 3px solid, Outline-offset: 2px
Visited:      Color: #7c3aed (Purple)
```

### Form Input States
```
Empty:        Border: 1px solid #d1d5db, Background: white
Focus:        Border: 2px solid #0284c7, Box-shadow: 0 0 0 3px rgba(2,132,199,0.1)
Filled:       Background: white, Border: 1px solid #10b981
Error:        Border: 2px solid #dc2626, Background: #fee2e2
Disabled:     Background: #f3f4f6, Border: 1px solid #d1d5db, Cursor: not-allowed
```

---

## Responsive Breakpoints

```
Mobile-first approach:

Mobile (0 - 640px):
  Single column
  Full-width elements
  Bottom navigation
  16px base padding
  
Tablet (641px - 1024px):
  2-column layout
  Side navigation (drawer)
  24px base padding
  
Desktop (1025px - 1440px):
  3-4 column layout
  Fixed sidebar
  24px base padding
  
Large (1441px+):
  4+ column layout
  Fixed sidebar
  32px base padding
  Max width: 1400px
```

---

## Loading States

### Skeleton Loader
```
Background: #e5e7eb (Light gray)
Animation: Pulse (0.5s ease-in-out, infinite)

Widths:
  Full (card title):      100%
  7/8 (description):      87.5%
  3/4 (short text):       75%
  1/2 (quick stats):      50%

Heights:
  Title:      24px
  Text:       16px
  Circle:     48px
```

### Loading Spinner
```
Size:        48px
Animation:   Rotate 1s linear infinite
Stroke:      4px
Color:       #0284c7
Background:  Transparent

Fullscreen overlay:
  Background:   rgba(0, 0, 0, 0.5)
  Z-index:      1000
  Display:      Flex (centered)
```

---

## Error States

### Error Banner
```
Background:   #fee2e2
Border:       1px solid #dc2626
Border-left:  4px solid #dc2626
Padding:      16px
Margin:       16px 0

Icon:         ❌ or ⚠
Text color:   #991b1b
Link color:   #dc2626 (underlined)
```

### Empty State
```
Icon:         Illustration or large icon (64x64)
Title:        16px semibold
Description:  14px regular
Action button: Standard primary button
Padding:      40px (vertical), 20px (horizontal)
```

---

## Shadow System

```
No shadow:       box-shadow: none
Subtle:          box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05)
Small:           box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)
Medium:          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)
Large:           box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)
X-Large:         box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)

Focus ring:      box-shadow: 0 0 0 3px rgba(2,132,199,0.1)
Hover elevation: All shadows increased by 1 level
```

---

## Animation Timings

```
Micro-interactions (subtle):    200ms ease-out
Standard transitions:            300ms ease-in-out
Page transitions:               400ms ease-in-out
Loading indicators:             1000ms linear infinite
Toast notifications:            300ms ease-in (in), 500ms ease-out (out)
Modal fade:                     200ms ease-in-out

Use GPU-accelerated properties:
  - transform (translate, scale, rotate)
  - opacity

Avoid animating:
  - width/height
  - left/right/top/bottom
  - box-shadow
  - border-radius
```

---

**This visual reference guide complements the detailed design documents. Use this for quick lookups during implementation.**
