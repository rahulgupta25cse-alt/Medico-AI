import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiClient from '../../services/api'
import { Save, X, ArrowLeft } from 'lucide-react'

const PatientForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEdit = !!id

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: 'MALE',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        emergencyContact: '',
        emergencyPhone: '',
        bloodGroup: '',
        allergies: '',
        medicalHistory: ''
    })

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (isEdit) {
            fetchPatient()
        }
    }, [id])

    const fetchPatient = async () => {
        try {
            const response = await apiClient.get(`/patients/${id}`)
            setFormData(response.data)
        } catch (error) {
            console.error('Error fetching patient:', error)
            alert('Failed to load patient data')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const validate = () => {
        const newErrors = {}

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid'
        }
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validate()) return

        setLoading(true)
        try {
            if (isEdit) {
                await apiClient.put(`/patients/${id}`, formData)
            } else {
                await apiClient.post('/patients', formData)
            }
            navigate('/patients')
        } catch (error) {
            console.error('Error saving patient:', error)
            alert(error.response?.data?.message || 'Failed to save patient')
        } finally {
            setLoading(false)
        }
    }

    const inputCls = (hasError) =>
        `w-full px-4 py-2 rounded-lg bg-slate-900/60 border ${
            hasError ? 'border-red-500' : 'border-slate-700'
        } text-slate-200 placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent`

    return (
        <div className="space-y-6">
            {/* Header */}
            <header className="rounded-2xl border border-slate-700 bg-slate-800/60 p-6 backdrop-blur-md">
                <div className="flex items-center">
                    <button
                        onClick={() => navigate('/patients')}
                        className="mr-4 text-slate-400 hover:text-slate-100 transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-100">
                            {isEdit ? 'Edit Patient' : 'Add New Patient'}
                        </h1>
                        <p className="text-slate-400 mt-1">
                            {isEdit ? 'Update patient information' : 'Enter patient details'}
                        </p>
                    </div>
                </div>
            </header>

            <div>
                <form onSubmit={handleSubmit} className="rounded-xl border border-slate-700 bg-slate-800/60 p-8 backdrop-blur-md space-y-8">
                    {/* Personal Information */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-100 mb-6 pb-2 border-b border-slate-700">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    First Name <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={inputCls(errors.firstName)}
                                />
                                {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Last Name <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={inputCls(errors.lastName)}
                                />
                                {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Email <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={inputCls(errors.email)}
                                />
                                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={inputCls(false)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Date of Birth <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    className={inputCls(errors.dateOfBirth)}
                                />
                                {errors.dateOfBirth && <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Gender
                                </label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className={inputCls(false)}
                                >
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Blood Group
                                </label>
                                <select
                                    name="bloodGroup"
                                    value={formData.bloodGroup}
                                    onChange={handleChange}
                                    className={inputCls(false)}
                                >
                                    <option value="">Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Address Information */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-100 mb-6 pb-2 border-b border-slate-700">Address Information</h2>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className={inputCls(false)}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className={inputCls(false)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">
                                        State
                                    </label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className={inputCls(false)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">
                                        ZIP Code
                                    </label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                        className={inputCls(false)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Emergency Contact */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-100 mb-6 pb-2 border-b border-slate-700">Emergency Contact</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Contact Name
                                </label>
                                <input
                                    type="text"
                                    name="emergencyContact"
                                    value={formData.emergencyContact}
                                    onChange={handleChange}
                                    className={inputCls(false)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Contact Phone
                                </label>
                                <input
                                    type="tel"
                                    name="emergencyPhone"
                                    value={formData.emergencyPhone}
                                    onChange={handleChange}
                                    className={inputCls(false)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Medical Information */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-100 mb-6 pb-2 border-b border-slate-700">Medical Information</h2>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Allergies
                                </label>
                                <textarea
                                    name="allergies"
                                    value={formData.allergies}
                                    onChange={handleChange}
                                    rows="3"
                                    className={inputCls(false)}
                                    placeholder="List any known allergies..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Medical History
                                </label>
                                <textarea
                                    name="medicalHistory"
                                    value={formData.medicalHistory}
                                    onChange={handleChange}
                                    rows="4"
                                    className={inputCls(false)}
                                    placeholder="Enter relevant medical history..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-4 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate('/patients')}
                            className="px-6 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700/60 transition-colors"
                        >
                            <X className="w-5 h-5 inline mr-2" />
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white transition hover:shadow-lg hover:shadow-cyan-900/40 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Save className="w-5 h-5 inline mr-2" />
                            {loading ? 'Saving...' : isEdit ? 'Update Patient' : 'Add Patient'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PatientForm
