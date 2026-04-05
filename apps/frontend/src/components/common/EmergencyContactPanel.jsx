import React, { useState } from 'react'
import { Phone, MapPin, AlertTriangle, Clock, MessageSquare, Search } from 'lucide-react'

const EmergencyContactPanel = () => {
    const [expanded, setExpanded] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const emergencyContacts = [
        {
            id: 1,
            name: 'Ambulance',
            number: '911',
            type: 'Life-Threatening',
            color: 'red',
            icon: AlertTriangle
        },
        {
            id: 2,
            name: 'Poison Control',
            number: '1-800-222-1222',
            type: 'Poisoning',
            color: 'yellow',
            icon: AlertTriangle
        },
        {
            id: 3,
            name: 'Suicide Prevention',
            number: '988',
            type: 'Mental Health',
            color: 'purple',
            icon: MessageSquare
        },
        {
            id: 4,
            name: 'Nearest Hospital',
            number: '2.3 km away',
            type: 'Emergency',
            color: 'orange',
            icon: MapPin
        },
        {
            id: 5,
            name: 'Your Doctor',
            number: '+1-555-0123',
            type: 'Immediate Care',
            color: 'blue',
            icon: Phone
        },
        {
            id: 6,
            name: 'Emergency Dept',
            number: '+1-555-0198',
            type: 'Emergency',
            color: 'red',
            icon: AlertTriangle
        }
    ]

    const filteredContacts = emergencyContacts.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {expanded && (
                <div className="absolute bottom-24 right-0 w-96 glass-effect border border-white/10 rounded-2xl p-6 mb-4 animate-slide-up">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-white">Emergency Contacts</h3>
                        <button
                            onClick={() => setExpanded(false)}
                            className="text-gray-400 hover:text-white text-2xl"
                        >
                            ×
                        </button>
                    </div>

                    <div className="mb-4 relative">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search contacts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-cyan-400/50 text-white"
                        />
                    </div>

                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {filteredContacts.map(contact => {
                            const IconComponent = contact.icon
                            return (
                                <button
                                    key={contact.id}
                                    onClick={() => {
                                        if (contact.number.startsWith('+1')) {
                                            window.location.href = `tel:${contact.number}`
                                        }
                                    }}
                                    className="w-full p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all text-left group"
                                >
                                    <div className="flex items-start gap-3">
                                        <IconComponent className={`w-5 h-5 text-${contact.color}-400 mt-1 flex-shrink-0`} />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                                                {contact.name}
                                            </p>
                                            <p className="text-sm text-gray-400 mb-1">{contact.type}</p>
                                            <p className="text-cyan-400 font-mono text-sm">{contact.number}</p>
                                        </div>
                                        <Phone className="w-5 h-5 text-gray-600 group-hover:text-cyan-400 flex-shrink-0" />
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}

            <button
                onClick={() => setExpanded(!expanded)}
                className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-white transition-all transform ${
                    expanded ? 'bg-gradient-to-r from-gray-700 to-gray-600' : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                } shadow-lg hover:shadow-xl ${expanded ? '' : 'animate-pulse'}`}
            >
                {expanded ? <span className="text-2xl">×</span> : <AlertTriangle className="w-6 h-6" />}
            </button>
        </div>
    )
}

export default EmergencyContactPanel
