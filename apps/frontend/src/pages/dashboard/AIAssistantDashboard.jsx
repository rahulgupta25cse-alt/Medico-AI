import React, { useState, useEffect, useRef } from 'react'
import {
    MessageCircle, Stethoscope, Pill, AlertTriangle, 
    Heart, Activity, TrendingUp, Send, Paperclip, 
    Phone, Zap, Calendar, Clock, MapPin, User,
    ChevronRight, ArrowRight, Sparkles, Shield
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import './AIAssistantDashboard.css'

const AIAssistantDashboard = () => {
    const { user } = useAuth()
    const [activeTab, setActiveTab] = useState('chat')
    const [chatMessages, setChatMessages] = useState([
        {
            id: 1,
            type: 'bot',
            message: 'Hello! I\'m your AI Medical Assistant. How can I help you today?',
            timestamp: new Date()
        }
    ])
    const [chatInput, setChatInput] = useState('')
    const [symptoms, setSymptoms] = useState('')
    const [selectedSymptoms, setSelectedSymptoms] = useState([])
    const [recommendations, setRecommendations] = useState([])
    const [loading, setLoading] = useState(false)
    const chatEndRef = useRef(null)

    const commonSymptoms = [
        'Headache', 'Fever', 'Cough', 'Sore Throat',
        'Fatigue', 'Nausea', 'Body Ache', 'Dizziness'
    ]

    const medicineRecommendations = [
        {
            id: 1,
            name: 'Ibuprofen',
            dosage: '400mg',
            frequency: 'Every 6 hours',
            condition: 'Pain & Fever',
            rating: 4.8,
            reviews: 2341
        },
        {
            id: 2,
            name: 'Amoxicillin',
            dosage: '500mg',
            frequency: 'Twice daily',
            condition: 'Bacterial Infection',
            rating: 4.7,
            reviews: 1842
        },
        {
            id: 3,
            name: 'Omeprazole',
            dosage: '20mg',
            frequency: 'Once daily',
            condition: 'Acid Reflux',
            rating: 4.6,
            reviews: 1523
        },
        {
            id: 4,
            name: 'Cetirizine',
            dosage: '10mg',
            frequency: 'Once daily',
            condition: 'Allergies',
            rating: 4.5,
            reviews: 1205
        }
    ]

    const healthReports = [
        {
            id: 1,
            title: 'Blood Pressure',
            value: '120/80',
            status: 'Normal',
            icon: Heart,
            color: 'emerald'
        },
        {
            id: 2,
            title: 'Heart Rate',
            value: '72 bpm',
            status: 'Healthy',
            icon: Activity,
            color: 'cyan'
        },
        {
            id: 3,
            title: 'Glucose Level',
            value: '95 mg/dL',
            status: 'Normal',
            icon: TrendingUp,
            color: 'amber'
        },
        {
            id: 4,
            title: 'BMI',
            value: '22.5',
            status: 'Healthy',
            icon: Zap,
            color: 'violet'
        }
    ]

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chatMessages])

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (!chatInput.trim()) return

        // Add user message
        const newUserMessage = {
            id: chatMessages.length + 1,
            type: 'user',
            message: chatInput,
            timestamp: new Date()
        }

        setChatMessages([...chatMessages, newUserMessage])
        setChatInput('')

        // Simulate bot response
        setTimeout(() => {
            const botResponse = {
                id: chatMessages.length + 2,
                type: 'bot',
                message: `I've received your message: "${chatInput}". Based on your symptoms, I recommend consulting with a healthcare professional for proper diagnosis and treatment.`,
                timestamp: new Date(),
                suggestions: ['Schedule Appointment', 'Get Prescription', 'View Analysis']
            }
            setChatMessages(prev => [...prev, botResponse])
        }, 800)
    }

    const handleSymptomToggle = (symptom) => {
        setSelectedSymptoms(prev =>
            prev.includes(symptom)
                ? prev.filter(s => s !== symptom)
                : [...prev, symptom]
        )
    }

    const handleAnalyzeSymptoms = () => {
        setLoading(true)
        setTimeout(() => {
            setRecommendations(medicineRecommendations.slice(0, 3))
            setLoading(false)
            setActiveTab('recommendations')
        }, 1500)
    }

    const HealthReportCard = ({ report }) => {
        const IconComponent = report.icon
        const colorClasses = {
            emerald: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/20',
            cyan: 'from-cyan-500/20 to-cyan-600/5 border-cyan-500/20',
            amber: 'from-amber-500/20 to-amber-600/5 border-amber-500/20',
            violet: 'from-violet-500/20 to-violet-600/5 border-violet-500/20'
        }

        return (
            <div className={`glass-card gradient-bg-${report.color} backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:scale-105 transition-transform`}>
                <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br from-${report.color}-400/30 to-${report.color}-500/20`}>
                        <IconComponent className={`w-6 h-6 text-${report.color}-400`} />
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full text-${report.color}-300 bg-${report.color}-950/40`}>
                        {report.status}
                    </span>
                </div>
                <h4 className="text-gray-400 text-sm font-medium mb-2">{report.title}</h4>
                <p className="text-2xl font-bold text-white ">{report.value}</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-10 left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <header className="mb-10 animate-fade-in">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                                Medical AI Assistant
                            </h1>
                            <p className="text-gray-300 mt-2">Advanced healthcare intelligence at your fingertips</p>
                        </div>
                        <div className="hidden md:flex items-center gap-2 glass-effect px-4 py-2 rounded-lg border border-white/10">
                            <Shield className="w-5 h-5 text-green-400" />
                            <span className="text-sm text-green-400">HIPAA Compliant</span>
                        </div>
                    </div>
                </header>

                {/* Navigation Tabs */}
                <nav className="flex gap-2 mb-8 flex-wrap glass-effect p-2 rounded-xl border border-white/10 w-fit">
                    {[
                        { id: 'chat', label: 'AI Chat', icon: MessageCircle },
                        { id: 'symptoms', label: 'Symptom Checker', icon: Stethoscope },
                        { id: 'recommendations', label: 'Medicines', icon: Pill },
                        { id: 'reports', label: 'Health Reports', icon: Heart }
                    ].map(tab => {
                        const TabIcon = tab.icon
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                                    activeTab === tab.id
                                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                                        : 'text-gray-300 hover:text-white'
                                }`}
                            >
                                <TabIcon className="w-4 h-4" />
                                <span className="hidden sm:inline text-sm font-medium">{tab.label}</span>
                            </button>
                        )
                    })}
                </nav>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Section - AI Chat */}
                    {activeTab === 'chat' && (
                        <div className="lg:col-span-2 animate-fade-in">
                            <div className="glass-effect border border-white/10 rounded-2xl overflow-hidden flex flex-col h-[600px]">
                                {/* Chat Header */}
                                <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-b border-white/10 p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Sparkles className="w-5 h-5 text-cyan-400 animate-spin-slow" />
                                            <div>
                                                <h2 className="font-bold">Medical AI Assistant</h2>
                                                <p className="text-xs text-gray-400">Available 24/7</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                                <Phone className="w-5 h-5 text-gray-400" />
                                            </button>
                                            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                                <AlertTriangle className="w-5 h-5 text-red-400" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Chat Messages */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                    {chatMessages.map(msg => (
                                        <div
                                            key={msg.id}
                                            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                                        >
                                            <div
                                                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl ${
                                                    msg.type === 'user'
                                                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-none'
                                                        : 'glass-effect border border-white/10 text-gray-100 rounded-bl-none'
                                                }`}
                                            >
                                                <p className="text-sm">{msg.message}</p>
                                                {msg.suggestions && (
                                                    <div className="flex gap-2 mt-3 flex-wrap">
                                                        {msg.suggestions.map((suggestion, idx) => (
                                                            <button
                                                                key={idx}
                                                                className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors"
                                                            >
                                                                {suggestion}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={chatEndRef} />
                                </div>

                                {/* Chat Input */}
                                <form onSubmit={handleSendMessage} className="border-t border-white/10 p-4">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Ask me anything about your health..."
                                            value={chatInput}
                                            onChange={(e) => setChatInput(e.target.value)}
                                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan-400/50 transition-colors"
                                        />
                                        <button
                                            className="p-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                                        >
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Symptom Checker */}
                    {activeTab === 'symptoms' && (
                        <div className="lg:col-span-2 animate-fade-in">
                            <div className="glass-effect border border-white/10 rounded-2xl p-8">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold mb-2">Symptom Checker</h2>
                                    <p className="text-gray-400">Select your symptoms for AI analysis</p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                                    {commonSymptoms.map(symptom => (
                                        <button
                                            key={symptom}
                                            onClick={() => handleSymptomToggle(symptom)}
                                            className={`p-4 rounded-lg border-2 transition-all ${
                                                selectedSymptoms.includes(symptom)
                                                    ? 'border-cyan-400 bg-cyan-500/20'
                                                    : 'border-white/10 bg-white/5 hover:border-white/20'
                                            }`}
                                        >
                                            <span className="text-sm font-medium">{symptom}</span>
                                        </button>
                                    ))}
                                </div>

                                <textarea
                                    placeholder="Add additional symptoms or describe your condition in detail..."
                                    value={symptoms}
                                    onChange={(e) => setSymptoms(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-sm focus:outline-none focus:border-cyan-400/50 transition-colors mb-6 h-32 resize-none"
                                />

                                <button
                                    onClick={handleAnalyzeSymptoms}
                                    disabled={selectedSymptoms.length === 0 && !symptoms}
                                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="animate-spin">⚙️</div>
                                            Analyzing Symptoms...
                                        </>
                                    ) : (
                                        <>
                                            <Stethoscope className="w-5 h-5" />
                                            Analyze with AI
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Medicine Recommendations */}
                    {activeTab === 'recommendations' && (
                        <div className="lg:col-span-2 animate-fade-in">
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">Medicine Recommendations</h2>
                                    <p className="text-gray-400">AI-recommended medications based on your symptoms</p>
                                </div>
                                {(recommendations.length > 0 ? recommendations : medicineRecommendations).map(med => (
                                    <div
                                        key={med.id}
                                        className="glass-effect border border-white/10 rounded-xl p-6 hover:border-cyan-400/50 transition-all group"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-cyan-400 group-hover:text-cyan-300">{med.name}</h3>
                                                <p className="text-sm text-gray-400">{med.condition}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-amber-400 font-semibold">{med.rating}</span>
                                                    <span className="text-amber-400">★</span>
                                                </div>
                                                <p className="text-xs text-gray-500">{med.reviews} reviews</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div className="bg-white/5 rounded-lg p-3">
                                                <p className="text-xs text-gray-400 mb-1">Dosage</p>
                                                <p className="text-sm font-semibold text-white">{med.dosage}</p>
                                            </div>
                                            <div className="bg-white/5 rounded-lg p-3">
                                                <p className="text-xs text-gray-400 mb-1">Frequency</p>
                                                <p className="text-sm font-semibold text-white">{med.frequency}</p>
                                            </div>
                                        </div>
                                        <button className="w-full py-2 border border-cyan-400/50 text-cyan-400 rounded-lg hover:bg-cyan-400/10 transition-colors text-sm font-medium">
                                            Get Prescription →
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Health Reports */}
                    {activeTab === 'reports' && (
                        <div className="lg:col-span-2 animate-fade-in">
                            <div>
                                <h2 className="text-2xl font-bold mb-6">Health Status Dashboard</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {healthReports.map(report => (
                                        <HealthReportCard key={report.id} report={report} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Right Sidebar */}
                    <div className="space-y-4">
                        {/* Emergency Button */}
                        <button className="w-full glass-effect border-2 border-red-500/50 rounded-xl p-6 hover:border-red-400 transition-all group hover:shadow-lg hover:shadow-red-500/20 animate-pulse">
                            <div className="flex items-center justify-center gap-3 text-red-400">
                                <AlertTriangle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                <div>
                                    <p className="font-bold">Emergency</p>
                                    <p className="text-sm text-gray-300">1-800-MEDICAL</p>
                                </div>
                            </div>
                        </button>

                        {/* Quick Stats */}
                        <div className="glass-effect border border-white/10 rounded-xl p-6 space-y-4">
                            <h3 className="font-bold">Quick Stats</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-cyan-400" />
                                    <div>
                                        <p className="text-xs text-gray-400">Next Appointment</p>
                                        <p className="font-semibold">Tomorrow, 10:00 AM</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Pill className="w-5 h-5 text-amber-400" />
                                    <div>
                                        <p className="text-xs text-gray-400">Active Treatments</p>
                                        <p className="font-semibold">3 Medications</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Heart className="w-5 h-5 text-red-400" />
                                    <div>
                                        <p className="text-xs text-gray-400">Last Checkup</p>
                                        <p className="font-semibold">2 weeks ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Doctor Contact */}
                        <div className="glass-effect border border-white/10 rounded-xl p-6">
                            <h3 className="font-bold mb-4">Your Doctor</h3>
                            <div className="text-center">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 mx-auto mb-3 flex items-center justify-center">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <p className="font-semibold">Dr. Sarah Johnson</p>
                                <p className="text-sm text-gray-400 mb-3">Cardiologist</p>
                                <button className="w-full py-2 border border-cyan-400/50 text-cyan-400 rounded-lg hover:bg-cyan-400/10 transition-colors text-sm font-medium">
                                    Message Doctor
                                </button>
                            </div>
                        </div>

                        {/* AI Insights */}
                        <div className="glass-effect border border-white/10 rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="w-5 h-5 text-violet-400" />
                                <h3 className="font-bold">AI Insights</h3>
                            </div>
                            <p className="text-sm text-gray-300 mb-4">
                                Based on your health data, maintaining consistent exercise routine can improve your cardiovascular health.
                            </p>
                            <button className="w-full py-2 bg-gradient-to-r from-violet-600 to-blue-600 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-violet-500/50 transition-all">
                                View Full Analysis
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AIAssistantDashboard
