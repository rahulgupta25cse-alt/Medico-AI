import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../../services/api'
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react'

const ReportUploadPage = () => {
    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [uploadStatus, setUploadStatus] = useState(null) // 'success' | 'error'
    const [uploadErrorMessage, setUploadErrorMessage] = useState('')
    const [patients, setPatients] = useState([])
    const [loadingPatients, setLoadingPatients] = useState(true)

    // Fetch patients on mount
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await apiClient.get('/patients?size=100') // Fetch first 100 for dropdown
                // Handle both List (current backend) and Page (future backend) responses
                if (Array.isArray(response.data)) {
                    setPatients(response.data)
                } else {
                    setPatients(response.data.content || [])
                }
            } catch (error) {
                console.error('Error fetching patients:', error)
            } finally {
                setLoadingPatients(false)
            }
        }
        fetchPatients()
    }, [])

    const [formData, setFormData] = useState({
        patientId: '',
        title: '',
        reportType: 'LAB_RESULT',
        description: ''
    })

    const handleFileSelect = (e) => {
        const file = e.target.files[0]
        if (file) {
            // Validate file type
            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
            if (!allowedTypes.includes(file.type)) {
                alert('Please select a PDF or image file')
                return
            }
            // Validate file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                alert('File size must be less than 10MB')
                return
            }
            setSelectedFile(file)
            setUploadStatus(null)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        if (file) {
            setSelectedFile(file)
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!selectedFile) {
            alert('Please select a file to upload')
            return
        }

        if (!formData.patientId || !formData.title) {
            alert('Please fill in all required fields')
            return
        }

        setUploading(true)
        setUploadProgress(0)

        try {
            const formDataToSend = new FormData()
            formDataToSend.append('file', selectedFile)
            formDataToSend.append('patientId', formData.patientId)
            formDataToSend.append('title', formData.title)
            formDataToSend.append('reportType', formData.reportType)
            formDataToSend.append('description', formData.description)

            const response = await apiClient.post('/reports/upload', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    setUploadProgress(progress)
                }
            })

            setUploadStatus('success')
            setUploadErrorMessage('')
            setTimeout(() => {
                navigate('/reports')
            }, 2000)
        } catch (error) {
            console.error('Error uploading report:', error)
            setUploadStatus('error')
            const backendMessage = error?.response?.data?.error || error?.response?.data?.message
            setUploadErrorMessage(backendMessage || 'Please try again or contact support')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="space-y-6">
            <header className="rounded-2xl border border-slate-700 bg-slate-800/60 p-6 backdrop-blur-md">
                <h1 className="text-3xl font-bold text-slate-100">Upload Health Report</h1>
                <p className="mt-1 text-slate-400">Upload and analyze patient medical reports</p>
            </header>

            <form onSubmit={handleSubmit} className="rounded-xl border border-slate-700 bg-slate-800/60 p-6">
                    {/* Report Information */}
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-slate-100 mb-4">Report Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Patient <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="patientId"
                                    value={formData.patientId}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-slate-600 bg-slate-900/70 text-slate-100 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Select a Patient</option>
                                    {loadingPatients ? (
                                        <option disabled>Loading...</option>
                                    ) : (
                                        patients.map(patient => (
                                            <option key={patient.id} value={patient.id}>
                                                {patient.firstName} {patient.lastName} (ID: {patient.id.substring(0, 8)}...)
                                            </option>
                                        ))
                                    )}
                                </select>
                                {patients.length === 0 && !loadingPatients && (
                                    <p className="text-xs text-red-500 mt-1">No patients found. Please add a patient first.</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Report Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="reportType"
                                    value={formData.reportType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-slate-600 bg-slate-900/70 text-slate-100 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                >
                                    <option value="LAB_RESULT">Lab Result</option>
                                    <option value="IMAGING">Imaging</option>
                                    <option value="CONSULTATION">Consultation</option>
                                    <option value="PRESCRIPTION">Prescription</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Report Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-slate-600 bg-slate-900/70 text-slate-100 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    placeholder="e.g., Blood Test Results - January 2026"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full px-4 py-2 border border-slate-600 bg-slate-900/70 text-slate-100 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    placeholder="Add any additional notes or context..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* File Upload */}
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-slate-100 mb-4">Upload File</h2>

                        {!selectedFile ? (
                            <div
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                className="border-2 border-dashed border-slate-600 rounded-lg p-12 text-center hover:border-cyan-500 transition-colors cursor-pointer bg-slate-900/40"
                                onClick={() => document.getElementById('fileInput').click()}
                            >
                                <Upload className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                                <p className="text-lg font-medium text-slate-100 mb-2">
                                    Drop your file here or click to browse
                                </p>
                                <p className="text-sm text-slate-400">
                                    Supported formats: PDF, JPG, PNG (Max 10MB)
                                </p>
                                <input
                                    id="fileInput"
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                            </div>
                        ) : (
                            <div className="border-2 border-cyan-500/60 rounded-lg p-6 bg-cyan-500/10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <FileText className="w-10 h-10 text-primary-600 mr-4" />
                                        <div>
                                            <p className="font-medium text-slate-100">{selectedFile.name}</p>
                                            <p className="text-sm text-slate-400">
                                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedFile(null)}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                {uploading && (
                                    <div className="mt-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-slate-300">Uploading...</span>
                                            <span className="text-sm font-medium text-slate-300">{uploadProgress}%</span>
                                        </div>
                                        <div className="w-full bg-slate-700 rounded-full h-2">
                                            <div
                                                className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${uploadProgress}%` }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Upload Status */}
                    {uploadStatus === 'success' && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                            <div>
                                <p className="font-medium text-green-900">Upload Successful!</p>
                                <p className="text-sm text-green-700">Redirecting to reports...</p>
                            </div>
                        </div>
                    )}

                    {uploadStatus === 'error' && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                            <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
                            <div>
                                <p className="font-medium text-red-900">Upload Failed</p>
                                <p className="text-sm text-red-700">{uploadErrorMessage || 'Please try again or contact support'}</p>
                            </div>
                        </div>
                    )}

                    {/* Form Actions */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/reports')}
                            className="px-6 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors"
                            disabled={uploading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={uploading || !selectedFile}
                            className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-900/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {uploading ? 'Uploading...' : 'Upload Report'}
                        </button>
                    </div>
            </form>
        </div>
    )
}

export default ReportUploadPage
