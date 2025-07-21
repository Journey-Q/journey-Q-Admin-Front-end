"use client"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  User,
  Building,
  Navigation,
  Car,
  UserCheck,
  Users,
  Loader2,
  AlertCircle,
  RefreshCw,
  CheckCircle,
  Ban,
  Phone,
  X,
} from "lucide-react"

// Types
interface Provider {
  id: number
  username: string
  email: string
  serviceType: "HOTEL" | "TOUR_GUIDE" | "TRAVEL_AGENT"
  businessRegistrationNumber: string
  address: string
  contactNo: string
  isApproved: boolean | null
  isActive: boolean
  createdAt: string
}

interface DashboardStats {
  totalProviders: number
  approvedProviders: number
  pendingProviders: number
  suspendedProviders: number
  rejectedProviders: number
  hotelCount: number
  tourCount: number
  transportCount: number
}

interface ApiResponse {
  providers: Provider[]
  currentPage: number
  totalItems: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
}

const Providers = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
  const [activeTab, setActiveTab] = useState("approval")
  const [providers, setProviders] = useState<Provider[]>([])
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([])
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const [pageSize] = useState(10)
  const [actionLoading, setActionLoading] = useState<{ [key: number]: string }>({})

  // Get auth token from localStorage
  const getAuthToken = () => {
    return (
      localStorage.getItem("admin_token") ||
      localStorage.getItem("adminToken") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("token") ||
      ""
    )
  }

  // API calls
  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    const token = getAuthToken()
    const baseURL = "https://serviceprovidersservice-production.up.railway.app/admin/auth"

    try {
      const response = await fetch(`${baseURL}${endpoint}`, {
        ...options,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          ...options.headers,
        },
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Network error" }))
        console.error("API error response:", errorData)
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return response.json()
    } catch (err) {
      console.error("API call failed:", err)
      throw err
    }
  }

  // Calculate dashboard stats from providers data
  const calculateDashboardStats = (providersData: Provider[]) => {
    const stats: DashboardStats = {
      totalProviders: providersData.length,
      approvedProviders: 0,
      pendingProviders: 0,
      suspendedProviders: 0,
      rejectedProviders: 0,
      hotelCount: 0,
      tourCount: 0,
      transportCount: 0,
    }

    providersData.forEach((provider) => {
      // Status counts
      if (provider.isApproved === null) {
        stats.pendingProviders++
      } else if (provider.isApproved === false) {
        stats.rejectedProviders++
      } else if (provider.isApproved === true) {
        if (provider.isActive) {
          stats.approvedProviders++
        } else {
          stats.suspendedProviders++
        }
      }

      // Service type counts (only count approved providers)
      if (provider.isApproved === true) {
        switch (provider.serviceType) {
          case "HOTEL":
            stats.hotelCount++
            break
          case "TOUR_GUIDE":
            stats.tourCount++
            break
          case "TRAVEL_AGENT":
            stats.transportCount++
            break
        }
      }
    })

    return stats
  }

  // Fetch dashboard stats from providers data
  const fetchDashboardStats = () => {
    try {
      const calculatedStats = calculateDashboardStats(providers)
      setStats(calculatedStats)
    } catch (err) {
      console.error("Error calculating dashboard stats:", err)
      setError("Failed to calculate dashboard statistics")
    }
  }

  // Mock providers for fallback
  const setMockProviders = () => {
    setProviders([
      {
        id: 1,
        username: "provider1",
        email: "provider1@example.com",
        serviceType: "HOTEL",
        businessRegistrationNumber: "BRN123",
        address: "123 Main St",
        contactNo: "1234567890",
        isApproved: null,
        isActive: true,
        createdAt: "2025-07-20T15:54:00",
      },
      {
        id: 2,
        username: "provider2",
        email: "provider2@example.com",
        serviceType: "TOUR_GUIDE",
        businessRegistrationNumber: "BRN456",
        address: "456 Oak St",
        contactNo: "0987654321",
        isApproved: true,
        isActive: true,
        createdAt: "2025-07-19T10:30:00",
      },
      {
        id: 3,
        username: "provider3",
        email: "provider3@example.com",
        serviceType: "TRAVEL_AGENT",
        businessRegistrationNumber: "BRN789",
        address: "789 Pine St",
        contactNo: "1122334455",
        isApproved: false,
        isActive: false,
        createdAt: "2025-07-18T14:20:00",
      },
    ])
    setTotalPages(1)
    setTotalItems(3)
  }

  // Fetch all providers
  const fetchProviders = async (forceRefresh = false) => {
    if (!forceRefresh) {
      setLoading(true)
    }
    setError(null)
    try {
      const params = new URLSearchParams({
        page: "0", // Always fetch from page 0 to get all data
        size: "1000", // Fetch more data to ensure we get all providers
        ...(searchTerm && { search: searchTerm }),
      })

      const endpoint = "/all_service"
      const data: ApiResponse = await apiCall(`${endpoint}?${params}`)
      console.log("API Response:", data)

      const newProviders = data.providers || []
      setProviders(newProviders)
      setTotalPages(data.totalPages || 0)
      setTotalItems(data.totalItems || 0)

      // Reset to page 0 after actions
      if (forceRefresh) {
        setCurrentPage(0)
      }
    } catch (err) {
      console.error("Error fetching providers:", err)
      setError("Network error. Showing sample data.")
      setMockProviders()
    } finally {
      if (!forceRefresh) {
        setLoading(false)
      }
    }
  }

  // Filter providers on the frontend
  useEffect(() => {
    let filtered = providers

    // Apply tab-based filtering
    if (activeTab === "approval") {
      filtered = filtered.filter((provider) => provider.isApproved === null)
    } else if (activeTab === "existing") {
      filtered = filtered.filter((provider) => provider.isApproved === true)
      if (filterStatus === "approved") {
        filtered = filtered.filter((provider) => provider.isActive)
      } else if (filterStatus === "suspended") {
        filtered = filtered.filter((provider) => !provider.isActive)
      }
    } else if (activeTab === "rejected") {
      filtered = filtered.filter((provider) => provider.isApproved === false)
    }

    // Apply type filter
    if (filterType !== "all") {
      filtered = filtered.filter((provider) => provider.serviceType.toLowerCase() === filterType)
    }

    // Apply search filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (provider) =>
          provider.username.toLowerCase().includes(lowerSearch) ||
          provider.email.toLowerCase().includes(lowerSearch) ||
          provider.businessRegistrationNumber.toLowerCase().includes(lowerSearch),
      )
    }

    setFilteredProviders(filtered)
    setTotalItems(filtered.length)
    setTotalPages(Math.ceil(filtered.length / pageSize))
  }, [providers, activeTab, filterType, filterStatus, searchTerm, pageSize])

  // Provider actions
  const approveProvider = async (providerId: number) => {
    setActionLoading((prev) => ({ ...prev, [providerId]: "approving" }))
    try {
      // Make the API call
      await apiCall(`/providers/${providerId}/approve`, {
        method: "PUT",
      })

      // Clear any previous errors
      setError(null)

      // Immediately update the local state to reflect the change
      setProviders((prevProviders) =>
        prevProviders.map((provider) =>
          provider.id === providerId ? { ...provider, isApproved: true, isActive: true } : provider,
        ),
      )

      // Update selectedProvider if it's the same provider
      if (selectedProvider?.id === providerId) {
        setSelectedProvider((prev) => (prev ? { ...prev, isApproved: true, isActive: true } : null))
      }

      // Also refresh from backend to ensure data consistency
      setTimeout(() => {
        fetchProviders(true)
      }, 500)
    } catch (err) {
      console.error("Error approving provider:", err)
      setError("Failed to approve provider")
      // Refresh data even on error to ensure consistency
      fetchProviders(true)
    } finally {
      setActionLoading((prev) => {
        const { [providerId]: removed, ...rest } = prev
        return rest
      })
    }
  }

  const rejectProvider = async (providerId: number, reason = "") => {
    setActionLoading((prev) => ({ ...prev, [providerId]: "rejecting" }))
    try {
      // Make the API call
      await apiCall(`/providers/${providerId}/reject`, {
        method: "PUT",
        body: JSON.stringify({ reason }),
      })

      // Clear any previous errors
      setError(null)

      // Immediately update the local state to reflect the change
      setProviders((prevProviders) =>
        prevProviders.map((provider) =>
          provider.id === providerId ? { ...provider, isApproved: false, isActive: false } : provider,
        ),
      )

      // Update selectedProvider if it's the same provider
      if (selectedProvider?.id === providerId) {
        setSelectedProvider((prev) => (prev ? { ...prev, isApproved: false, isActive: false } : null))
      }

      // Also refresh from backend to ensure data consistency
      setTimeout(() => {
        fetchProviders(true)
      }, 500)
    } catch (err) {
      console.error("Error rejecting provider:", err)
      setError("Failed to reject provider")
      // Refresh data even on error to ensure consistency
      fetchProviders(true)
    } finally {
      setActionLoading((prev) => {
        const { [providerId]: removed, ...rest } = prev
        return rest
      })
    }
  }

  const suspendProvider = async (providerId: number, reason = "") => {
    setActionLoading((prev) => ({ ...prev, [providerId]: "suspending" }))
    try {
      await apiCall(`/providers/${providerId}/suspend`, {
        method: "PUT",
        body: JSON.stringify({ reason }),
      })

      // Immediately update the local state to reflect the change
      setProviders((prevProviders) =>
        prevProviders.map((provider) => (provider.id === providerId ? { ...provider, isActive: false } : provider)),
      )

      // Update selectedProvider if it's the same provider
      if (selectedProvider?.id === providerId) {
        setSelectedProvider((prev) => (prev ? { ...prev, isActive: false } : null))
      }

      // Also refresh from backend to ensure data consistency
      setTimeout(() => {
        fetchProviders(true)
      }, 500)

      setError(null) // Clear any previous errors
    } catch (err) {
      console.error("Error suspending provider:", err)
      setError("Failed to suspend provider")
      // Refresh data even on error to ensure consistency
      fetchProviders(true)
    } finally {
      setActionLoading((prev) => {
        const { [providerId]: removed, ...rest } = prev
        return rest
      })
    }
  }

  const reactivateProvider = async (providerId: number) => {
    setActionLoading((prev) => ({ ...prev, [providerId]: "reactivating" }))
    try {
      await apiCall(`/providers/${providerId}/reactivate`, {
        method: "PUT",
      })

      // Immediately update the local state to reflect the change
      setProviders((prevProviders) =>
        prevProviders.map((provider) => (provider.id === providerId ? { ...provider, isActive: true } : provider)),
      )

      // Update selectedProvider if it's the same provider
      if (selectedProvider?.id === providerId) {
        setSelectedProvider((prev) => (prev ? { ...prev, isActive: true } : null))
      }

      // Also refresh from backend to ensure data consistency
      setTimeout(() => {
        fetchProviders(true)
      }, 500)

      setError(null) // Clear any previous errors
    } catch (err) {
      console.error("Error reactivating provider:", err)
      setError("Failed to reactivate provider")
      // Refresh data even on error to ensure consistency
      fetchProviders(true)
    } finally {
      setActionLoading((prev) => {
        const { [providerId]: removed, ...rest } = prev
        return rest
      })
    }
  }

  // Effects
  useEffect(() => {
    // Calculate stats whenever providers data changes
    fetchDashboardStats()
  }, [providers])

  useEffect(() => {
    setCurrentPage(0)
  }, [activeTab, filterType, filterStatus, searchTerm])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProviders()
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [searchTerm]) // Removed currentPage dependency to avoid unnecessary calls

  // Helper functions
  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case "HOTEL":
        return "bg-blue-100 text-blue-800"
      case "TOUR_GUIDE":
        return "bg-green-100 text-green-800"
      case "TRAVEL_AGENT":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusBadgeClass = (provider: Provider) => {
    if (provider.isApproved === null) return "bg-yellow-100 text-yellow-800"
    if (provider.isApproved === false) return "bg-red-100 text-red-800"
    if (!provider.isActive) return "bg-orange-100 text-orange-800"
    return "bg-green-100 text-green-800"
  }

  const getStatusText = (provider: Provider) => {
    if (provider.isApproved === null) return "Pending"
    if (provider.isApproved === false) return "Rejected"
    if (!provider.isActive) return "Suspended"
    return "Approved"
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "HOTEL":
        return <Building className="w-4 h-4" />
      case "TOUR_GUIDE":
        return <Navigation className="w-4 h-4" />
      case "TRAVEL_AGENT":
        return <Car className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  const getTypeDisplayName = (type: string) => {
    switch (type) {
      case "HOTEL":
        return "Hotel"
      case "TOUR_GUIDE":
        return "Tour Guide"
      case "TRAVEL_AGENT":
        return "Travel Agent"
      default:
        return type
    }
  }

  const handleViewProvider = (provider: Provider) => {
    setSelectedProvider(provider)
  }

  const handleCloseModal = () => {
    setSelectedProvider(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Check if provider action buttons should be disabled
  const isProviderActionDisabled = (provider: Provider, action: string) => {
    const isLoading = !!actionLoading[provider.id]

    switch (action) {
      case "approve":
        return isLoading || provider.isApproved === true
      case "reject":
        return isLoading || provider.isApproved === false
      case "suspend":
        return isLoading || !provider.isActive
      case "reactivate":
        return isLoading || provider.isActive
      default:
        return isLoading
    }
  }

  // Paginate filtered providers
  const paginatedProviders = filteredProviders.slice(currentPage * pageSize, (currentPage + 1) * pageSize)

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
      {/* Error Alert */}
      {error && (
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-center gap-2 text-red-800">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
            <Button size="sm" variant="outline" onClick={() => setError(null)} className="ml-auto">
              Dismiss
            </Button>
          </div>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-white shadow-lg border-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats?.totalProviders || 0}</p>
              <p className="text-sm text-gray-600">Total Providers</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-lg border-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
              <Building className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats?.hotelCount || 0}</p>
              <p className="text-sm text-gray-600">Hotels</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-lg border-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
              <Navigation className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats?.tourCount || 0}</p>
              <p className="text-sm text-gray-600">Tour Guides</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-lg border-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
              <Car className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats?.transportCount || 0}</p>
              <p className="text-sm text-gray-600">Travel Agents</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Card className="bg-white shadow-lg border-0">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("approval")}
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
              activeTab === "approval"
                ? "text-[#0088cc] border-b-2 border-[#0088cc] bg-[#0088cc]/5"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <UserCheck className="w-5 h-5" />
            Pending Approval
            {stats && stats.pendingProviders > 0 && (
              <Badge className="bg-yellow-100 text-yellow-800 ml-2">{stats.pendingProviders}</Badge>
            )}
          </button>

          <button
            onClick={() => setActiveTab("existing")}
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
              activeTab === "existing"
                ? "text-[#0088cc] border-b-2 border-[#0088cc] bg-[#0088cc]/5"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Users className="w-5 h-5" />
            Approved Providers
            {stats && <Badge className="bg-green-100 text-green-800 ml-2">{stats.approvedProviders}</Badge>}
          </button>

          <button
            onClick={() => setActiveTab("rejected")}
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
              activeTab === "rejected"
                ? "text-[#0088cc] border-b-2 border-[#0088cc] bg-[#0088cc]/5"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <X className="w-5 h-5" />
            Rejected Applications
            {stats && stats.rejectedProviders > 0 && (
              <Badge className="bg-red-100 text-red-800 ml-2">{stats.rejectedProviders}</Badge>
            )}
          </button>
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-4 bg-white shadow-lg border-0">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, email, or business registration..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088cc] focus:border-transparent w-full"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088cc] focus:border-transparent w-[180px]"
          >
            <option value="all">All Types</option>
            <option value="hotel">Hotel</option>
            <option value="tour_guide">Tour Guide</option>
            <option value="travel_agent">Travel Agent</option>
          </select>

          {activeTab === "existing" && (
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088cc] focus:border-transparent w-[180px]"
            >
              <option value="all">All Status</option>
              <option value="approved">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          )}

          <Button onClick={fetchProviders} variant="outline" className="flex items-center gap-2 bg-transparent">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </Card>

      {/* Content */}
      <Card className="p-6 bg-white shadow-lg border-0">
        {activeTab === "approval" && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending Approvals</h3>
            <p className="text-gray-600">Review and approve new service providers</p>
          </div>
        )}

        {activeTab === "existing" && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Approved Providers</h3>
            <p className="text-gray-600">Manage approved service providers</p>
          </div>
        )}

        {activeTab === "rejected" && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Rejected Applications</h3>
            <p className="text-gray-600">View rejected service provider applications</p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#0088cc]" />
            <span className="ml-2 text-gray-600">Loading providers...</span>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium text-gray-900">Provider</th>
                    <th className="text-left p-3 font-medium text-gray-900">Type</th>
                    <th className="text-left p-3 font-medium text-gray-900">Status</th>
                    <th className="text-left p-3 font-medium text-gray-900">Business Reg.</th>
                    <th className="text-left p-3 font-medium text-gray-900">Contact</th>
                    <th className="text-left p-3 font-medium text-gray-900">Date</th>
                    <th className="text-left p-3 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProviders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-gray-500">
                        {activeTab === "approval"
                          ? "No pending approvals"
                          : activeTab === "rejected"
                            ? "No rejected applications"
                            : "No providers found"}
                      </td>
                    </tr>
                  ) : (
                    paginatedProviders.map((provider) => (
                      <tr key={provider.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{provider.username}</p>
                            <p className="text-sm text-gray-500">{provider.email}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className={getTypeBadgeClass(provider.serviceType)}>
                            {getTypeIcon(provider.serviceType)}
                            <span className="ml-1">{getTypeDisplayName(provider.serviceType)}</span>
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge className={getStatusBadgeClass(provider)}>{getStatusText(provider)}</Badge>
                        </td>
                        <td className="p-3">
                          <span className="font-mono text-sm text-gray-700">{provider.businessRegistrationNumber}</span>
                        </td>
                        <td className="p-3">
                          <p className="text-sm text-gray-600">{provider.contactNo}</p>
                        </td>
                        <td className="p-3">
                          <span className="text-sm text-gray-600">{formatDate(provider.createdAt)}</span>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleViewProvider(provider)}>
                              View
                            </Button>

                            {activeTab === "approval" && (
                              <>
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                  onClick={() => approveProvider(provider.id)}
                                  disabled={isProviderActionDisabled(provider, "approve")}
                                >
                                  {actionLoading[provider.id] === "approving" ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : provider.isApproved === true ? (
                                    "Approved"
                                  ) : (
                                    "Approve"
                                  )}
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                  onClick={() => rejectProvider(provider.id)}
                                  disabled={isProviderActionDisabled(provider, "reject")}
                                >
                                  {actionLoading[provider.id] === "rejecting" ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : provider.isApproved === false ? (
                                    "Rejected"
                                  ) : (
                                    "Reject"
                                  )}
                                </Button>
                              </>
                            )}

                            {activeTab === "existing" && (
                              <>
                                {provider.isApproved && provider.isActive && (
                                  <Button
                                    size="sm"
                                    className="bg-red-600 hover:bg-red-700 text-white"
                                    onClick={() => suspendProvider(provider.id)}
                                    disabled={isProviderActionDisabled(provider, "suspend")}
                                  >
                                    {actionLoading[provider.id] === "suspending" ? (
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                      "Suspend"
                                    )}
                                  </Button>
                                )}
                                {provider.isApproved && !provider.isActive && (
                                  <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() => reactivateProvider(provider.id)}
                                    disabled={isProviderActionDisabled(provider, "reactivate")}
                                  >
                                    {actionLoading[provider.id] === "reactivating" ? (
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                      "Reactivate"
                                    )}
                                  </Button>
                                )}
                              </>
                            )}
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
              <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <div className="text-sm text-gray-600">
                  Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, totalItems)} of{" "}
                  {totalItems} providers
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                    disabled={currentPage === 0 || loading}
                  >
                    Previous
                  </Button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(0, Math.min(totalPages - 5, currentPage - 2)) + i
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        disabled={loading}
                      >
                        {pageNum + 1}
                      </Button>
                    )
                  })}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
                    disabled={currentPage >= totalPages - 1 || loading}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Card>

      {/* Provider Details Modal */}
      {selectedProvider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#0088cc]/10 rounded-xl flex items-center justify-center">
                    {getTypeIcon(selectedProvider.serviceType)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedProvider.username}</h2>
                    <p className="text-lg text-gray-600 font-medium">{selectedProvider.email}</p>
                    <Badge className={getStatusBadgeClass(selectedProvider)}>{getStatusText(selectedProvider)}</Badge>
                  </div>
                </div>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Service Type:</span>
                      <Badge className={getTypeBadgeClass(selectedProvider.serviceType)}>
                        {getTypeIcon(selectedProvider.serviceType)}
                        <span className="ml-1">{getTypeDisplayName(selectedProvider.serviceType)}</span>
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Business Reg:</span>
                      <span className="font-mono text-sm font-medium text-gray-800">
                        {selectedProvider.businessRegistrationNumber}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contact:</span>
                      <span className="font-medium flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {selectedProvider.contactNo}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Joined:</span>
                      <span className="font-medium">{formatDate(selectedProvider.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Address</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600 text-sm">Business Address:</span>
                      <p className="text-gray-800 mt-1 leading-relaxed">{selectedProvider.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8 pt-6 border-t">
                {activeTab === "approval" && (
                  <>
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => approveProvider(selectedProvider.id)}
                      disabled={isProviderActionDisabled(selectedProvider, "approve")}
                    >
                      {actionLoading[selectedProvider.id] === "approving" ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : selectedProvider.isApproved === true ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approved
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </>
                      )}
                    </Button>
                    <Button
                      className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => rejectProvider(selectedProvider.id)}
                      disabled={isProviderActionDisabled(selectedProvider, "reject")}
                    >
                      {actionLoading[selectedProvider.id] === "rejecting" ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : selectedProvider.isApproved === false ? (
                        <>
                          <Ban className="w-4 h-4 mr-2" />
                          Rejected
                        </>
                      ) : (
                        <>
                          <Ban className="w-4 h-4 mr-2" />
                          Reject
                        </>
                      )}
                    </Button>
                  </>
                )}

                {activeTab === "existing" && (
                  <>
                    {selectedProvider.isApproved && selectedProvider.isActive && (
                      <Button
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => suspendProvider(selectedProvider.id)}
                        disabled={isProviderActionDisabled(selectedProvider, "suspend")}
                      >
                        {actionLoading[selectedProvider.id] === "suspending" ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                          <Ban className="w-4 h-4 mr-2" />
                        )}
                        Suspend Provider
                      </Button>
                    )}
                    {selectedProvider.isApproved && !selectedProvider.isActive && (
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => reactivateProvider(selectedProvider.id)}
                        disabled={isProviderActionDisabled(selectedProvider, "reactivate")}
                      >
                        {actionLoading[selectedProvider.id] === "reactivating" ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                          <CheckCircle className="w-4 h-4 mr-2" />
                        )}
                        Reactivate Provider
                      </Button>
                    )}
                  </>
                )}

                <Button variant="outline" onClick={handleCloseModal}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Providers
