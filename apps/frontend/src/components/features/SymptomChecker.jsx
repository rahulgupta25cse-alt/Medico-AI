import React, { useState } from 'react'
import { Send, AlertCircle, CheckCircle2, Loader } from 'lucide-react'
import apiClient from '../../services/api'
import './SymptomChecker.css'

const SymptomChecker = () => {
    const [selectedSymptoms, setSelectedSymptoms] = useState([])
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState('1-3 days')
    const [severity, setSeverity] = useState('moderate')
    const [analysis, setAnalysis] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [step, setStep] = useState('input') // 'input' or 'results'

    const commonSymptoms = [
        'Fever', 'Cough', 'Sore Throat', 'Headache',
        'Fatigue', 'Body Ache', 'Shortness of Breath', 'Nausea',
        'Diarrhea', 'Rash', 'Joint Pain', 'Dizziness'
    ]

    const toggleSymptom = (symptom) => {
        setSelectedSymptoms(prev =>
            prev.includes(symptom)
                ? prev.filter(s => s !== symptom)
                : [...prev, symptom]
        )
        setError('')
    }

    const handleAnalyze = async () => {
        if (selectedSymptoms.length === 0) {
            setError('Please select at least one symptom')
            return
        }

        setLoading(true)
        setError('')

        try {
            const response = await apiClient.post('/ai/predict/symptoms', {
                symptoms: selectedSymptoms,
                demographics: {
                    duration,
                    severity
                },
                vitals: {
                    notes: description
                }
            })

            const data = response.data || {}
            const normalizedConditions = (data.conditions || []).map((condition) => ({
                name: condition.name || 'Unknown condition',
                confidence: Math.round((condition.confidence ?? condition.probability ?? 0) * 100),
                description: condition.description || condition.detail || 'No description available',
                recommendations: condition.recommendations || []
            }))

            const normalizedAnalysis = {
                ...data,
                conditions: normalizedConditions,
                suggestedMedicines: data.suggestedMedicines || data.medicines || [],
                generalAdvice: data.generalAdvice || data.summary || ''
            }

            setAnalysis(normalizedAnalysis)
            setStep('results')
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to analyze symptoms')
            console.error('Analysis error:', err)
        } finally {
            setLoading(false)
        }
    }

    if (step === 'results' && analysis) {
        return (
            <div className="symptoms-results">
                <div className="results-header">
                    <button
                        onClick={() => {
                            setStep('input')
                            setAnalysis(null)
                            setSelectedSymptoms([])
                            setDescription('')
                        }}
                        className="back-btn"
                    >
                        ← Back
                    </button>
                    <h2>Analysis Results</h2>
                </div>

                <div className="results-content">
                    {/* Conditions Section */}
                    {analysis.conditions && analysis.conditions.length > 0 && (
                        <div className="results-section">
                            <h3>Possible Conditions</h3>
                            <div className="conditions-list">
                                {analysis.conditions.map((condition, idx) => (
                                    <div key={idx} className="condition-card">
                                        <div className="condition-header">
                                            <h4>{condition.name}</h4>
                                            <div
                                                className="confidence-badge"
                                                style={{
                                                    background: `rgba(${condition.confidence > 70
                                                        ? '34, 197, 94'
                                                        : condition.confidence > 40
                                                            ? '251, 146, 60'
                                                            : '239, 68, 68'
                                                        }, 0.2)`
                                                }}
                                            >
                                                {condition.confidence}% likely
                                            </div>
                                        </div>
                                        <p className="condition-description">{condition.description}</p>

                                        {condition.recommendations && (
                                            <div className="condition-recommendations">
                                                <strong>Recommendations:</strong>
                                                <ul>
                                                    {condition.recommendations.map((rec, idx) => (
                                                        <li key={idx}>{rec}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Medicines Section */}
                    {analysis.suggestedMedicines && (
                        <div className="results-section">
                            <h3>Suggested Medicines</h3>
                            <div className="medicines-grid">
                                {analysis.suggestedMedicines.map((med, idx) => (
                                    <div key={idx} className="medicine-card">
                                        <h4>{med.name}</h4>
                                        <p className="medicine-dosage">{med.dosage}</p>
                                        <p className="medicine-frequency">{med.frequency}</p>
                                        {med.indication && (
                                            <p className="medicine-indication">{med.indication}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* General Advice */}
                    {analysis.generalAdvice && (
                        <div className="results-section advice-section">
                            <h3>General Advice</h3>
                            <p>{analysis.generalAdvice}</p>
                        </div>
                    )}

                    {/* Warning */}
                    <div className="results-warning">
                        <AlertCircle size={20} />
                        <p>This is an AI analysis. Please consult a healthcare professional for a proper diagnosis and treatment.</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="symptom-checker">
            <div className="checker-header">
                <h2>Symptom Checker</h2>
                <p>Describe your symptoms and let our AI analyze them</p>
            </div>

            <div className="checker-content">
                {/* Symptoms Selection */}
                <div className="checker-section">
                    <h3>Select Your Symptoms</h3>
                    <div className="symptoms-grid">
                        {commonSymptoms.map(symptom => (
                            <button
                                key={symptom}
                                onClick={() => toggleSymptom(symptom)}
                                className={`symptom-btn ${selectedSymptoms.includes(symptom) ? 'selected' : ''}`}
                            >
                                <span>{symptom}</span>
                                {selectedSymptoms.includes(symptom) && <CheckCircle2 size={18} />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Additional Details */}
                <div className="checker-section">
                    <h3>Additional Details</h3>

                    {/* Description */}
                    <div className="form-group">
                        <label>Describe Your Symptoms</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Provide more details about your symptoms..."
                            rows="4"
                        />
                    </div>

                    {/* Duration */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Duration</label>
                            <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                                <option value="less-24-hours">Less than 24 hours</option>
                                <option value="1-3 days">1-3 days</option>
                                <option value="4-7 days">4-7 days</option>
                                <option value="1-2 weeks">1-2 weeks</option>
                                <option value="more-2-weeks">More than 2 weeks</option>
                            </select>
                        </div>

                        {/* Severity */}
                        <div className="form-group">
                            <label>Severity</label>
                            <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
                                <option value="mild">Mild</option>
                                <option value="moderate">Moderate</option>
                                <option value="severe">Severe</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="error-message">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                {/* Selected Symptoms Display */}
                {selectedSymptoms.length > 0 && (
                    <div className="selected-display">
                        <strong>Selected: {selectedSymptoms.length} symptom{selectedSymptoms.length > 1 ? 's' : ''}</strong>
                        <div className="selected-tags">
                            {selectedSymptoms.map(symptom => (
                                <span key={symptom} className="symptom-tag">
                                    {symptom}
                                    <button onClick={() => toggleSymptom(symptom)}>×</button>
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Analyze Button */}
                <button
                    onClick={handleAnalyze}
                    disabled={loading || selectedSymptoms.length === 0}
                    className="analyze-btn"
                >
                    {loading ? (
                        <>
                            <Loader size={20} />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <Send size={20} />
                            Analyze Symptoms
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default SymptomChecker
