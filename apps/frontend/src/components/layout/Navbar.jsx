import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
    Menu, X, LogOut, Home, MessageCircle, Stethoscope,
    FileText, Settings, Bell, User, ChevronRight, Zap
} from 'lucide-react'
import './Navbar.css'

const Navbar = ({ onMenuToggle }) => {
    const navigate = useNavigate()
    const { user, logout } = useAuth()
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [notifications, setNotifications] = useState(3)

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className="navbar-modern">
            <div className="nav-container">
                {/* Logo Section */}
                <div className="nav-brand">
                    <button
                        onClick={onMenuToggle}
                        className="menu-toggle md:hidden"
                    >
                        <Menu size={24} />
                    </button>
                    <div className="logo-section">
                        <div className="logo-icon">
                            <Zap size={28} />
                        </div>
                        <div>
                            <h1 className="logo-title">Medico</h1>
                            <p className="logo-subtitle">AI Medical Assistant</p>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="nav-right">
                    {/* Notifications */}
                    <button className="notification-btn">
                        <Bell size={20} />
                        {notifications > 0 && (
                            <span className="notification-badge">{notifications}</span>
                        )}
                    </button>

                    {/* User Menu */}
                    <div className="user-menu-container">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="user-btn"
                        >
                            <div className="user-avatar">
                                {user?.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="user-info">
                                <p className="user-name">{user?.name || 'User'}</p>
                                <p className="user-role">{user?.role || 'Patient'}</p>
                            </div>
                        </button>

                        {/* Dropdown Menu */}
                        {showUserMenu && (
                            <div className="user-dropdown">
                                <div className="dropdown-header">
                                    <User size={18} />
                                    <span>My Profile</span>
                                </div>
                                <button className="dropdown-item">
                                    <Settings size={18} />
                                    <span>Settings</span>
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="dropdown-item logout-item"
                                >
                                    <LogOut size={18} />
                                    <span>Log Out</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
