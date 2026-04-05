import React from 'react'
import { Menu, Bell, Settings, LogOut, Home } from 'lucide-react'
import './MobileLayout.css'

const MobileLayout = ({ children, title, showBackButton = false, onBack }) => {
    const [menuOpen, setMenuOpen] = React.useState(false)

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex flex-col md:hidden">
            {/* Mobile Header */}
            <header className="glass-effect border-b border-white/10 sticky top-0 z-40">
                <div className="flex items-center justify-between px-4 py-4">
                    <div className="flex items-center gap-3 flex-1">
                        {showBackButton && (
                            <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-lg">
                                ←
                            </button>
                        )}
                        <h1 className="text-lg font-bold text-white truncate">{title}</h1>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-white/10 rounded-lg relative">
                            <Bell className="w-5 h-5 text-gray-400" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 hover:bg-white/10 rounded-lg">
                            <Menu className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {menuOpen && (
                    <div className="border-t border-white/10 bg-black/20 py-2 space-y-1 animate-slide-up">
                        <button className="w-full px-4 py-3 flex items-center gap-3 text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                            <Home className="w-4 h-4" />
                            <span className="text-sm">Home</span>
                        </button>
                        <button className="w-full px-4 py-3 flex items-center gap-3 text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                            <Settings className="w-4 h-4" />
                            <span className="text-sm">Settings</span>
                        </button>
                        <button className="w-full px-4 py-3 flex items-center gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors border-t border-white/10">
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm">Logout</span>
                        </button>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto px-4 py-6 pb-20">
                {children}
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 glass-effect border-t border-white/10 px-4 py-3">
                <div className="flex justify-around">
                    <NavButton label="Chat" icon="💬" />
                    <NavButton label="Symptoms" icon="🏥" />
                    <NavButton label="Reports" icon="📊" />
                    <NavButton label="Profile" icon="👤" />
                </div>
            </nav>
        </div>
    )
}

const NavButton = ({ label, icon }) => (
    <button className="flex flex-col items-center gap-1 py-2 px-3 rounded-lg hover:bg-white/10 transition-colors">
        <span className="text-xl">{icon}</span>
        <span className="text-xs text-gray-400 text-center">{label}</span>
    </button>
)

export default MobileLayout
