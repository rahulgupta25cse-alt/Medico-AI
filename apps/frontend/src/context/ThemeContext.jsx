import React, { createContext, useState } from 'react'

// Theme Context
export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark')
    const [accentColor, setAccentColor] = useState('cyan')

    const colors = {
        dark: {
            background: 'from-slate-950 via-blue-950 to-slate-900',
            surface: 'rgba(255, 255, 255, 0.04)',
            text: '#ffffff',
            textMuted: '#9ca3af',
            border: 'rgba(255, 255, 255, 0.08)'
        }
    }

    const accentColors = {
        cyan: {
            primary: '#06b6d4',
            secondary: '#0ea5e9',
            highlight: '#22d3ee'
        },
        blue: {
            primary: '#0ea5e9',
            secondary: '#3b82f6',
            highlight: '#60a5fa'
        },
        violet: {
            primary: '#a78bfa',
            secondary: '#c4b5fd',
            highlight: '#ddd6fe'
        }
    }

    const getTheme = () => colors[theme]
    const getAccent = () => accentColors[accentColor]

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
                accentColor,
                setAccentColor,
                getTheme,
                getAccent,
                colors,
                accentColors
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = React.useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider')
    }
    return context
}
