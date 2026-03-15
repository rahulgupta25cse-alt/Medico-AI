import React, { useState, useEffect, useRef } from 'react'
import { Send, Loader, AlertCircle } from 'lucide-react'
import apiClient from '../../services/api'
import './Chatbot.css'

const Chatbot = ({ compact = false }) => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            message: 'Hello! I\'m Medico AI. How can I assist you with your health concerns today?',
            timestamp: new Date()
        }
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (!input.trim()) return

        setError('')

        // Add user message
        const userMessage = {
            id: Date.now(),
            type: 'user',
            message: input,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInput('')
        setLoading(true)

        try {
            // Call backend API
            const response = await apiClient.post('/ai/chat', {
                message: input,
                conversationId: localStorage.getItem('conversationId')
            })

            const aiReply = response.data.reply || response.data.response || response.data.message

            const botMessage = {
                id: Date.now() + 1,
                type: 'bot',
                message: aiReply || 'I understand. Let me help you with that.',
                timestamp: new Date(),
                suggestions: response.data.suggestions || []
            }

            setMessages(prev => [...prev, botMessage])

            // Save conversation ID if provided
            if (response.data.conversationId) {
                localStorage.setItem('conversationId', response.data.conversationId)
            }
        } catch (err) {
            setError('Failed to get response from AI. Please try again.')
            console.error('Chat error:', err)
        } finally {
            setLoading(false)
        }
    }

    const containerClass = compact ? 'chatbot-compact' : 'chatbot-full'

    return (
        <div className={`chatbot-container ${containerClass}`}>
            {/* Header */}
            <div className="chatbot-header">
                <div className="header-content">
                    <h3 className="header-title">Medico AI Assistant</h3>
                    <p className="header-status online">• Online - Ready to help</p>
                </div>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message-group message-${msg.type}`}>
                        {msg.type === 'bot' && (
                            <div className="message-avatar bot-avatar">
                                <span>🤖</span>
                            </div>
                        )}
                        <div className="message-content">
                            <div className={`message-bubble ${msg.type}`}>
                                <p>{msg.message}</p>
                                {msg.suggestions && msg.suggestions.length > 0 && (
                                    <div className="message-suggestions">
                                        {msg.suggestions.map((suggestion, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    setInput(suggestion)
                                                }}
                                                className="suggestion-btn"
                                            >
                                                {suggestion}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <span className="message-time">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="message-group message-bot">
                        <div className="message-avatar bot-avatar">
                            <span>🤖</span>
                        </div>
                        <div className="message-content">
                            <div className="message-bubble bot typing">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="message-group message-error">
                        <AlertCircle size={18} />
                        <div className="message-content">
                            <div className="message-bubble error">
                                <p>{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="chatbot-input-form">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your health question..."
                    className="chat-input"
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="send-btn"
                >
                    {loading ? <Loader size={20} /> : <Send size={20} />}
                </button>
            </form>
        </div>
    )
}

export default Chatbot
