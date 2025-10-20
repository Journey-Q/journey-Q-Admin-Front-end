"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Trash2,
  Calendar,
  Star,
  X,
  Check,
  Clock,
  Search,
  TrendingUp,
  Users,
  MapPin,
  Plane,
  Building,
  Package,
  ChevronDown,
  ChevronUp,
  DollarSign,
  Zap,
  CheckCircle,
  XCircle,
  MessageSquare,
  FileText,
  Tag,
  RefreshCw,
  AlertCircle,
  Play,
  Pause,
  CreditCard,
  Receipt,
  Hotel,
  Car,
  Utensils,
} from "lucide-react"
import { toast } from "sonner"

// API Configuration
// const API_BASE_URL = 'http://localhost:8080'
const API_BASE_URL = 'https://adminservice-production-19d3.up.railway.app'

const API_ENDPOINTS = {
  getAllPromotions: "/admin/auth/promotions/all",
  getPromotionById: (id) => `/admin/auth/promotions/${id}`,
  getByStatus: (status) => `/admin/auth/promotions/status/${status}`,
  getActive: "/admin/auth/promotions/active",
  approve: (id) => `/admin/auth/promotions/${id}/approve`,
  reject: (id) => `/admin/auth/promotions/${id}/reject`,
  advertise: (id) => `/admin/auth/promotions/${id}/advertise`,
  toggle: (id) => `/admin/auth/promotions/${id}/toggle`,
  update: (id) => `/admin/auth/promotions/${id}`,
  delete: (id) => `/admin/auth/promotions/${id}`,
  bulkApprove: "/admin/auth/promotions/bulk/approve",
  bulkReject: "/admin/auth/promotions/bulk/reject",
  bulkDelete: "/admin/auth/promotions/bulk/delete",
}

const AdminPromotions = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [filterServiceType, setFilterServiceType] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [selectedPromotions, setSelectedPromotions] = useState([])
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [showPromotionDetails, setShowPromotionDetails] = useState({})
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [reviewingPromotion, setReviewingPromotion] = useState(null)
  const [reviewComment, setReviewComment] = useState("")
  const [promotions, setPromotions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Get auth token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('admin_token') ||
           localStorage.getItem('adminToken') ||
           localStorage.getItem('authToken') ||
           localStorage.getItem('accessToken') ||
           localStorage.getItem('token')
  }

  // API Helper function
  const apiCall = async (endpoint, method = "GET", body = null) => {
    const token = getAuthToken()

    let headers = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const config = {
      method,
      headers,
    }

    if (body && method !== "GET") {
      config.body = JSON.stringify(body)
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config)

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Not authenticated. Please login.")
          throw new Error("Authentication required")
        }
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (err) {
      console.error("API call error:", err)
      throw err
    }
  }

  // Fetch all promotions
  const fetchPromotions = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiCall(API_ENDPOINTS.getAllPromotions)
      setPromotions(data.promotions || [])
    } catch (err) {
      setError(err.message || "Failed to fetch promotions")
      console.error("Error fetching promotions:", err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch promotions by status
  const fetchPromotionsByStatus = async (status) => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiCall(API_ENDPOINTS.getByStatus(status))
      setPromotions(data.promotions || [])
    } catch (err) {
      setError(err.message || "Failed to fetch promotions")
      console.error("Error fetching promotions by status:", err)
    } finally {
      setLoading(false)
    }
  }

  // Load promotions on mount and when activeTab changes
  useEffect(() => {
    if (activeTab === "all") {
      fetchPromotions()
    } else if (activeTab === "pending") {
      fetchPromotionsByStatus("REQUESTED")
    } else if (activeTab === "approved") {
      fetchPromotionsByStatus("APPROVED")
    } else if (activeTab === "advertised") {
      fetchPromotionsByStatus("ADVERTISED")
    } else if (activeTab === "rejected") {
      fetchPromotionsByStatus("REJECTED")
    }
  }, [activeTab])

  // Approve promotion
  const handleApprove = async (id) => {
    try {
      const result = await apiCall(API_ENDPOINTS.approve(id), "PUT")

      // Update local state
      setPromotions((prev) =>
        prev.map((promo) => (promo.id === id ? { ...promo, status: "APPROVED" } : promo))
      )

      toast.success("Promotion approved successfully!")
    } catch (err) {
      toast.error("Failed to approve promotion: " + err.message)
    }
  }

  // Reject promotion
  const handleReject = async (id) => {
    try {
      const result = await apiCall(API_ENDPOINTS.reject(id), "PUT")

      // Update local state
      setPromotions((prev) =>
        prev.map((promo) => (promo.id === id ? { ...promo, status: "REJECTED" } : promo))
      )

      toast.success("Promotion rejected successfully!")
    } catch (err) {
      toast.error("Failed to reject promotion: " + err.message)
    }
  }

  // Advertise promotion
  const handleAdvertise = async (id) => {
    try {
      const result = await apiCall(API_ENDPOINTS.advertise(id), "PUT")

      // Update local state
      setPromotions((prev) =>
        prev.map((promo) => (promo.id === id ? { ...promo, status: "ADVERTISED" } : promo))
      )

      toast.success("Promotion advertised successfully!")
    } catch (err) {
      toast.error("Failed to advertise promotion: " + err.message)
    }
  }

  // Toggle active status
  const handleToggle = async (id) => {
    try {
      const result = await apiCall(API_ENDPOINTS.toggle(id), "PUT")

      // Update local state
      setPromotions((prev) =>
        prev.map((promo) => (promo.id === id ? { ...promo, isActive: !promo.isActive } : promo))
      )

      toast.success("Promotion status toggled successfully!")
    } catch (err) {
      toast.error("Failed to toggle promotion: " + err.message)
    }
  }

  // Delete promotion
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this promotion?")) return

    try {
      await apiCall(API_ENDPOINTS.delete(id), "DELETE")

      // Remove from local state
      setPromotions((prev) => prev.filter((promo) => promo.id !== id))

      toast.success("Promotion deleted successfully!")
    } catch (err) {
      toast.error("Failed to delete promotion: " + err.message)
    }
  }

  // Review modal functions
  const handleReviewClick = (promotion) => {
    setReviewingPromotion(promotion)
    setReviewComment("")
    setShowReviewModal(true)
  }

  const handleReviewSubmit = async (action) => {
    if (action === "approved") {
      await handleApprove(reviewingPromotion.id)
    } else {
      await handleReject(reviewingPromotion.id)
    }
    setShowReviewModal(false)
    setReviewingPromotion(null)
    setReviewComment("")
  }

  // Bulk actions
  const handleBulkApprove = async () => {
    try {
      await apiCall(API_ENDPOINTS.bulkApprove, "PUT", { promotionIds: selectedPromotions })

      // Update local state
      setPromotions((prev) =>
        prev.map((promo) => (selectedPromotions.includes(promo.id) ? { ...promo, status: "APPROVED" } : promo))
      )

      setSelectedPromotions([])
      toast.success(`${selectedPromotions.length} promotions approved!`)
    } catch (err) {
      toast.error("Failed to bulk approve: " + err.message)
    }
  }

  const handleBulkReject = async () => {
    try {
      await apiCall(API_ENDPOINTS.bulkReject, "PUT", { promotionIds: selectedPromotions })

      // Update local state
      setPromotions((prev) =>
        prev.map((promo) => (selectedPromotions.includes(promo.id) ? { ...promo, status: "REJECTED" } : promo))
      )

      setSelectedPromotions([])
      toast.success(`${selectedPromotions.length} promotions rejected!`)
    } catch (err) {
      toast.error("Failed to bulk reject: " + err.message)
    }
  }

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedPromotions.length} promotions?`)) return

    try {
      await apiCall(API_ENDPOINTS.bulkDelete, "DELETE", { promotionIds: selectedPromotions })

      // Remove from local state
      setPromotions((prev) => prev.filter((promo) => !selectedPromotions.includes(promo.id)))

      setSelectedPromotions([])
      toast.success(`${selectedPromotions.length} promotions deleted!`)
    } catch (err) {
      toast.error("Failed to bulk delete: " + err.message)
    }
  }

  // Service type configurations
  const serviceConfigs = {
    HOTEL: {
      icon: Hotel,
      name: "Hotels & Accommodation",
      color: "#0088cc",
    },
    TRAVEL: {
      icon: Plane,
      name: "Travel Services",
      color: "#10b981",
    },
    TOUR: {
      icon: Package,
      name: "Tour Packages",
      color: "#8b5cf6",
    },
    TOUR_GUIDE: {
      icon: MapPin,
      name: "Tour Guide",
      color: "#3b82f6",
    },
    RESTAURANT: {
      icon: Utensils,
      name: "Restaurants & Dining",
      color: "#f59e0b",
    },
    VEHICLE: {
      icon: Car,
      name: "Transportation",
      color: "#ef4444",
    },
    PRODUCT: {
      icon: Package,
      name: "Product",
      color: "#f97316",
    },
  }

  // Filter and sort logic
  const filteredPromotions = promotions.filter((promotion) => {
    // Search filter
    const matchesSearch = searchTerm === "" ||
      promotion.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promotion.description?.toLowerCase().includes(searchTerm.toLowerCase())

    // Service type filter
    const matchesServiceType = filterServiceType === "all" ||
      promotion.serviceProviderType === filterServiceType

    return matchesSearch && matchesServiceType
  })

  const sortedPromotions = [...filteredPromotions].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      case "oldest":
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
      case "discount":
        return (b.discount || 0) - (a.discount || 0)
      case "payment":
        return (b.paymentAmount || 0) - (a.paymentAmount || 0)
      default:
        return 0
    }
  })

  // Statistics
  const stats = {
    total: promotions.length,
    pending: promotions.filter((p) => p.status === "REQUESTED").length,
    approved: promotions.filter((p) => p.status === "APPROVED").length,
    advertised: promotions.filter((p) => p.status === "ADVERTISED").length,
    rejected: promotions.filter((p) => p.status === "REJECTED").length,
    totalRevenue: promotions.reduce((sum, p) => sum + (p.paymentAmount || 0), 0),
    paidPromotions: promotions.filter((p) => p.isPaid).length,
  }

  // Helper functions
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-blue-100 text-blue-800"
      case "ADVERTISED":
        return "bg-green-100 text-green-800"
      case "REQUESTED":
        return "bg-yellow-100 text-yellow-800"
      case "REJECTED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getServiceIcon = (type) => {
    const IconComponent = serviceConfigs[type]?.icon || Package
    return <IconComponent className="w-4 h-4" />
  }

  const getServiceColor = (type) => {
    return serviceConfigs[type]?.color || "#6b7280"
  }

  const togglePromotionDetails = (promotionId) => {
    setShowPromotionDetails((prev) => ({
      ...prev,
      [promotionId]: !prev[promotionId],
    }))
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatCurrency = (amount) => {
    if (!amount) return "$0"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
      {/* Header */}
      <Card className="p-6 bg-white shadow-lg border-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0088cc]/10 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-[#0088cc]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Promotions Dashboard</h1>
              <p className="text-gray-600">Review and manage promotional campaigns from service providers</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-yellow-100 text-yellow-800">{stats.pending} Pending Review</Badge>
            <Button onClick={fetchPromotions} variant="outline" size="sm">
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <Card className="p-6 bg-white shadow-lg border-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0088cc]/10 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-[#0088cc]" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Promotions</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-lg border-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.pending}</p>
              <p className="text-sm text-gray-600">Requested</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-lg border-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <Check className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.approved}</p>
              <p className="text-sm text-gray-600">Approved</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-lg border-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.advertised}</p>
              <p className="text-sm text-gray-600">Advertised</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-lg border-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
              <p className="text-sm text-gray-600">Total Revenue</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-lg border-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.paidPromotions}</p>
              <p className="text-sm text-gray-600">Paid Promotions</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Card className="bg-white shadow-lg border-0">
        <div className="flex border-b overflow-x-auto">
          {[
            { id: "pending", label: "Pending Review", count: stats.pending, color: "text-yellow-600" },
            { id: "approved", label: "Approved", count: stats.approved, color: "text-blue-600" },
            { id: "advertised", label: "Advertised", count: stats.advertised, color: "text-green-600" },
            { id: "rejected", label: "Rejected", count: stats.rejected, color: "text-red-600" },
            { id: "all", label: "All Promotions", count: stats.total, color: "text-gray-600" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-[#0088cc] border-b-2 border-[#0088cc] bg-[#0088cc]/5"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <span>{tab.label}</span>
              <Badge
                className={`ml-2 ${activeTab === tab.id ? "bg-[#0088cc] text-white" : "bg-gray-200 text-gray-600"}`}
              >
                {tab.count}
              </Badge>
            </button>
          ))}
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-4 bg-white shadow-lg border-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search promotions, providers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-80 focus:ring-2 focus:ring-[#0088cc] focus:border-transparent"
              />
            </div>

            <select
              value={filterServiceType}
              onChange={(e) => setFilterServiceType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088cc] focus:border-transparent"
            >
              <option value="all">All Service Types</option>
              {Object.entries(serviceConfigs).map(([key, config]) => (
                <option key={key} value={key}>
                  {config.name}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088cc] focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="discount">Highest Discount</option>
              <option value="payment">Highest Payment</option>
            </select>
          </div>

          {selectedPromotions.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{selectedPromotions.length} selected</span>
              <Button variant="outline" onClick={() => setShowBulkActions(!showBulkActions)}>
                Bulk Actions
              </Button>
            </div>
          )}
        </div>

        {showBulkActions && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg flex space-x-2">
            <Button onClick={handleBulkApprove} className="bg-[#0088cc] hover:bg-blue-700 text-white">
              Approve All
            </Button>
            <Button onClick={handleBulkReject} className="bg-red-500 hover:bg-red-600 text-white">
              Reject All
            </Button>
            <Button onClick={handleBulkDelete} className="bg-gray-500 hover:bg-gray-600 text-white">
              Delete All
            </Button>
          </div>
        )}
      </Card>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 text-[#0088cc] animate-spin" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <Card className="p-6 mb-6 bg-red-50 border-red-200">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-900">Error loading promotions</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Promotions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading && sortedPromotions.map((promotion) => {
          return (
            <Card
              key={promotion.id}
              className="bg-white shadow-lg border-0 overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Selection Checkbox */}
              <div className="absolute top-4 left-4 z-10">
                <input
                  type="checkbox"
                  checked={selectedPromotions.includes(promotion.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPromotions((prev) => [...prev, promotion.id])
                    } else {
                      setSelectedPromotions((prev) => prev.filter((id) => id !== promotion.id))
                    }
                  }}
                  className="w-4 h-4 text-[#0088cc] border-gray-300 rounded focus:ring-[#0088cc]"
                />
              </div>

              {/* Image */}
              <div className="relative h-48">
                <img
                  src={promotion.image || "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=250&fit=crop"}
                  alt={promotion.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <Badge className={getStatusBadgeClass(promotion.status)}>
                    {promotion.status === "REQUESTED" ? "PENDING" : promotion.status}
                  </Badge>
                </div>

                {/* Discount Badge */}
                <div className="absolute top-3 left-12">
                  <Badge className="bg-red-500 text-white">{promotion.discount || 0}% OFF</Badge>
                </div>

                {/* Service Type Badge */}
                <div className="absolute bottom-3 left-3">
                  <Badge
                    className="text-white flex items-center space-x-1"
                    style={{ backgroundColor: getServiceColor(promotion.serviceProviderType) }}
                  >
                    {getServiceIcon(promotion.serviceProviderType)}
                    <span className="capitalize">{promotion.serviceProviderType?.toLowerCase() || "Service"}</span>
                  </Badge>
                </div>

                {/* Payment Status Badge */}
                {promotion.isPaid && (
                  <div className="absolute bottom-3 right-3">
                    <Badge className="bg-green-600 text-white flex items-center space-x-1">
                      <CreditCard className="w-3 h-3" />
                      <span>Paid</span>
                    </Badge>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{promotion.title}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => togglePromotionDetails(promotion.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showPromotionDetails[promotion.id] ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{promotion.description}</p>

                {/* Provider and Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Building className="w-4 h-4" />
                    <span className="font-medium">{promotion.serviceProviderName || `Provider #${promotion.serviceProviderId}`}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>Submitted: {formatDate(promotion.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Valid: {formatDate(promotion.validFrom)} - {formatDate(promotion.validTo)}</span>
                  </div>
                </div>

                {/* Detailed Information (Collapsible) */}
                {showPromotionDetails[promotion.id] && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Service Provider ID:</span>
                      <span className="font-medium">#{promotion.serviceProviderId}</span>
                    </div>

                    {/* Payment Information */}
                    {promotion.isPaid && (
                      <>
                        <div className="border-t pt-2 mt-2">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <Receipt className="w-4 h-4 mr-1" />
                            Payment Details
                          </h4>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Payment Amount:</span>
                          <span className="font-medium text-green-600">{formatCurrency(promotion.paymentAmount)}</span>
                        </div>
                        {promotion.paymentPlan && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Plan:</span>
                            <span className="font-medium capitalize">{promotion.paymentPlan}</span>
                          </div>
                        )}
                        {promotion.advertisementDuration && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Duration:</span>
                            <span className="font-medium">{promotion.advertisementDuration}</span>
                          </div>
                        )}
                        {promotion.transactionId && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Transaction ID:</span>
                            <span className="font-mono text-xs">{promotion.transactionId.substring(0, 16)}...</span>
                          </div>
                        )}
                        {promotion.paymentReferenceNumber && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Reference:</span>
                            <span className="font-mono text-xs">{promotion.paymentReferenceNumber}</span>
                          </div>
                        )}
                        {promotion.paymentDate && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Payment Date:</span>
                            <span className="font-medium">{formatDate(promotion.paymentDate)}</span>
                          </div>
                        )}
                        {promotion.cardLastFourDigits && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Card:</span>
                            <span className="font-medium">****{promotion.cardLastFourDigits}</span>
                          </div>
                        )}
                        {promotion.cardholderName && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Cardholder:</span>
                            <span className="font-medium">{promotion.cardholderName}</span>
                          </div>
                        )}
                      </>
                    )}

                    {promotion.reviewComment && (
                      <div className="text-sm border-t pt-2 mt-2">
                        <span className="text-gray-600">Admin Comment:</span>
                        <p className="text-gray-800 mt-1">{promotion.reviewComment}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Actions based on status */}
                <div className="space-y-2">
                  {promotion.status === "REQUESTED" && (
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleReviewClick(promotion)}
                        className="flex-1 bg-[#0088cc] hover:bg-blue-700 text-white flex items-center justify-center space-x-1"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Review</span>
                      </Button>
                      <Button
                        onClick={() => handleApprove(promotion.id)}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center space-x-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Quick Approve</span>
                      </Button>
                    </div>
                  )}

                  {promotion.status === "APPROVED" && (
                    <div className="w-full bg-blue-50 border border-blue-200 text-blue-800 px-3 py-2 rounded-lg text-center text-sm font-medium">
                      <Check className="w-4 h-4 inline mr-1" />
                      {promotion.isPaid
                        ? "Approved & Paid - Ready to Advertise"
                        : "Approved - Awaiting Payment from Provider"}
                    </div>
                  )}

                  {promotion.status === "ADVERTISED" && (
                    <div className="w-full bg-green-50 border border-green-200 text-green-800 px-3 py-2 rounded-lg text-center text-sm font-medium">
                      <Zap className="w-4 h-4 inline mr-1" />
                      {promotion.isActive ? "Live Campaign - Active" : "Campaign Paused"}
                    </div>
                  )}

                  {promotion.status === "REJECTED" && (
                    <div className="w-full bg-red-50 border border-red-200 text-red-800 px-3 py-2 rounded-lg text-center text-sm font-medium">
                      <XCircle className="w-4 h-4 inline mr-1" />
                      Rejected - Provider Can Resubmit
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => handleReviewClick(promotion)}
                      className="flex-1 flex items-center justify-center space-x-1"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Details</span>
                    </Button>

                    {promotion.status === "ADVERTISED" && (
                      <Button
                        onClick={() => handleToggle(promotion.id)}
                        className={`flex-1 flex items-center justify-center space-x-1 ${
                          promotion.isActive
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                      >
                        {promotion.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        <span>{promotion.isActive ? "Pause" : "Resume"}</span>
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      onClick={() => handleDelete(promotion.id)}
                      className="bg-red-100 text-red-700 hover:bg-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Empty state */}
      {!loading && sortedPromotions.length === 0 && (
        <Card className="p-12 bg-white shadow-lg border-0 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No promotions found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || filterServiceType !== "all"
              ? "Try adjusting your filters or search terms."
              : `No ${activeTab === "all" ? "" : activeTab} promotions available.`}
          </p>
        </Card>
      )}

      {/* Review Modal */}
      {showReviewModal && reviewingPromotion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Review Promotion</h2>
                <Button
                  variant="ghost"
                  onClick={() => setShowReviewModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Promotion Details */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={reviewingPromotion.image || "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=250&fit=crop"}
                    alt={reviewingPromotion.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{reviewingPromotion.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{reviewingPromotion.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Building className="w-4 h-4" />
                        <span>{reviewingPromotion.serviceProviderName || `Provider #${reviewingPromotion.serviceProviderId}`}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        {getServiceIcon(reviewingPromotion.serviceProviderType)}
                        <span>{reviewingPromotion.serviceProviderType || "Service"}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Tag className="w-4 h-4" />
                        <span>{reviewingPromotion.discount}% OFF</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Service Provider ID</label>
                    <p className="text-gray-900">#{reviewingPromotion.serviceProviderId}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Service Type</label>
                    <p className="text-gray-900 capitalize">
                      {reviewingPromotion.serviceProviderType?.toLowerCase() || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Submitted Date</label>
                    <p className="text-gray-900">{formatDate(reviewingPromotion.createdAt)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Payment Status</label>
                    <p className="text-gray-900">
                      {reviewingPromotion.isPaid ? (
                        <Badge className="bg-green-100 text-green-800">Paid - {formatCurrency(reviewingPromotion.paymentAmount)}</Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800">Not Paid</Badge>
                      )}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Valid From</label>
                    <p className="text-gray-900">{formatDate(reviewingPromotion.validFrom)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Valid To</label>
                    <p className="text-gray-900">{formatDate(reviewingPromotion.validTo)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Discount</label>
                    <p className="text-gray-900">{reviewingPromotion.discount}%</p>
                  </div>
                  {reviewingPromotion.paymentPlan && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Payment Plan</label>
                      <p className="text-gray-900 capitalize">{reviewingPromotion.paymentPlan}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Information */}
              {reviewingPromotion.isPaid && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Receipt className="w-4 h-4 mr-2" />
                    Payment Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    {reviewingPromotion.transactionId && (
                      <div>
                        <span className="text-gray-600">Transaction ID:</span>
                        <p className="font-mono text-xs mt-1">{reviewingPromotion.transactionId}</p>
                      </div>
                    )}
                    {reviewingPromotion.paymentReferenceNumber && (
                      <div>
                        <span className="text-gray-600">Reference Number:</span>
                        <p className="font-mono text-xs mt-1">{reviewingPromotion.paymentReferenceNumber}</p>
                      </div>
                    )}
                    {reviewingPromotion.cardLastFourDigits && (
                      <div>
                        <span className="text-gray-600">Card:</span>
                        <p className="mt-1">****{reviewingPromotion.cardLastFourDigits}</p>
                      </div>
                    )}
                    {reviewingPromotion.cardholderName && (
                      <div>
                        <span className="text-gray-600">Cardholder:</span>
                        <p className="mt-1">{reviewingPromotion.cardholderName}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Review Comment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Review Comment (Optional)
                </label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088cc] focus:border-transparent resize-none"
                  placeholder="Add a comment about your review decision..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4 border-t border-gray-200">
                <Button variant="outline" onClick={() => setShowReviewModal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={() => handleReviewSubmit("rejected")}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white flex items-center justify-center space-x-2"
                >
                  <XCircle className="w-5 h-5" />
                  <span>Reject</span>
                </Button>
                <Button
                  onClick={() => handleReviewSubmit("approved")}
                  className="flex-1 bg-[#0088cc] hover:bg-blue-700 text-white flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Approve</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Summary */}
      <Card className="p-6 bg-white shadow-lg border-0">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-[#0088cc]/10 rounded-xl mx-auto mb-2 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#0088cc]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-600">Total Submissions</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl mx-auto mb-2 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
            <p className="text-sm text-gray-600">Total Revenue</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-xl mx-auto mb-2 flex items-center justify-center">
              <Users className="w-6 h-6 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{Object.keys(serviceConfigs).length}</p>
            <p className="text-sm text-gray-600">Service Types</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl mx-auto mb-2 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.paidPromotions}</p>
            <p className="text-sm text-gray-600">Paid Promotions</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default AdminPromotions
