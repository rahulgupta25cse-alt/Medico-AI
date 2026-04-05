import React, { useEffect, useState } from 'react'
import { Heart, Activity, Droplets, Wind, TrendingUp, AlertCircle } from 'lucide-react'
import './HealthDashboardCards.css'

const HealthDashboardCards = () => {
    const [vitalSigns, setVitalSigns] = useState({
        heartRate: 72,
        bloodPressure: '120/80',
        oxygenLevel: 98,
        temperature: 98.6,
        steps: 5234,
        lastUpdated: new Date()
    })

    // Simulate real-time vital updates
    useEffect(() => {
        const interval = setInterval(() => {
            setVitalSigns(prev => ({
                ...prev,
                heartRate: Math.max(60, Math.min(100, prev.heartRate + Math.random() * 4 - 2)),
                oxygenLevel: Math.max(94, Math.min(100, prev.oxygenLevel + Math.random() * 1 - 0.5)),
                lastUpdated: new Date()
            }))
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    const getHealthStatus = (metric, value) => {
        switch (metric) {
            case 'heartRate':
                if (value < 60) return { status: 'Low', color: 'warning' }
                if (value > 100) return { status: 'Elevated', color: 'alert' }
                return { status: 'Normal', color: 'good' }
            case 'oxygenLevel':
                if (value < 94) return { status: 'Low', color: 'alert' }
                return { status: 'Good', color: 'good' }
            default:
                return { status: 'Normal', color: 'good' }
        }
    }

    const HealthCard = ({ title, value, unit, icon: Icon, metric }) => {
        const status = metric ? getHealthStatus(metric, value) : null

        return (
            <div className={`health-card ${status?.color || 'normal'}`}>
                <div className="card-header">
                    <div className="icon-wrapper">
                        <Icon size={24} />
                    </div>
                    <h3>{title}</h3>
                </div>

                <div className="card-content">
                    <div className="value-display">
                        <span className="value">{typeof value === 'number' ? value.toFixed(0) : value}</span>
                        <span className="unit">{unit}</span>
                    </div>

                    {status && (
                        <div className={`status-badge ${status.color}`}>
                            {status.status}
                        </div>
                    )}
                </div>

                <div className="card-footer">
                    <small>Last updated: {vitalSigns.lastUpdated.toLocaleTimeString()}</small>
                </div>
            </div>
        )
    }

    return (
        <div className="health-dashboard-cards">
            <div className="cards-header">
                <h2>Your Health Status</h2>
                <p>Real-time monitoring of your vital signs</p>
            </div>

            <div className="cards-grid">
                <HealthCard
                    title="Heart Rate"
                    value={vitalSigns.heartRate}
                    unit="bpm"
                    icon={Heart}
                    metric="heartRate"
                />
                <HealthCard
                    title="Blood Pressure"
                    value={vitalSigns.bloodPressure}
                    unit="mmHg"
                    icon={Activity}
                />
                <HealthCard
                    title="Oxygen Level"
                    value={vitalSigns.oxygenLevel}
                    unit="%"
                    icon={Droplets}
                    metric="oxygenLevel"
                />
                <HealthCard
                    title="Temperature"
                    value={vitalSigns.temperature}
                    unit="°F"
                    icon={Wind}
                />
                <HealthCard
                    title="Steps"
                    value={vitalSigns.steps}
                    unit="steps"
                    icon={TrendingUp}
                />
                <div className="health-card info-card">
                    <div className="card-header">
                        <div className="icon-wrapper alert">
                            <AlertCircle size={24} />
                        </div>
                        <h3>Quick Alert</h3>
                    </div>
                    <div className="card-content">
                        <p>All vital signs are within normal range. You're doing great!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HealthDashboardCards
