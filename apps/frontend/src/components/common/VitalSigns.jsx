import React, { useState, useEffect } from 'react'
import { Activity, Heart, Droplets, Wind, TrendingUp, TrendingDown } from 'lucide-react'

const VitalSigns = ({ size = 'default' }) => {
    const [vitals, setVitals] = useState({
        heartRate: 72,
        bloodPressure: '120/80',
        oxygenLevel: 98,
        temperature: '98.6°F',
        respiratoryRate: 16
    })

    const [trends, setTrends] = useState({
        heartRate: 'stable',
        bloodPressure: 'stable',
        oxygenLevel: 'stable',
        temperature: 'stable'
    })

    // Simulate live vital sign updates
    useEffect(() => {
        const interval = setInterval(() => {
            setVitals(prev => ({
                ...prev,
                heartRate: prev.heartRate + Math.floor(Math.random() * 6 - 3),
                oxygenLevel: Math.max(94, Math.min(100, prev.oxygenLevel + Math.random() * 2 - 1))
            }))
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    const getStatusColor = (metric, value) => {
        switch (metric) {
            case 'heartRate':
                if (value < 60) return 'from-blue-500 to-cyan-500'
                if (value > 100) return 'from-orange-500 to-red-500'
                return 'from-green-500 to-emerald-500'
            case 'oxygenLevel':
                if (value < 94) return 'from-red-500 to-orange-500'
                return 'from-emerald-500 to-green-500'
            case 'temperature':
                return 'from-amber-500 to-orange-500'
            default:
                return 'from-cyan-500 to-blue-500'
        }
    }

    const getStatusText = (metric, value) => {
        switch (metric) {
            case 'heartRate':
                if (value < 60) return 'Low'
                if (value > 100) return 'Elevated'
                return 'Normal'
            case 'oxygenLevel':
                if (value < 94) return 'Low'
                return 'Good'
            case 'temperature':
                if (value > 99) return 'Elevated'
                return 'Normal'
            default:
                return 'Normal'
        }
    }

    if (size === 'compact') {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="glass-effect border border-white/10 rounded-xl p-4 text-center">
                    <Heart className="w-4 h-4 text-red-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-400">Heart Rate</p>
                    <p className="font-bold text-white">{vitals.heartRate}</p>
                    <p className="text-xs text-gray-500">bpm</p>
                </div>
                <div className="glass-effect border border-white/10 rounded-xl p-4 text-center">
                    <Droplets className="w-4 h-4 text-blue-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-400">Oxygen</p>
                    <p className="font-bold text-white">{vitals.oxygenLevel.toFixed(0)}%</p>
                </div>
                <div className="glass-effect border border-white/10 rounded-xl p-4 text-center">
                    <Wind className="w-4 h-4 text-amber-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-400">Temp</p>
                    <p className="font-bold text-white">{vitals.temperature}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {/* Heart Rate */}
            <div className={`glass-effect border border-white/10 rounded-xl p-6 bg-gradient-to-br ${getStatusColor('heartRate', vitals.heartRate)}/10`}>
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <Heart className="w-6 h-6 text-red-400" />
                        <div>
                            <p className="text-sm text-gray-400">Heart Rate</p>
                            <p className="text-2xl font-bold text-white">{vitals.heartRate} bpm</p>
                        </div>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor('heartRate', vitals.heartRate)} text-white`}>
                        {getStatusText('heartRate', vitals.heartRate)}
                    </span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-500 to-red-400" style={{ width: `${(vitals.heartRate / 120) * 100}%` }}></div>
                </div>
            </div>

            {/* Blood Pressure */}
            <div className={`glass-effect border border-white/10 rounded-xl p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5`}>
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <p className="text-sm text-gray-400">Blood Pressure</p>
                        <p className="text-2xl font-bold text-white font-mono">{vitals.bloodPressure}</p>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/40 to-green-500/30 text-emerald-300">
                        Normal
                    </span>
                </div>
            </div>

            {/* Oxygen Level */}
            <div className={`glass-effect border border-white/10 rounded-xl p-6 bg-gradient-to-br ${getStatusColor('oxygenLevel', vitals.oxygenLevel)}/10`}>
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <Droplets className="w-6 h-6 text-blue-400" />
                        <div>
                            <p className="text-sm text-gray-400">Oxygen Level</p>
                            <p className="text-2xl font-bold text-white">{vitals.oxygenLevel.toFixed(1)}%</p>
                        </div>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor('oxygenLevel', vitals.oxygenLevel)} text-white`}>
                        {getStatusText('oxygenLevel', vitals.oxygenLevel)}
                    </span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400" style={{ width: `${vitals.oxygenLevel}%` }}></div>
                </div>
            </div>

            {/* Temperature */}
            <div className={`glass-effect border border-white/10 rounded-xl p-6 bg-gradient-to-br from-amber-500/10 to-orange-600/5`}>
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <p className="text-sm text-gray-400">Temperature</p>
                        <p className="text-2xl font-bold text-white">{vitals.temperature}</p>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/40 to-orange-500/30 text-amber-300">
                        Normal
                    </span>
                </div>
            </div>
        </div>
    )
}

export default VitalSigns
