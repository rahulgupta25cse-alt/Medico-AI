# Admin Dashboard Design

## Overview

**Purpose**: System administration, user management, and organizational analytics
**Primary Users**: System administrators, hospital IT staff, compliance officers
**Goal**: Monitor system health, manage users, track compliance, and optimize operations

---

## Layout Architecture

### Visual Hierarchy

```
┌──────────────────────────────────────────────────────────────┐
│ HEADER                                                       │
│ • Logo & Branding                                            │
│ • Title: "Admin Dashboard"                                   │
│ • System Status: "All Systems Operational ✓"                │
│ • Date/Time with timezone                                    │
│ • Notifications & Alerts (critical only)                     │
│ • Settings & Logout                                          │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ SECTION 1: SYSTEM HEALTH (Real-time Status)                 │
│ ┌──────────┬──────────┬──────────┬──────────┐               │
│ │ API      │ Database │ Kafka    │ Storage  │               │
│ │ Server   │ Server   │ Broker   │ System   │               │
│ │ ✓ Online │ ✓ Online │ ✓ Online │ ✓ 87%    │               │
│ │ 99.9%    │ 145ms    │ No lag   │ used     │               │
│ └──────────┴──────────┴──────────┴──────────┘               │
│                                                              │
│ Last checked: 2 mins ago | [Detailed Status] [Refresh]     │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ SECTION 2: CRITICAL ALERTS (If Any)                         │
│ • System alerts (downtime, errors, quota exceeded)          │
│ • Security alerts (failed logins, access violations)        │
│ • Compliance alerts (audit thresholds, data retention)      │
│ • Only shows critical/warning level items                   │
│                                                              │
│ [Dismiss All] [View Alert History]                          │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ SECTION 3: KEY METRICS (Organization Level)                 │
│                                                              │
│ ┌──────────────┬──────────────┬──────────────┐             │
│ │ Total Users  │ Active Today │ New This Mo  │             │
│ │ 2,845        │ 1,243 (43%)  │ 127          │             │
│ ├──────────────┼──────────────┼──────────────┤             │
│ │ Total Data   │ Uptime       │ Avg Response │             │
│ │ 842 GB       │ 99.9%        │ 234ms        │             │
│ └──────────────┴──────────────┴──────────────┘             │
│                                                              │
│ Device Logins (Last 24h): 3,421 | Error Rate: 0.3%        │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ SECTION 4: USER & ACCESS MANAGEMENT (Left sidebar)         │
│                                                              │
│ 📊 User Analytics                                           │
│   • By Role: [Dropdown]                                     │
│   • By Department: [Dropdown]                               │
│   • Activity Graph (last 7 days)                            │
│                                                              │
│ 👥 User Management                                          │
│   [+ Add User] [Bulk Import] [Export List]                 │
│   • 2,845 Total Users                                       │
│   • 342 Pending Activation                                  │
│   • 23 Flagged for Review                                   │
│                                                              │
│ 🔐 Access Control                                           │
│   [Manage Roles] [Manage Permissions] [View Audit Log]     │
│                                                              │
│ ⚙️ Configuration                                            │
│   [System Settings] [Backup Schedule] [Data Retention]     │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ SECTION 5: DETAILED ANALYTICS (Right main content)         │
│                                                              │
│ [Timeframe: Last 30 Days ▼] [Export Report]                │
│                                                              │
│ 📈 USAGE ANALYTICS                                          │
│ Daily Active Users Chart (time series)                      │
│ ┌──────────────────────────────────────────────┐           │
│ │ 1,600 |            ╱╲                        │           │
│ │ 1,400 |        ╱╲╱  ╲      Peak: Jan 20    │           │
│ │ 1,200 |    ╱╲╱      ╲    (1,543 users)    │           │
│ │ 1,000 | ╱╲╱          ╲                      │           │
│ │       └──────────────────────────────────────┘           │
│ │         Jan 1  Jan 10  Jan 20  Jan 30                   │           │
│ 
│ 📊 API PERFORMANCE                                          │
│ • Avg Response Time: 234ms ↓ (was 280ms)                   │
│ • Error Rate: 0.3% ↓ (was 0.5%)                            │
│ • Requests/min: 1,234 (normal load)                        │
│                                                              │
│ 🔍 AUDIT LOG (Recent)                                       │
│ Jan 22, 14:30 - User "Dr. Sarah" created patient record   │
│ Jan 22, 14:28 - Admin "John Smith" reset password          │
│ Jan 22, 14:15 - System backup completed successfully       │
│ [View Full Audit Log] [Search Events]                      │
│                                                              │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ SECTION 6: COMPLIANCE & SECURITY (Bottom)                   │
│                                                              │
│ Compliance Status: ✓ 98% HIPAA Compliant                   │
│ • Last audit: Jan 15, 2024                                  │
│ • Outstanding items: 2                                      │
│ [View Compliance Report]                                    │
│                                                              │
│ Security Score: 94/100 ⭐                                   │
│ • Failed login attempts (24h): 34                           │
│ • Password changes: 127                                     │
│ • MFA enabled: 2,651 users (93%)                            │
│ [View Security Report]                                      │
│                                                              │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ SECTION 7: QUICK ADMIN ACTIONS (Floating buttons)          │
│ ┌──────────────┬──────────────┬──────────────────────┐     │
│ │ 🔨 System    │ 👥 Users     │ 🔐 Security        │     │
│ │ Maintenance  │ Management   │ Settings           │     │
│ ├──────────────┼──────────────┼──────────────────────┤     │
│ │ 📋 Reports   │ 📦 Backup    │ ⚙️ Configuration   │     │
│ └──────────────┴──────────────┴──────────────────────┘     │
└──────────────────────────────────────────────────────────────┘
```

---

## Component Breakdown

### 1. System Health Monitor

```jsx
// SystemHealthMonitor.jsx
Component: SystemHealthMonitor

Props:
  - services: Array<{
      name: 'API Server' | 'Database' | 'Kafka' | 'Storage' | 'Elasticsearch',
      status: 'online' | 'warning' | 'offline',
      statusPercent: percentage, // 99.9%, 145ms, 87% disk, etc
      lastCheck: timestamp,
      details: string
    }>
  - onRefresh: function
  - autoRefresh: boolean

Display:
  ┌─ SYSTEM STATUS ─────────────────────────────┐
  │ Last checked: 2 mins ago | [Refresh] [Auto] │
  │                                             │
  │ ┌──────────┬──────────┬──────────┬────────┐ │
  │ │ ✓ API    │ ✓ DB     │ ✓ Kafka  │ ⚠ Disk │ │
  │ │ Server   │ Server   │ Broker   │ Space  │ │
  │ │ 99.9%    │ 145ms    │ 0 lag    │ 87%    │ │
  │ │ Online   │ Online   │ Online   │ Used   │ │
  │ └──────────┴──────────┴──────────┴────────┘ │
  │                                             │
  │ [View Detailed Status] [View Health Logs]  │
  └─────────────────────────────────────────────┘

Features:
  - Color-coded status badges
  - Key metric per service
  - Last check timestamp
  - Drill-down to details
  - Auto-refresh capability
  - Historical trends available
```

### 2. Critical Alerts Section

```jsx
// AdminAlerts.jsx
Component: AdminAlerts

Props:
  - alerts: Array<{
      id,
      type: 'system' | 'security' | 'compliance' | 'performance',
      severity: 'critical' | 'warning' | 'info',
      title,
      description,
      affectedService: string,
      timestamp,
      action: { label, onClick }
    }>
  - onDismiss: (alertId) => void

Display:
  ┌─ CRITICAL ALERTS ──────────────────────────┐
  │                                            │
  │ ❌ Database Response Time High             │
  │ Database server latency: 1,250ms           │
  │ Normal: < 300ms | Threshold: > 1,000ms   │
  │ Started: 15 mins ago                      │
  │ [Investigate] [Dismiss] [Notify Team]    │
  │                                            │
  │ ⚠ High Failed Login Attempts              │
  │ 156 failed attempts in last 2 hours       │
  │ From IPs: 192.168.1.x, 10.x.x.x          │
  │ [Review IPs] [Block IPs] [Dismiss]       │
  │                                            │
  │ [View Alert History]                      │
  └────────────────────────────────────────────┘

Features:
  - Severity grouping
  - Context information
  - Actionable buttons
  - Dismissible with reason
  - Time-based display
```

### 3. Key Metrics Cards

```jsx
// AdminMetrics.jsx
Component: AdminMetrics

Props:
  - metrics: {
      totalUsers: number,
      activeToday: { count, percentage },
      newThisMonth: number,
      totalData: { value, unit },
      uptime: percentage,
      avgResponseTime: milliseconds,
      errorRate: percentage,
      failedLogins24h: number
    }

Display:
  ┌─ ORGANIZATION METRICS ──────────────────────┐
  │                                             │
  │ ┌──────────────┬──────────────────────────┐ │
  │ │ Total Users  │ Active Today             │ │
  │ │ 2,845        │ 1,243 users (43%)        │ │
  │ │              │ ↑ 12% vs yesterday       │ │
  │ ├──────────────┼──────────────────────────┤ │
  │ │ New Users    │ Data Usage               │ │
  │ │ 127 this mo  │ 842 GB (78% quota)       │ │
  │ │ ↑ 8 this wk  │ ↑ +23GB this week        │ │
  │ ├──────────────┼──────────────────────────┤ │
  │ │ System       │ Error Rate               │ │
  │ │ Uptime: 99.9%│ 0.3% (target: <0.5%)    │ │
  │ │ ↓ -0.1% mo   │ ↓ -0.2% vs last month   │ │
  │ └──────────────┴──────────────────────────┘ │
  │                                             │
  │ [View Detailed Analytics] [Export Report]   │
  └─────────────────────────────────────────────┘

Features:
  - Large, readable numbers
  - Trend indicators (↑ ↓)
  - Comparison to previous period
  - Quick drill-down links
```

### 4. User Management Panel

```jsx
// UserManagement.jsx
Component: UserManagement

Props:
  - users: Array<{
      id,
      firstName,
      lastName,
      email,
      role,
      department,
      status: 'active' | 'inactive' | 'pending' | 'suspended',
      lastLogin: datetime,
      mfaEnabled: boolean
    }>
  - onAddUser: function
  - onEditUser: (userId) => void
  - onDeactivateUser: (userId) => void
  - onViewAudit: (userId) => void

Display:
  ┌─ USER MANAGEMENT ───────────────────────────────────────┐
  │ [+ Add User] [Bulk Import] [Export List]               │
  │                                                        │
  │ Status Filter: [All ▼] | Role: [All ▼] | Search: [__]│
  │                                                        │
  │ Name             │Email          │Role        │Status │
  ├──────────────────────────────────────────────────────┤
  │Sarah Johnson     │sarah@hosp.com │Doctor      │Active │
  │John Smith       │john@hosp.com  │Admin       │Active │
  │Maria Garcia     │maria@hosp.com │Nurse       │Active │
  │David Lee        │david@hosp.com │Doctor      │Active │
  │Lisa Chen        │lisa@hosp.com  │Patient     │Pend.  │
  │                                                        │
  │ [Edit] [Deactivate] [Audit Log]                      │
  │ Showing 5 of 2,845 users  [Next ▼]                   │
  └────────────────────────────────────────────────────────┘

Features:
  - Comprehensive user list
  - Filter/search capabilities
  - Status indicators
  - Bulk actions
  - Audit trail links
  - Pagination
```

### 5. Analytics Dashboard

```jsx
// AnalyticsDashboard.jsx
Component: AnalyticsDashboard

Props:
  - timeframe: 'today' | 'week' | 'month' | 'year'
  - analyticsData: {
      dailyActiveUsers: [{ date, count }],
      apiPerformance: {
        avgResponseTime: milliseconds,
        errorRate: percentage,
        requestsPerMinute: number
      },
      userActivity: [{ action, count }],
      auditLog: [{ timestamp, user, action, resource }]
    }

Display 1: Daily Active Users
  ┌─ DAILY ACTIVE USERS (Last 30 Days) ─┐
  │ 1,600 |            ╱╲               │
  │ 1,400 |        ╱╲╱  ╲      Peak: Jan│
  │ 1,200 |    ╱╲╱      ╲    20 (1,543)│
  │ 1,000 | ╱╲╱          ╲              │
  │       └────────────────────────────┘│
  │         Jan 1   Jan 10 Jan 20 Jan 30│
  │                                     │
  │ Avg: 1,187 users/day                │
  │ Peak: Jan 20 (1,543 users)          │
  │ Low: Jan 1 (856 users)              │
  └─────────────────────────────────────┘

Display 2: API Performance
  ┌─ API PERFORMANCE ──────────────────┐
  │ Avg Response Time: 234ms ↓         │
  │ ├──────────────────────→│          │
  │                                    │
  │ Error Rate: 0.3% ✓                 │
  │ ├─→ (Target: <0.5%)               │
  │                                    │
  │ Requests/min: 1,234                │
  │ Peak: 2,156 (Jan 20, 2:00 PM)    │
  │                                    │
  │ [View Performance History]         │
  └────────────────────────────────────┘

Display 3: Audit Log
  ┌─ RECENT AUDIT LOG ────────────────┐
  │ Jan 22, 14:30 | Sarah Johnson     │
  │ Created patient record ID: 12345  │
  │                                   │
  │ Jan 22, 14:28 | John Smith       │
  │ Reset password for user: Lisa    │
  │                                   │
  │ Jan 22, 14:15 | System           │
  │ Automated backup completed        │
  │                                   │
  │ [View Full Audit Log]             │
  └───────────────────────────────────┘

Features:
  - Time series charts
  - Trend indicators
  - Peak/low highlights
  - Detailed audit entries
  - Search and filter capability
  - Export options
```

### 6. Compliance & Security Dashboard

```jsx
// ComplianceSecurity.jsx
Component: ComplianceSecurity

Props:
  - compliance: {
      overallScore: percentage, // 98% HIPAA
      lastAuditDate: date,
      outstandingItems: number,
      requiredActions: [{ item, deadline, priority }]
    }
  - security: {
      securityScore: number, // 94/100
      failedLoginAttempts24h: number,
      passwordChanges24h: number,
      mfaEnrollment: percentage,
      suspiciousActivities: [{ description, severity, action }]
    }

Display:
  ┌─ COMPLIANCE STATUS ────────────────────┐
  │ HIPAA Compliance: ✓ 98%                │
  │ █████████░ (last audit: Jan 15)        │
  │                                        │
  │ Outstanding Items: 2                   │
  │ 1. Employee training (due: Jan 30)    │
  │ 2. Privacy policy review (due: Feb 5) │
  │                                        │
  │ [View Compliance Report] [Compliance] │
  └────────────────────────────────────────┘

  ┌─ SECURITY STATUS ──────────────────────┐
  │ Security Score: 94/100 ⭐⭐⭐⭐☆       │
  │                                        │
  │ Failed Logins (24h): 34                │
  │ Top IPs: 192.168.1.x (12 attempts)   │
  │                                        │
  │ MFA Enrollment: 93% (2,651 users)    │
  │ Password Changes: 127 (this week)     │
  │                                        │
  │ [View Security Report] [View IPs]     │
  └────────────────────────────────────────┘

Features:
  - Compliance percentage + trend
  - Outstanding items list
  - Security score (numeric)
  - MFA enrollment tracking
  - Failed login analysis
  - Drill-down reports
```

### 7. Quick Admin Actions

```jsx
// AdminActionsBar.jsx

Primary Actions (Floating buttons):
  1. 🔨 System Maintenance
     → Restart services, run migrations, clear cache
     → Requires confirmation
  
  2. 👥 User Management
     → Add/remove users, manage roles, reset passwords
     → Audit trail of all changes
  
  3. 🔐 Security Settings
     → Configure MFA, IP whitelisting, session management
     → Security audit log
  
  4. 📋 Generate Reports
     → Compliance reports, usage analytics, security reports
     → Email distribution option
  
  5. 📦 Backup & Restore
     → Manual backups, restore points, disaster recovery
     → Schedule automated backups
  
  6. ⚙️ System Configuration
     → API settings, retention policies, notification rules
     → Change log for audit
```

---

## Data Requirements

### Admin Dashboard Data Model

```javascript
// Required data from backend
{
  // System Status
  systemStatus: {
    apiServer: {
      status: "online" | "warning" | "offline",
      uptime: percentage,
      responseTime: milliseconds,
      activeConnections: number,
      lastCheck: timestamp
    },
    database: {
      status: "online" | "warning" | "offline",
      connectionPoolUsage: percentage,
      queryTime: milliseconds,
      diskUsage: { used: bytes, total: bytes },
      backupStatus: "success" | "failed" | "pending",
      lastBackup: timestamp
    },
    messageBroker: {
      status: "online" | "warning" | "offline",
      queueDepth: number,
      messageLatency: milliseconds,
      errorRate: percentage
    },
    storage: {
      status: "online" | "warning" | "offline",
      usagePercent: percentage,
      usedSpace: bytes,
      totalSpace: bytes,
      replicationStatus: "healthy" | "degraded"
    },
    lastCheck: timestamp
  },

  // System Alerts
  alerts: [
    {
      id: UUID,
      type: "system" | "security" | "compliance" | "performance",
      severity: "critical" | "warning" | "info",
      title: string,
      description: string,
      affectedService: string,
      suggestedAction: string,
      timestamp: datetime,
      resolved: boolean
    }
  ],

  // Organization Metrics
  metrics: {
    totalUsers: number,
    activeUsersToday: number,
    activeUsersThisWeek: number,
    newUsersThisMonth: number,
    usersByRole: { role: string, count: number }[],
    usersByDepartment: { department: string, count: number }[],
    totalDataUsage: bytes,
    dataUsagePercent: percentage,
    systemUptime: percentage,
    averageResponseTime: milliseconds,
    errorRate: percentage,
    failedLoginAttempts24h: number
  },

  // Users List
  users: [
    {
      id: UUID,
      firstName: string,
      lastName: string,
      email: string,
      role: "ADMIN" | "DOCTOR" | "NURSE" | "PATIENT" | "LAB_TECH",
      department: string,
      status: "active" | "inactive" | "pending_activation" | "suspended",
      mfaEnabled: boolean,
      lastLogin: datetime,
      createdAt: datetime,
      suspendedReason?: string
    }
  ],

  // Analytics Data
  analytics: {
    dailyActiveUsers: [
      {
        date: date,
        count: number,
        newUsers: number,
        inactiveUsers: number
      }
    ],
    apiPerformance: {
      avgResponseTime: milliseconds,
      p95ResponseTime: milliseconds,
      p99ResponseTime: milliseconds,
      errorRate: percentage,
      requestsPerMinute: number,
      peakRequestsPerMinute: number,
      byEndpoint: [
        {
          endpoint: string,
          avgTime: milliseconds,
          errorCount: number,
          requestCount: number
        }
      ]
    },
    userActivity: [
      {
        action: "login" | "logout" | "create" | "read" | "update" | "delete",
        count: number,
        percentage: number
      }
    ]
  },

  // Audit Log
  auditLog: [
    {
      id: UUID,
      timestamp: datetime,
      userId: UUID,
      userName: string,
      action: string,
      resourceType: string,
      resourceId: UUID,
      changes: {
        field: string,
        oldValue: string,
        newValue: string
      }[],
      ipAddress: string,
      userAgent: string,
      status: "success" | "failure"
    }
  ],

  // Compliance Data
  compliance: {
    overallScore: percentage, // 98% HIPAA
    standards: [
      {
        name: "HIPAA",
        score: percentage,
        lastAuditDate: date,
        nextAuditDate: date
      }
    ],
    outstandingItems: [
      {
        id: UUID,
        title: string,
        description: string,
        deadline: date,
        priority: "high" | "medium" | "low",
        assignee: string,
        status: "open" | "in-progress" | "completed"
      }
    ]
  },

  // Security Data
  security: {
    securityScore: number, // 94/100
    mfaEnrollment: percentage,
    failedLoginAttempts24h: number,
    suspiciousActivities: [
      {
        id: UUID,
        description: string,
        severity: "critical" | "warning" | "info",
        action: string, // "block_ip", "notify_user", etc
        timestamp: datetime
      }
    ],
    passwordChanges24h: number,
    lastSecurityAudit: date
  }
}
```

### API Endpoints for Admin Dashboard

```javascript
// Admin Dashboard Load
GET /api/admin/dashboard
  → Returns: System status, metrics, alerts, analytics summary
  → Cache: 1 minute
  → Refresh: Real-time for critical status

// System Status (Real-time)
GET /api/admin/system/status
  → Returns: Current status of all services
  → Cache: 30 seconds
  → WebSocket: For live updates

// Users Management
GET /api/admin/users?limit=50&offset=0&role=&department=&status=
  → Returns: Paginated user list
  → Cache: 5 minutes

POST /api/admin/users
  → Creates new user
  → Body: { firstName, lastName, email, role, department }

PUT /api/admin/users/:userId
  → Updates user
  → Body: { status, role, department, mfaRequired }

DELETE /api/admin/users/:userId
  → Soft delete user (sets inactive)

// Analytics
GET /api/admin/analytics/daily-active-users?days=30
  → Returns: Time series of daily active users

GET /api/admin/analytics/api-performance?days=30
  → Returns: API performance metrics over time

// Audit Log
GET /api/admin/audit-log?limit=100&offset=0&userId=&action=
  → Returns: Paginated audit log entries

// Compliance
GET /api/admin/compliance/status
  → Returns: Compliance score and outstanding items

GET /api/admin/security/status
  → Returns: Security score and metrics

// System Maintenance
POST /api/admin/system/backup
  → Triggers manual backup

POST /api/admin/system/maintenance
  → Body: { action: "restart" | "clear_cache" | "run_migration" }
  → Requires admin confirmation (two-factor auth)
```

---

## Data Visualization

### 1. System Health Status Grid

```
┌────────────────────────────────────────┐
│ SERVICE HEALTH                         │
│                                        │
│ API Server                 Response: ✓ │
│ [████████░] 99.9% uptime   245ms      │
│                                        │
│ PostgreSQL Database        Response: ✓ │
│ [██████████] 100% uptime   145ms      │
│                                        │
│ Kafka Broker               Queue: ✓   │
│ [█████████░] 95% healthy   0 lag      │
│                                        │
│ Storage System             Usage: ⚠   │
│ [█████████░] 87% disk used  142 GB   │
│                                        │
│ Last refreshed: 2 mins ago [Refresh]  │
└────────────────────────────────────────┘
```

### 2. User Activity Heatmap

```
User Activity by Hour (Last 7 Days)
Mon  Tue  Wed  Thu  Fri  Sat  Sun
╔═════════════════════════════════╗
║ 6am  ░░░ ░░░ ░░░ ░░░ ░░░ ░░░ ░░░ ║
║ 12pm ███ ███ ███ ███ ███ ░░░ ░░░ ║
║ 6pm  ██░ ██░ ██░ ██░ ██░ ░░░ ░░░ ║
║ 12am ░░░ ░░░ ░░░ ░░░ ░░░ ░░░ ░░░ ║
╚═════════════════════════════════╝
Legend: ░ Low  ▒ Medium  █ High
```

### 3. Error Rate Trend

```
API Error Rate (Last 30 Days)
1.0% |              ╱╲
0.8% |          ╱╲╱  ╲
0.6% | ╱──────╱      ╲──
0.4% |/               \__
0.2% |                   
0.0% |_____________________
     Jan 1  Jan 10 Jan 20 Jan 30
     
Target: <0.5% ✓
Current: 0.3% ✓
Trend: ↓ Improving
```

---

## Accessibility Features

### Screen Reader Optimization

```html
<!-- System Status Grid -->
<div role="region" aria-label="System health status">
  <div aria-label="API Server online, 99.9% uptime, response time 245ms">
    <span aria-hidden="true">✓</span> API Server
  </div>
  <div aria-label="PostgreSQL database online, 100% uptime">
    <span aria-hidden="true">✓</span> Database
  </div>
</div>

<!-- Alert -->
<div role="alert" aria-live="assertive" aria-label="Critical alert">
  Database response time high: 1,250ms (normal: 300ms)
  <button aria-label="Investigate this alert">Investigate</button>
</div>

<!-- Metrics -->
<div aria-label="Key metrics: 2,845 total users, 1,243 active today (43%)">
  Total Users: 2,845
  Active Today: 1,243 (43%)
</div>
```

### Keyboard Navigation

```
Tab Order:
1. System health cards
2. Alert items
3. Action buttons
4. User management links
5. Analytics section
6. Report links
7. Settings/logout
```

---

## Responsive Design

### Mobile Layout (0-640px)

```
┌──────────────────────────────┐
│ Admin Dashboard         👤   │
├──────────────────────────────┤
│ System: ✓ All Online         │
│                              │
├──────────────────────────────┤
│ Key Metrics (Stacked)        │
│ Total Users: 2,845           │
│ Active Today: 1,243 (43%)    │
│ Uptime: 99.9%                │
│ Data Usage: 842 GB (78%)     │
│                              │
├──────────────────────────────┤
│ Alerts: 1 Critical           │
│ ⚠ Database latency high      │
│                              │
├──────────────────────────────┤
│ Users (Top 5)                │
│ Sarah Johnson - Doctor       │
│ John Smith - Admin           │
│                              │
├──────────────────────────────┤
│ [Manage Users]               │
│ [View Analytics]             │
│ [Security]                   │
└──────────────────────────────┘
```

### Tablet Layout (641-1024px)

```
┌─────────────────────────────────────────────┐
│ Admin Dashboard          System: ✓  👤      │
├─────────────────────────────────────────────┤
│ METRICS (2x2 Grid)                         │
│ ┌──────────────┬──────────────┐           │
│ │ Total Users  │ Active Today │           │
│ │ 2,845        │ 1,243 (43%)  │           │
│ ├──────────────┼──────────────┤           │
│ │ Data Usage   │ Uptime       │           │
│ │ 842 GB (78%) │ 99.9%        │           │
│ └──────────────┴──────────────┘           │
│                                            │
│ ALERTS (1 Critical)                       │
│ [Database latency] [Dismiss] [Investigate]│
│                                            │
│ USER MANAGEMENT          │ ANALYTICS      │
│ Add user / Search        │ Activity chart │
│ [Top 10 Users]           │ Performance    │
│                                            │
│ [Manage All] [Settings]                   │
└─────────────────────────────────────────────┘
```

### Desktop Layout (1025px+)

Full layout as shown in Visual Hierarchy section above.

---

## Real-time Features

### Live System Status

```
System Status: Monitoring
Last update: 2 mins ago ⟳ Auto-refreshing every 30 secs

If alert triggered:
┌─────────────────────────────────┐
│ ⚠ ALERT: Database latency spike│
│ Response time: 1,250ms (↑350%) │
│ Started: 2 mins ago             │
│ [Investigate] [Notify Team]    │
└─────────────────────────────────┘
```

### Audit Log Updates

```
New event in audit log:
Jan 22, 14:35 | Sarah Johnson
Edited patient record ID: 12345
[View Details]
```

---

## Component Checklist

```
✅ SystemHealthMonitor
   - Service status cards, health metrics, auto-refresh

✅ AdminAlerts
   - Alert display, severity grouping, actions

✅ AdminMetrics
   - Key metrics cards, trend indicators

✅ UserManagement
   - User list, filters, add/edit/deactivate functions

✅ AnalyticsDashboard
   - Charts, trend analysis, audit log

✅ ComplianceSecurity
   - Compliance score, security metrics, failed logins

✅ AdminActionsBar
   - Quick action buttons for maintenance, users, security

✅ AuditLog
   - Detailed event log with search/filter

✅ ReportGenerator
   - Create compliance & usage reports

✅ BackupManager
   - Manual backup trigger, restore points
```

---

## Success Metrics

### System Reliability

- [ ] Dashboard loads in < 2 seconds
- [ ] System status updates every 30 seconds
- [ ] Alerts displayed within 1 minute of event
- [ ] No alert delays > 5 minutes

### Operational Efficiency

- [ ] Admin can add user in < 2 minutes
- [ ] Search finds user in < 1 second
- [ ] Reports generated in < 5 minutes
- [ ] Audit log searchable with < 2 second results

### Compliance & Security

- [ ] 100% audit trail coverage
- [ ] All admin actions logged
- [ ] Compliance score maintained > 95%
- [ ] Security alerts responded to < 1 hour

---

## Next Steps

1. Create React components in src/components/dashboard/admin/
2. Integrate real-time WebSocket for system status
3. Build user management table with CRUD
4. Implement analytics charts (Chart.js/Recharts)
5. Add audit log search and export
6. Build compliance report generator
7. Add system maintenance features
8. Implement backup/restore UI
9. Set up email notifications for alerts
10. Add role-based dashboard access
