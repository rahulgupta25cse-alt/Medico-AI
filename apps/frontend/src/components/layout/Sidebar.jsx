import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
    Home, MessageCircle, Stethoscope, FileText, Users,
    BarChart3, Settings, AlertCircle, ChevronDown, X
} from 'lucide-react'
import './Sidebar.css'

const Sidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [expandedMenu, setExpandedMenu] = useState(null)

    const menuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: Home,
            path: '/dashboard'
        },
        {
            id: 'ai',
            label: 'AI Assistant',
            icon: MessageCircle,
            submenu: [
                { label: 'Chat with AI', path: '/ai/chat' },
                { label: 'Symptom Checker', path: '/ai/symptom-checker' }
            ]
        },
        {
            id: 'medical',
            label: 'Medical Records',
            icon: FileText,
            submenu: [
                { label: 'Health Reports', path: '/reports' },
                { label: 'Upload Report', path: '/reports/upload' }
            ]
        },
        {
            id: 'patients',
            label: 'Patients',
            icon: Users,
            path: '/patients'
        },
        {
            id: 'emergency',
            label: 'Emergency',
            icon: AlertCircle,
            path: '/emergency',
            highlight: true
        },
        {
            id: 'analytics',
            label: 'Analytics',
            icon: BarChart3,
            path: '/analytics'
        },
        {
            id: 'settings',
            label: 'Settings',
            icon: Settings,
            path: '/settings'
        }
    ]

    const isActive = (path) => location.pathname === path

    const handleMenuClick = (item) => {
        if (item.path) {
            navigate(item.path)
            onClose()
        } else if (item.submenu) {
            setExpandedMenu(expandedMenu === item.id ? null : item.id)
        }
    }

    return (
        <>
            {/* Overlay */}
            {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

            {/* Sidebar */}
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                {/* Close Button (Mobile) */}
                <button className="sidebar-close md:hidden" onClick={onClose}>
                    <X size={24} />
                </button>

                {/* Navigation */}
                <nav className="sidebar-nav">
                    {menuItems.map((item) => (
                        <div key={item.id}>
                            {/* Main Menu Item */}
                            <button
                                onClick={() => handleMenuClick(item)}
                                className={`sidebar-item ${isActive(item.path) ? 'active' : ''} ${item.highlight ? 'highlight' : ''}`}
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                                {item.submenu && (
                                    <ChevronDown
                                        size={16}
                                        className={`expand-icon ${expandedMenu === item.id ? 'open' : ''}`}
                                    />
                                )}
                            </button>

                            {/* Submenu */}
                            {item.submenu && expandedMenu === item.id && (
                                <div className="submenu">
                                    {item.submenu.map((subitem, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                navigate(subitem.path)
                                                onClose()
                                            }}
                                            className={`submenu-item ${isActive(subitem.path) ? 'active' : ''}`}
                                        >
                                            {subitem.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Footer Info */}
                <div className="sidebar-footer">
                    <div className="version-info">
                        <p>Medico v1.0</p>
                        <p>AI Medical Assistant</p>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Sidebar
