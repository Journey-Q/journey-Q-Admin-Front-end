"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Users,
  Star,
  DollarSign,
  TrendingUp,
  Edit,
  Trash2,
  Plus,
  X,
  Check,
  BarChart3,
  UserCheck,
  Target,
  CreditCard,
  Download,
  Eye,
  Settings,
  ChevronDown,
  ChevronUp,
  Save,
} from "lucide-react"

const Subscriptions = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPlan, setFilterPlan] = useState("all")
  const [showPlanModal, setShowPlanModal] = useState(false)
  const [editingPlan, setEditingPlan] = useState(null)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [expandedPlan, setExpandedPlan] = useState(null)

  // Form state for plan creation/editing
  const [planForm, setPlanForm] = useState({
    name: "",
    type: "premium",
    price: "",
    interval: "monthly",
    description: "",
    features: [""],
    isActive: true,
  })

  // Mock subscription plans data
  const [subscriptionPlans, setSubscriptionPlans] = useState([
    {
      id: 1,
      name: "Premium Monthly",
      type: "premium",
      price: 2500,
      currency: "Rs",
      interval: "monthly",
      features: [
        "AI-powered trip planning",
        "Public trip invites",
        "Ad Free",
      ],
      isActive: true,
      subscribers: 1247,
      revenue: 3117500,
      createdDate: "2024-01-15",
      description: "Perfect for frequent travelers who want premium features",
    },
    {
      id: 2,
      name: "Premium Yearly",
      type: "premium",
      price: 25000,
      currency: "Rs",
      interval: "yearly",
      features: [
        "AI-powered trip planning",
        "Public trip invites",
        "Ad Free",
      ],
      isActive: true,
      subscribers: 892,
      revenue: 22300000,
      createdDate: "2024-01-15",
      description: "Best value for dedicated travelers with annual savings",
    },
    {
      id: 3,
      name: "Basic Plan",
      type: "basic",
      price: 0,
      currency: "Rs",
      interval: "lifetime",
      features: ["Community access", "Limited trip saves", "With Ads"],
      isActive: true,
      subscribers: 5420,
      revenue: 0,
      createdDate: "2024-01-01",
      description: "Free plan for casual travelers",
    },
  ])

  // Mock users data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      plan: "Premium Monthly",
      planId: 1,
      status: "active",
      subscriptionDate: "2024-06-15",
      nextBilling: "2024-08-15",
      totalSpent: 15000,
      country: "Sri Lanka",
      lastActive: "2024-07-10",
    },
    {
      id: 2,
      name: "Marco Rodriguez",
      email: "marco.r@email.com",
      plan: "Premium Yearly",
      planId: 2,
      status: "active",
      subscriptionDate: "2024-03-20",
      nextBilling: "2025-03-20",
      totalSpent: 50000,
      country: "Sri Lanka",
      lastActive: "2024-07-09",
    },
    {
      id: 3,
      name: "Emma Chen",
      email: "emma.c@email.com",
      plan: "Basic Plan",
      planId: 3,
      status: "active",
      subscriptionDate: "2024-04-10",
      nextBilling: "Free",
      totalSpent: 0,
      country: "Sri Lanka",
      lastActive: "2024-07-10",
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david.w@email.com",
      plan: "Premium Monthly",
      planId: 1,
      status: "cancelled",
      subscriptionDate: "2024-05-01",
      nextBilling: "2024-08-01",
      totalSpent: 7500,
      country: "Sri Lanka",
      lastActive: "2024-07-05",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      email: "lisa.a@email.com",
      plan: "Premium Yearly",
      planId: 2,
      status: "past_due",
      subscriptionDate: "2024-01-15",
      nextBilling: "2024-07-15",
      totalSpent: 25000,
      country: "Sri Lanka",
      lastActive: "2024-07-08",
    },
  ])

  // Statistics
  const stats = {
    totalSubscribers: users.filter((u) => u.status === "active").length,
    totalRevenue: subscriptionPlans.reduce((sum, plan) => sum + plan.revenue, 0),
    monthlyRecurring: subscriptionPlans
      .filter((p) => p.interval === "monthly")
      .reduce((sum, plan) => sum + plan.subscribers * plan.price, 0),
    premiumUsers: users.filter((u) => u.planId !== 3 && u.status === "active").length,
    activeSubscriptions: users.filter((u) => u.status === "active").length,
    cancelledSubscriptions: users.filter((u) => u.status === "cancelled").length,
    pastDueSubscriptions: users.filter((u) => u.status === "past_due").length,
    avgRevenuePerUser: users.length > 0 ? users.reduce((sum, u) => sum + u.totalSpent, 0) / users.length : 0,
  }

  const getFilteredUsers = () => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === "all" || user.status === filterStatus
      const matchesPlan = filterPlan === "all" || user.planId.toString() === filterPlan
      return matchesSearch && matchesStatus && matchesPlan
    })
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "past_due":
        return "bg-yellow-100 text-yellow-800"
      case "paused":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPlanBadgeClass = (type) => {
    switch (type) {
      case "premium":
        return "bg-blue-100 text-blue-800"
      case "basic":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const resetPlanForm = () => {
    setPlanForm({
      name: "",
      type: "premium",
      price: "",
      interval: "monthly",
      description: "",
      features: [""],
      isActive: true,
    })
  }

  const handleCreatePlan = () => {
    resetPlanForm()
    setEditingPlan(null)
    setShowPlanModal(true)
  }

  const handleEditPlan = (plan) => {
    setPlanForm({
      name: plan.name,
      type: plan.type,
      price: plan.price.toString(),
      interval: plan.interval,
      description: plan.description,
      features: [...plan.features],
      isActive: plan.isActive,
    })
    setEditingPlan(plan)
    setShowPlanModal(true)
  }

  const handleDeletePlan = (planId) => {
    if (window.confirm("Are you sure you want to delete this plan? This action cannot be undone.")) {
      setSubscriptionPlans((prev) => prev.filter((plan) => plan.id !== planId))
    }
  }

  const handleSavePlan = () => {
    // Validation
    if (!planForm.name.trim()) {
      alert("Plan name is required")
      return
    }
    if (!planForm.description.trim()) {
      alert("Plan description is required")
      return
    }
    if (planForm.price === "" || (planForm.price !== "0" && Number.parseFloat(planForm.price) <= 0)) {
      alert("Please enter a valid price")
      return
    }
    if (planForm.features.some((feature) => !feature.trim())) {
      alert("All features must have content")
      return
    }

    const planData = {
      name: planForm.name.trim(),
      type: planForm.type,
      price: Number.parseFloat(planForm.price),
      currency: "Rs",
      interval: planForm.interval,
      description: planForm.description.trim(),
      features: planForm.features.filter((feature) => feature.trim()),
      isActive: planForm.isActive,
      subscribers: editingPlan ? editingPlan.subscribers : 0,
      revenue: editingPlan ? editingPlan.revenue : 0,
      createdDate: editingPlan ? editingPlan.createdDate : new Date().toISOString().split("T")[0],
    }

    if (editingPlan) {
      // Update existing plan
      setSubscriptionPlans((prev) =>
        prev.map((plan) => (plan.id === editingPlan.id ? { ...planData, id: editingPlan.id } : plan)),
      )
    } else {
      // Create new plan
      const newId = Math.max(...subscriptionPlans.map((p) => p.id)) + 1
      setSubscriptionPlans((prev) => [...prev, { ...planData, id: newId }])
    }

    setShowPlanModal(false)
    resetPlanForm()
    setEditingPlan(null)
  }

  const handleAddFeature = () => {
    setPlanForm((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }))
  }

  const handleRemoveFeature = (index) => {
    setPlanForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))
  }

  const handleFeatureChange = (index, value) => {
    setPlanForm((prev) => ({
      ...prev,
      features: prev.features.map((feature, i) => (i === index ? value : feature)),
    }))
  }

  const handleViewUser = (user) => {
    setSelectedUser(user)
    setShowUserModal(true)
  }

  const filteredUsers = getFilteredUsers()

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
      {/* Header */}
      {/* <Card className="p-6 bg-white shadow-lg border-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0088cc]/10 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-[#0088cc]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Subscription Management</h1>
              <p className="text-gray-600">Manage subscription plans, users, and revenue analytics</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button onClick={handleCreatePlan} className="bg-[#0088cc] hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Plan
            </Button>
          </div>
        </div>
      </Card> */}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-white shadow-lg border-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0088cc]/10 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-[#0088cc]" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.activeSubscriptions}</p>
              <p className="text-sm text-gray-600">Active Subscribers</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-lg border-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">Rs {stats.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Revenue</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-lg border-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.premiumUsers}</p>
              <p className="text-sm text-gray-600">Premium Users</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-lg border-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">Rs {stats.monthlyRecurring.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Monthly Recurring</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Card className="bg-white shadow-lg border-0">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
              activeTab === "overview"
                ? "text-[#0088cc] border-b-2 border-[#0088cc] bg-[#0088cc]/5"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab("plans")}
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
              activeTab === "plans"
                ? "text-[#0088cc] border-b-2 border-[#0088cc] bg-[#0088cc]/5"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Settings className="w-5 h-5" />
            Subscription Plans
            <Badge className="bg-blue-100 text-blue-800 ml-2">{subscriptionPlans.length}</Badge>
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
              activeTab === "users"
                ? "text-[#0088cc] border-b-2 border-[#0088cc] bg-[#0088cc]/5"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <UserCheck className="w-5 h-5" />
            Subscribers
            <Badge className="bg-green-100 text-green-800 ml-2">{stats.activeSubscriptions}</Badge>
          </button>
        </div>
      </Card>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Revenue Analytics */}
          <Card className="p-6 bg-white shadow-lg border-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">Rs {stats.avgRevenuePerUser.toFixed(2)}</p>
                <p className="text-sm text-gray-600">Average Revenue Per User</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {(
                    (stats.activeSubscriptions / (stats.activeSubscriptions + stats.cancelledSubscriptions)) *
                    100
                  ).toFixed(1)}
                  %
                </p>
                <p className="text-sm text-gray-600">Retention Rate</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500/10 rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <Target className="w-8 h-8 text-yellow-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats.pastDueSubscriptions}</p>
                <p className="text-sm text-gray-600">Past Due Subscriptions</p>
              </div>
            </div>
          </Card>

          {/* Plan Performance */}
          <Card className="p-6 bg-white shadow-lg border-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan Performance</h3>
            <div className="space-y-4">
              {subscriptionPlans.map((plan) => (
                <div key={plan.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#0088cc]/10 rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-[#0088cc]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{plan.name}</h4>
                      <p className="text-sm text-gray-600">
                        Rs {plan.price.toLocaleString()}/{plan.interval} • {plan.subscribers} subscribers
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">Rs {plan.revenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Plans Tab */}
      {activeTab === "plans" && (
        <div className="space-y-6">
          <Card className="p-6 bg-white shadow-lg border-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Subscription Plans</h3>
                <p className="text-gray-600">Manage your subscription plans and pricing</p>
              </div>
              <Button onClick={handleCreatePlan} className="bg-[#0088cc] hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add New Plan
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan) => (
                <Card
                  key={plan.id}
                  className="p-6 bg-white shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#0088cc]/10 rounded-lg flex items-center justify-center">
                        <Star className="w-5 h-5 text-[#0088cc]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                        <Badge className={getPlanBadgeClass(plan.type)}>{plan.type}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditPlan(plan)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePlan(plan.id)}
                        className="text-red-600 hover:text-red-700 bg-transparent"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-3xl font-bold text-gray-900">
                        {plan.price === 0 ? "Free" : `Rs ${plan.price.toLocaleString()}`}
                      </span>
                      {plan.price > 0 && <span className="text-gray-600">/{plan.interval}</span>}
                    </div>
                    <p className="text-sm text-gray-600">{plan.description}</p>
                  </div>

                  <div className="mb-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedPlan(expandedPlan === plan.id ? null : plan.id)}
                      className="w-full justify-between"
                    >
                      <span>Features ({plan.features.length})</span>
                      {expandedPlan === plan.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Button>
                    {expandedPlan === plan.id && (
                      <div className="mt-2 space-y-1">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <Check className="w-3 h-3 text-green-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Subscribers</p>
                      <p className="font-semibold text-gray-900">{plan.subscribers}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Revenue</p>
                      <p className="font-semibold text-gray-900">Rs {plan.revenue.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Status</span>
                      <Badge className={plan.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {plan.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="space-y-6">
          {/* Filters */}
          <Card className="p-4 bg-white shadow-lg border-0">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 focus:ring-2 focus:ring-[#0088cc] focus:border-transparent"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088cc] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="cancelled">Cancelled</option>
                <option value="past_due">Past Due</option>
              </select>
              <select
                value={filterPlan}
                onChange={(e) => setFilterPlan(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088cc] focus:border-transparent"
              >
                <option value="all">All Plans</option>
                {subscriptionPlans.map((plan) => (
                  <option key={plan.id} value={plan.id.toString()}>
                    {plan.name}
                  </option>
                ))}
              </select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </Card>

          {/* Users Table */}
          <Card className="p-6 bg-white shadow-lg border-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium text-gray-900">User</th>
                    <th className="text-left p-3 font-medium text-gray-900">Plan</th>
                    <th className="text-left p-3 font-medium text-gray-900">Status</th>
                    <th className="text-left p-3 font-medium text-gray-900">Next Billing</th>
                    <th className="text-left p-3 font-medium text-gray-900">Total Spent</th>
                    <th className="text-left p-3 font-medium text-gray-900">Country</th>
                    <th className="text-left p-3 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="p-8 text-center text-gray-500">
                        No subscribers found
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#0088cc]/10 rounded-full flex items-center justify-center">
                              <Users className="w-4 h-4 text-[#0088cc]" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className="bg-blue-100 text-blue-800">{user.plan}</Badge>
                        </td>
                        <td className="p-3">
                          <Badge className={getStatusBadgeClass(user.status)}>{user.status.replace("_", " ")}</Badge>
                        </td>
                        <td className="p-3 text-gray-600">{user.nextBilling}</td>
                        <td className="p-3 font-medium text-gray-900">Rs {user.totalSpent.toLocaleString()}</td>
                        <td className="p-3 text-gray-600">{user.country}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewUser(user)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Plan Create/Edit Modal */}
      {showPlanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingPlan ? "Edit Subscription Plan" : "Create New Subscription Plan"}
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShowPlanModal(false)
                    resetPlanForm()
                    setEditingPlan(null)
                  }}
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plan Name *</label>
                  <Input
                    type="text"
                    value={planForm.name}
                    onChange={(e) => setPlanForm((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Premium Monthly"
                    className="focus:ring-2 focus:ring-[#0088cc] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plan Type *</label>
                  <select
                    value={planForm.type}
                    onChange={(e) => setPlanForm((prev) => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088cc] focus:border-transparent"
                  >
                    <option value="basic">Basic</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (Rs) *</label>
                  <Input
                    type="number"
                    value={planForm.price}
                    onChange={(e) => setPlanForm((prev) => ({ ...prev, price: e.target.value }))}
                    placeholder="0"
                    min="0"
                    step="0.01"
                    className="focus:ring-2 focus:ring-[#0088cc] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Billing Interval *</label>
                  <select
                    value={planForm.interval}
                    onChange={(e) => setPlanForm((prev) => ({ ...prev, interval: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088cc] focus:border-transparent"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="lifetime">Lifetime</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  value={planForm.description}
                  onChange={(e) => setPlanForm((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  placeholder="Describe what this plan offers..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088cc] focus:border-transparent resize-none"
                />
              </div>

              {/* Features */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">Features *</label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddFeature}
                    className="text-[#0088cc] border-[#0088cc] hover:bg-[#0088cc]/5 bg-transparent"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Feature
                  </Button>
                </div>
                <div className="space-y-2">
                  {planForm.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        placeholder="Enter feature description"
                        className="flex-1 focus:ring-2 focus:ring-[#0088cc] focus:border-transparent"
                      />
                      {planForm.features.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveFeature(index)}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={planForm.isActive}
                  onChange={(e) => setPlanForm((prev) => ({ ...prev, isActive: e.target.checked }))}
                  className="w-4 h-4 text-[#0088cc] border-gray-300 rounded focus:ring-[#0088cc]"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                  Plan is active and available for subscription
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowPlanModal(false)
                    resetPlanForm()
                    setEditingPlan(null)
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button onClick={handleSavePlan} className="flex-1 bg-[#0088cc] hover:bg-blue-700 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  {editingPlan ? "Update Plan" : "Create Plan"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#0088cc]/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#0088cc]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedUser.name}</h2>
                    <p className="text-gray-600">{selectedUser.email}</p>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => setShowUserModal(false)}>
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* User Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Subscription Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Plan:</span>
                      <Badge className="bg-blue-100 text-blue-800">{selectedUser.plan}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <Badge className={getStatusBadgeClass(selectedUser.status)}>
                        {selectedUser.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subscription Date:</span>
                      <span className="font-medium">{selectedUser.subscriptionDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Next Billing:</span>
                      <span className="font-medium">{selectedUser.nextBilling}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Spent:</span>
                      <span className="font-medium text-green-600">Rs {selectedUser.totalSpent.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Profile Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Country:</span>
                      <span className="font-medium">{selectedUser.country}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Active:</span>
                      <span className="font-medium">{selectedUser.lastActive}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <Button className="bg-[#0088cc] hover:bg-blue-700 text-white">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Subscription
                </Button>
                <Button variant="outline">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Billing History
                </Button>
                <Button variant="outline" onClick={() => setShowUserModal(false)}>
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

export default Subscriptions
