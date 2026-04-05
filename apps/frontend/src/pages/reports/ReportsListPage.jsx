import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../../services/api'
import { FileText, Download, Eye, Trash2, Upload, Search } from 'lucide-react'

const ReportsListPage = () => {
    const [reports, setReports] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterType, setFilterType] = useState('ALL')
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const filteredReports = reports.filter((report) => {
        const typeMatch = filterType === 'ALL' || report.reportType === filterType
        const search = searchTerm.trim().toLowerCase()
        if (!search) return typeMatch

        const title = (report.title || '').toLowerCase()
        const patientName = (report.patientName || '').toLowerCase()
        const description = (report.description || '').toLowerCase()
        return typeMatch && (title.includes(search) || patientName.includes(search) || description.includes(search))
    })

    useEffect(() => {
        fetchReports()
    }, [currentPage, filterType])

    const fetchReports = async () => {
        try {
            setLoading(true)
            const response = await apiClient.get(`/reports?page=${currentPage}&size=10`)
            setReports(response.data.content || [])
            setTotalPages(response.data.totalPages || 0)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching reports:', error)
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this report?')) return

        try {
            await apiClient.delete(`/reports/${id}`)
            fetchReports()
        } catch (error) {
            console.error('Error deleting report:', error)
            alert('Failed to delete report')
        }
    }

    const getReportTypeColor = (type) => {
        const colors = {
            LAB_RESULT: 'bg-blue-100 text-blue-800',
            IMAGING: 'bg-purple-100 text-purple-800',
            CONSULTATION: 'bg-green-100 text-green-800',
            PRESCRIPTION: 'bg-yellow-100 text-yellow-800',
            OTHER: 'bg-gray-100 text-gray-800'
        }
        return colors[type] || colors.OTHER
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <header className="rounded-2xl border border-slate-700 bg-slate-800/60 p-6 backdrop-blur-md">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-100">Health Reports</h1>
                        <p className="mt-1 text-slate-400">View and manage medical reports</p>
                    </div>
                    <Link
                        to="/reports/upload"
                        className="inline-flex items-center rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:shadow-lg hover:shadow-cyan-900/40"
                    >
                        <Upload className="w-5 h-5 mr-2" />
                        Upload Report
                    </Link>
                </div>
            </header>

            {/* Search and Filter */}
            <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search reports by title, patient, or description..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-lg border border-slate-600 bg-slate-900/70 pl-10 pr-4 py-2 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            />
                            <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-500" />
                        </div>
                    </div>
                    <div>
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="w-full rounded-lg border border-slate-600 bg-slate-900/70 px-4 py-2 text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        >
                            <option value="ALL">All Types</option>
                            <option value="LAB_RESULT">Lab Results</option>
                            <option value="IMAGING">Imaging</option>
                            <option value="CONSULTATION">Consultation</option>
                            <option value="PRESCRIPTION">Prescription</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>
                </div>
            </div>

                {/* Reports Grid */}
                {filteredReports.length === 0 ? (
                    <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-12 text-center">
                        <FileText className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-100 mb-2">No reports found</h3>
                        <p className="text-slate-400 mb-4">Try adjusting filters or upload a new report.</p>
                        <Link
                            to="/reports/upload"
                            className="inline-flex items-center rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:shadow-lg hover:shadow-cyan-900/40"
                        >
                            <Upload className="w-5 h-5 mr-2" />
                            Upload Report
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredReports.map((report) => (
                            <div key={report.id} className="rounded-xl border border-slate-700 bg-slate-800/70 hover:border-cyan-500/50 transition-shadow overflow-hidden">
                                {/* Report Header */}
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getReportTypeColor(report.reportType)}`}>
                                                {report.reportType?.replace('_', ' ')}
                                            </span>
                                        </div>
                                        <FileText className="w-8 h-8 text-primary-600" />
                                    </div>

                                    <h3 className="text-lg font-semibold text-slate-100 mb-2 line-clamp-2">
                                        {report.title || 'Untitled Report'}
                                    </h3>

                                    <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                                        {report.description || 'No description available'}
                                    </p>

                                    <div className="space-y-2 text-sm text-slate-400">
                                        <div className="flex items-center">
                                            <span className="font-medium mr-2 text-slate-300">Patient:</span>
                                            <span>{report.patientName || report.patientId}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-medium mr-2 text-slate-300">Date:</span>
                                            <span>{report.uploadedAt ? new Date(report.uploadedAt).toLocaleDateString() : 'N/A'}</span>
                                        </div>
                                        {report.analysisStatus && (
                                            <div className="flex items-center">
                                                <span className="font-medium mr-2 text-slate-300">Analysis:</span>
                                                <span className={`px-2 py-0.5 text-xs rounded-full ${report.analysisStatus === 'COMPLETED'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {report.analysisStatus}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Report Actions */}
                                <div className="bg-slate-900/60 px-6 py-4 flex items-center justify-between border-t border-slate-700">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => window.open(`/api/reports/${report.id}/download`, '_blank')}
                                            className="text-cyan-400 hover:text-cyan-300"
                                            title="Download"
                                        >
                                            <Download className="w-5 h-5" />
                                        </button>
                                        <Link
                                            to={`/reports/${report.id}`}
                                            className="text-blue-400 hover:text-blue-300"
                                            title="View Details"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </Link>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(report.id)}
                                        className="text-red-600 hover:text-red-800"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                            disabled={currentPage === 0}
                            className="px-4 py-2 border border-slate-600 rounded-lg text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-slate-300">
                            Page {currentPage + 1} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                            disabled={currentPage === totalPages - 1}
                            className="px-4 py-2 border border-slate-600 rounded-lg text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                )}
        </div>
    )
}

export default ReportsListPage
