import React from 'react'
import { Star, AlertTriangle, ShoppingCart } from 'lucide-react'
import './MedicineSuggestion.css'

const MedicineSuggestion = ({ medicine }) => {
    return (
        <div className="medicine-suggestion-card">
            <div className="medicine-header">
                <div className="medicine-main">
                    <h3 className="medicine-name">{medicine.name}</h3>
                    <p className="medicine-type">{medicine.type}</p>
                </div>
                {medicine.newProduct && <span className="new-badge">NEW</span>}
            </div>

            <div className="medicine-body">
                <div className="medicine-info">
                    <div className="info-item">
                        <label>Dosage</label>
                        <span>{medicine.dosage}</span>
                    </div>
                    <div className="info-item">
                        <label>Frequency</label>
                        <span>{medicine.frequency}</span>
                    </div>
                </div>

                {medicine.rating && (
                    <div className="medicine-rating">
                        <div className="stars">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    className={i < Math.floor(medicine.rating) ? 'filled' : ''}
                                />
                            ))}
                        </div>
                        <span className="rating-value">{medicine.rating}/5</span>
                    </div>
                )}

                {medicine.sideEffects && medicine.sideEffects.length > 0 && (
                    <div className="side-effects">
                        <div className="side-effects-header">
                            <AlertTriangle size={14} />
                            <span>Possible Side Effects</span>
                        </div>
                        <ul>
                            {medicine.sideEffects.slice(0, 2).map((effect, idx) => (
                                <li key={idx}>{effect}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <button className="medicine-action-btn">
                <ShoppingCart size={18} />
                Order Now
            </button>
        </div>
    )
}

export default MedicineSuggestion
