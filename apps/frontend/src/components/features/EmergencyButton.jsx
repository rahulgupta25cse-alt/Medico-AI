import React, { useState } from 'react'
import { AlertTriangle, Phone, MapPin, Heart } from 'lucide-react'
import './EmergencyButton.css'

const EmergencyButton = ({ onClick }) => {
    const [showEmergencyMenu, setShowEmergencyMenu] = useState(false)

    const emergencyContacts = [
        { label: 'Call 911', action: () => alert('Calling emergency services...'), icon: Phone },
        { label: 'Nearby Hospital', action: () => alert('Finding nearest hospital...'), icon: MapPin },
        { label: 'Alert Doctor', action: () => alert('Alerting your doctor...'), icon: Heart }
    ]

    return (
        <div className="emergency-button-container">
            {showEmergencyMenu && (
                <div className="emergency-menu">
                    {emergencyContacts.map((contact, idx) => (
                        <button
                            key={idx}
                            onClick={contact.action}
                            className="emergency-option"
                        >
                            <contact.icon size={20} />
                            <span>{contact.label}</span>
                        </button>
                    ))}
                </div>
            )}

            <button
                onClick={() => setShowEmergencyMenu(!showEmergencyMenu)}
                className="emergency-btn"
                title="Emergency"
            >
                <AlertTriangle size={24} />
                <span className="emergency-pulse"></span>
            </button>
        </div>
    )
}

export default EmergencyButton
