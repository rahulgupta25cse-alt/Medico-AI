import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import EmergencyButton from '../features/EmergencyButton'
import VoiceRecorder from '../common/VoiceRecorder'
import './DashboardLayout.css'

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const location = useLocation()

    const handleMenuToggle = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    const handleSidebarClose = () => {
        setIsSidebarOpen(false)
    }

    return (
        <div className="dashboard-layout">
            {/* Navbar */}
            <Navbar onMenuToggle={handleMenuToggle} />

            {/* Main Container */}
            <div className="dashboard-container">
                {/* Sidebar */}
                <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />

                {/* Main Content */}
                <main className="dashboard-main-content">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            {/* Emergency Button */}
            <EmergencyButton />

            {/* Global Voice Assistant */}
            {VoiceRecorder && <VoiceRecorder />}
        </div>
    )
}

export default DashboardLayout
