import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../../services/api'
import { Search, Plus, Edit, Trash2, Eye, Filter, Download } from 'lucide-react'

const PatientsPage = () => {
    const [patients, setPatients] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState('ALL')
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [showAddModal, setShowAddModal] = useState(false)

    useEffect(() => {
        fetchPatients()
    }, [currentPage, filterStatus])

    const fetchPatients = async () => {
        try {
            setLoading(true)
            const response = await apiClient.get(`/patients?page=${currentPage}&size=10`)

            // Handle both List (current backend) and Page (future backend) responses
            if (Array.isArray(response.data)) {
                setPatients(response.data)
                setTotalPages(1)
            } else {
                setPatients(response.data.content || [])
                setTotalPages(response.data.totalPages || 0)
            }
            setLoading(false)
        } catch (error) {
            console.error('Error fetching patients:', error)
            setLoading(false)
        }
    }

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            fetchPatients()
            return
        }
        try {
            setLoading(true)
            const response = await apiClient.get(`/patients/search?query=${searchTerm}`)
            setPatients(response.data || [])
            setLoading(false)
        } catch (error) {
            console.error('Error searching patients:', error)
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this patient?')) return

        try {
            await apiClient.delete(`/patients/${id}`)
            fetchPatients()
        } catch (error) {
            console.error('Error deleting patient:', error)
            alert('Failed to delete patient')
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <header className="rounded-2xl border border-slate-700 bg-slate-800/60 p-6 backdrop-blur-md">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-100">Patient Management</h1>
                        <p className="mt-1 text-slate-400">Manage and view all patient records</p>
                    </div>
                    <Link
                        to="/patients/new"
                        className="inline-flex items-center rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:shadow-lg hover:shadow-cyan-900/40"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Add Patient
                    </Link>
                </div>
            </header>

            <div className="space-y-6">
                {/* Search and Filter */}
                <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-6 backdrop-blur-md">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search patients by name, email, or phone..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-900/60 border border-slate-700 text-slate-200 placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                />
                                <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-500" />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="flex-1 px-4 py-2 rounded-lg bg-slate-900/60 border border-slate-700 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            >
                                <option value="ALL">All Status</option>
                                <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">Inactive</option>
                            </select>
                            <button
                                onClick={handleSearch}
                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white transition hover:shadow-lg hover:shadow-cyan-900/40"
                            >
                                <Filter className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Patients Table */}
                <div className="rounded-xl border border-slate-700 bg-slate-800/60 overflow-hidden backdrop-blur-md">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-700">
                            <thead className="bg-slate-900/60">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                                        Patient
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                                        Date of Birth
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                                        Gender
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                                        Contact
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {patients.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                                            No patients found
                                        </td>
                                    </tr>
                                ) : (
                                    patients.map((patient) => (
                                        <tr key={patient.id} className="bg-slate-800/40 hover:bg-slate-700/40 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center">
                                                        <span className="text-white font-semibold text-sm">
                                                            {patient.firstName?.[0]}{patient.lastName?.[0]}
                                                        </span>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-slate-100">
                                                            {patient.firstName} {patient.lastName}
                                                        </div>
                                                        <div className="text-sm text-slate-400">{patient.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                                {patient.dob ? new Date(patient.dob).toLocaleDateString() : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                                {patient.gender}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                                {patient.phone || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    patient.status === 'ACTIVE'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {patient.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex gap-3">
                                                    <Link
                                                        to={`/patients/${patient.id}`}
                                                        className="text-cyan-400 hover:text-cyan-300 transition-colors"
                                                        title="View"
                                                    >
                                                        <Eye className="w-5 h-5" />
                                                    </Link>
                                                    <Link
                                                        to={`/patients/${patient.id}/edit`}
                                                        className="text-blue-400 hover:text-blue-300 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-5 h-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(patient.id)}
                                                        className="text-red-400 hover:text-red-300 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="px-4 py-3 flex items-center justify-between border-t border-slate-700 sm:px-6">
                            <div className="flex-1 flex justify-between sm:hidden">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                                    disabled={currentPage === 0}
                                    className="relative inline-flex items-center px-4 py-2 border border-slate-600 text-sm font-medium rounded-md text-slate-300 bg-slate-800 hover:bg-slate-700 disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                                    disabled={currentPage === totalPages - 1}
                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-slate-600 text-sm font-medium rounded-md text-slate-300 bg-slate-800 hover:bg-slate-700 disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <p className="text-sm text-slate-400">
                                    Page <span className="font-medium text-slate-200">{currentPage + 1}</span> of{' '}
                                    <span className="font-medium text-slate-200">{totalPages}</span>
                                </p>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                                        disabled={currentPage === 0}
                                        className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-slate-600 bg-slate-800 text-sm font-medium text-slate-300 hover:bg-slate-700 disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                                        disabled={currentPage === totalPages - 1}
                                        className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-slate-600 bg-slate-800 text-sm font-medium text-slate-300 hover:bg-slate-700 disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </nav>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PatientsPage
