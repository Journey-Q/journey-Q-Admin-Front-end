"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Shield, Trash2, Edit, Users, Eye, Mail, Calendar, X, Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { toast } from "sonner"

const AddAdmin = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [admins, setAdmins] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingAdmins, setLoadingAdmins] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [showEditModal, setShowEditModal] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState(null)
  const [editForm, setEditForm] = useState({
    username: "",
    email: "",
  })

  // Get the auth token from localStorage - matching your login component
  const getAuthToken = () => {
    return localStorage.getItem('admin_token') || 
           localStorage.getItem('adminToken') || 
           localStorage.getItem('authToken') || 
           localStorage.getItem('accessToken') ||
           localStorage.getItem('token')
  }

  // API Base URL - matching your login component
  const API_BASE_URL = 'https://serviceprovidersservice-production.up.railway.app/admin';
    // const API_BASE_URL = 'http://localhost:8080/admin';


  // Fetch all admins on component mount
  useEffect(() => {
    const token = getAuthToken()
    setIsAuthenticated(!!token)
    fetchAdmins()
  }, [])

  const fetchAdmins = async () => {
    try {
      setLoadingAdmins(true)
      const token = getAuthToken()
      
      // Try to fetch admins with token first, if no token, show mock data or try without auth
      let headers = {
        'Content-Type': 'application/json',
      }
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await fetch(`${API_BASE_URL}/auth/all`, {
        method: 'GET',
        headers: headers,
      })

      if (response.ok) {
        const data = await response.json()
        setAdmins(data.admins || [])
        setError("")
        setIsAuthenticated(true)
      } else if (response.status === 401) {
        // If unauthorized, show mock data but disable creation functionality
        setError("Not authenticated. Please login to create new admins.")
        setIsAuthenticated(false)
        setMockAdmins()
      } else {
        const errorData = await response.json()
        setError(errorData.message || "Failed to fetch admins")
        setMockAdmins()
      }
    } catch (err) {
      console.error('Error fetching admins:', err)
      setError("Network error. Showing sample data.")
      setMockAdmins()
    } finally {
      setLoadingAdmins(false)
    }
  }

  // Fallback mock data when API is not available or not authenticated
  const setMockAdmins = () => {
    setAdmins([
      {
        id: 1,
        username: "admin",
        email: "admin@serviceproviders.com",
        role: "ADMIN",
        isActive: true,
        createdAt: "2024-02-20T10:30:00",
      },
      {
        id: 2,
        username: "sarah_admin",
        email: "sarah@company.com",
        role: "ADMIN",
        isActive: true,
        createdAt: "2024-03-10T14:20:00",
      },
      {
        id: 3,
        username: "mike_admin",
        email: "mike@company.com",
        role: "ADMIN",
        isActive: false,
        createdAt: "2024-04-05T09:15:00",
      },
    ])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    const token = getAuthToken()
    
    if (!token) {
      setError("Authentication required. Please login to create admin accounts.")
      return
    }

    // Validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all required fields")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    try {
      setLoading(true)

      const response = await fetch(`${API_BASE_URL}/auth/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          isActive: true
        }),
      })

      if (response.ok) {
        const data = await response.json()
        toast.success("Admin account created successfully!")
        setFormData({ username: "", email: "", password: "", confirmPassword: "" })
        
        // Refresh the admin list
        await fetchAdmins()
      } else {
        const errorData = await response.json()
        
        // Handle validation errors
        if (errorData.username || errorData.email || errorData.password) {
          const errors = []
          if (errorData.username) errors.push(errorData.username)
          if (errorData.email) errors.push(errorData.email)
          if (errorData.password) errors.push(errorData.password)
          toast.error(errors.join(", "))
        } else {
          toast.error(errorData.message || "Failed to create admin account")
        }
      }
    } catch (err) {
      console.error('Error creating admin:', err)
      toast.error("Network error. Please check your connection.")
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (adminId: number, isActive: boolean) => {
    const token = getAuthToken()
    
    if (!token) {
      setError("Authentication required. Please login to manage admin accounts.")
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/${adminId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive }),
      })

      if (response.ok) {
        toast.success(`Admin account ${isActive ? 'activated' : 'deactivated'} successfully!`)
        await fetchAdmins()
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || "Failed to update admin status")
      }
    } catch (err) {
      console.error('Error updating admin status:', err)
      toast.error("Network error. Please check your connection.")
    }
  }

  const handleEditAdmin = (admin) => {
    setEditingAdmin(admin)
    setEditForm({
      username: admin.username,
      email: admin.email,
    })
    setShowEditModal(true)
  }

  const handleUpdateAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    // Note: You'll need to implement update endpoint in backend
    setError("Admin update functionality not yet implemented in backend")
  }

  const handleCancelEdit = () => {
    setShowEditModal(false)
    setEditingAdmin(null)
    setEditForm({ username: "", email: "" })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getInitials = (username: string) => {
    return username
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
      {/* Header */}
      <Card className="p-6 bg-white shadow-lg border-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0088cc]/10 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-[#0088cc]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Management</h1>
              <p className="text-gray-600">Create and manage admin accounts</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {isAuthenticated && (
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Authenticated
              </Badge>
            )}
            <Badge className="bg-[#0088cc]/10 text-[#0088cc]">
              {loadingAdmins ? "Loading..." : `${admins.length} Total Admins`}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Error Messages */}
      {error && (
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Add New Admin Form */}
        <div className="xl:col-span-1">
          <Card className="p-6 shadow-lg border-0 bg-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-[#0088cc]/10 rounded-lg flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-[#0088cc]" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">Add New Admin</h2>
                {!isAuthenticated && (
                  <p className="text-sm text-amber-600">Login required to create admins</p>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                  Username *
                </Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Enter username"
                  className="focus:ring-2 focus:ring-[#0088cc] focus:border-transparent"
                  required
                  disabled={loading || !isAuthenticated}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="admin@company.com"
                  className="focus:ring-2 focus:ring-[#0088cc] focus:border-transparent"
                  required
                  disabled={loading || !isAuthenticated}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password *
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Minimum 6 characters"
                  className="focus:ring-2 focus:ring-[#0088cc] focus:border-transparent"
                  required
                  disabled={loading || !isAuthenticated}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm Password *
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirm password"
                  className="focus:ring-2 focus:ring-[#0088cc] focus:border-transparent"
                  required
                  disabled={loading || !isAuthenticated}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#0088cc] hover:bg-blue-700 text-white"
                disabled={loading || !isAuthenticated}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : !isAuthenticated ? (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Login Required to Create Admin
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create Admin Account
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>

        {/* Existing Admins List */}
        <div className="xl:col-span-2">
          <Card className="p-6 shadow-lg border-0 bg-white">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Admin Accounts</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchAdmins}
                  disabled={loadingAdmins}
                >
                  {loadingAdmins ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Refresh"
                  )}
                </Button>
                <Badge className="bg-blue-100 text-blue-800">{admins.length} Total</Badge>
              </div>
            </div>

            {loadingAdmins ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[#0088cc]" />
                <p className="text-gray-500">Loading admin accounts...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {admins.map((admin) => (
                  <Card
                    key={admin.id}
                    className="p-4 bg-gradient-to-r from-gray-50 to-white border border-gray-200 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                          {getInitials(admin.username)}
                        </div>

                        <div className="flex-1">
                          {/* Name and Status */}
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900 text-lg">{admin.username}</h3>
                            <Badge 
                              className={admin.isActive 
                                ? "bg-green-100 text-green-800" 
                                : "bg-red-100 text-red-800"
                              }
                            >
                              {admin.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>

                          {/* Email */}
                          <div className="flex items-center gap-2 mb-3">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{admin.email}</span>
                          </div>

                          {/* Dates */}
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>Created: {formatDate(admin.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>Role: {admin.role}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                     
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusUpdate(admin.id, !admin.isActive)}
                          className={admin.isActive 
                            ? "hover:bg-red-50 hover:border-red-300 text-red-600"
                            : "hover:bg-green-50 hover:border-green-300 text-green-600"
                          }
                          disabled={loading || !isAuthenticated}
                        >
                          {admin.isActive ? (
                            <Trash2 className="w-4 h-4" />
                          ) : (
                            <UserPlus className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}

                {admins.length === 0 && !loadingAdmins && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No admin accounts yet</h3>
                    <p className="text-gray-500">Create your first admin account to get started.</p>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Edit Admin Modal */}
      {showEditModal && editingAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Edit Admin Account</h2>
                <Button variant="ghost" onClick={handleCancelEdit}>
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-700">
                  Note: Admin editing functionality requires additional backend endpoints.
                </p>
              </div>

              <form onSubmit={handleUpdateAdmin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="edit-username" className="text-sm font-medium text-gray-700">
                    Username *
                  </Label>
                  <Input
                    id="edit-username"
                    value={editForm.username}
                    onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                    placeholder="Enter username"
                    className="focus:ring-2 focus:ring-[#0088cc] focus:border-transparent"
                    required
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-email" className="text-sm font-medium text-gray-700">
                    Email Address *
                  </Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    placeholder="admin@company.com"
                    className="focus:ring-2 focus:ring-[#0088cc] focus:border-transparent"
                    required
                    disabled
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={handleCancelEdit} className="flex-1 bg-transparent">
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-[#0088cc] hover:bg-blue-700 text-white" disabled>
                    Update Admin
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddAdmin