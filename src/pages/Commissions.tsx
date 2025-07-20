"use client"

import type React from "react"
import { useState } from "react"
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Users,
  Download,
  Search,
  Building2,
  Settings,
  BarChart3,
  Save,
  Plus,
  Minus,
  ChevronDown,
  ChevronRight,
  CreditCard,
  MapPin,
  Phone,
  Globe,
  Eye,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface CommissionData {
  id: string
  serviceProvider: string
  providerType: "Hotel" | "Travel Service" | "Tour Service"
  amount: number
  percentage: number
  date: string
  transactionId: string
  revenue: number
  businessRegNo: string
  paymentMethod: string
  customerCount: number
  month: string
  location: string
  phone: string
  website: string
  address: string
}

interface CommissionSettings {
  Hotel: number
  "Travel Service": number
  "Tour Service": number
}

const Commissions: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [selectedMonth, setSelectedMonth] = useState("all")
  const [selectedProvider, setSelectedProvider] = useState<CommissionData | null>(null)
  const [expandedProviders, setExpandedProviders] = useState<string[]>([])

  // Commission settings state
  const [commissionSettings, setCommissionSettings] = useState<CommissionSettings>({
    Hotel: 12.5,
    "Travel Service": 10.0,
    "Tour Service": 15.0,
  })

  const [tempSettings, setTempSettings] = useState<CommissionSettings>(commissionSettings)

  // Mock data with comprehensive information
  const commissions: CommissionData[] = [
    {
      id: "1",
      serviceProvider: "Sunset Beach Resort",
      providerType: "Hotel",
      amount: 1250.0,
      percentage: 12.5,
      date: "2024-01-15",
      transactionId: "TXN001",
      revenue: 10000.0,
      businessRegNo: "FL-HTL-2024-001",
      paymentMethod: "Bank Transfer",
      customerCount: 45,
      month: "2024-01",
      location: "Bali, Indonesia",
      phone: "+62 361 123 4567",
      website: "www.sunsetbeach.com",
      address: "Jl. Pantai Kuta No. 123, Kuta, Badung Regency, Bali 80361, Indonesia",
    },
    {
      id: "2",
      serviceProvider: "Mountain Adventure Tours",
      providerType: "Tour Service",
      amount: 850.0,
      percentage: 15.0,
      date: "2024-01-14",
      transactionId: "TXN002",
      revenue: 5666.67,
      businessRegNo: "CO-TOR-2024-045",
      paymentMethod: "PayPal",
      customerCount: 28,
      month: "2024-01",
      location: "Nepal",
      phone: "+977 1 234 5678",
      website: "www.adventurepro.com",
      address: "Thamel Marg, Ward No. 26, Kathmandu 44600, Nepal",
    },
    {
      id: "3",
      serviceProvider: "City Car Rentals",
      providerType: "Travel Service",
      amount: 1000.0,
      percentage: 10.0,
      date: "2024-01-13",
      transactionId: "TXN003",
      revenue: 10000.0,
      businessRegNo: "NY-TRV-2024-089",
      paymentMethod: "Direct Deposit",
      customerCount: 156,
      month: "2024-01",
      location: "Bangkok, Thailand",
      phone: "+66 2 123 4567",
      website: "www.citytransport.com",
      address: "456 Sukhumvit Road, Klongtoey, Bangkok 10110, Thailand",
    },
    {
      id: "4",
      serviceProvider: "Downtown Luxury Hotel",
      providerType: "Hotel",
      amount: 3200.0,
      percentage: 12.5,
      date: "2024-02-09",
      transactionId: "TXN007",
      revenue: 25600.0,
      businessRegNo: "IL-HTL-2024-034",
      paymentMethod: "Bank Transfer",
      customerCount: 89,
      month: "2024-02",
      location: "Maldives",
      phone: "+960 123 4567",
      website: "www.luxurychain.com",
      address: "Malé 20026, Republic of Maldives",
    },
    {
      id: "5",
      serviceProvider: "Golden Gate Tours",
      providerType: "Tour Service",
      amount: 1480.0,
      percentage: 15.0,
      date: "2024-02-08",
      transactionId: "TXN008",
      revenue: 9866.67,
      businessRegNo: "CA-TOR-2024-078",
      paymentMethod: "PayPal",
      customerCount: 67,
      month: "2024-02",
      location: "Peru",
      phone: "+51 1 234 5678",
      website: "www.heritage.com",
      address: "Av. El Sol 123, Cusco 08002, Peru",
    },
    {
      id: "6",
      serviceProvider: "Express Travel Services",
      providerType: "Travel Service",
      amount: 750.0,
      percentage: 10.0,
      date: "2024-02-07",
      transactionId: "TXN009",
      revenue: 7500.0,
      businessRegNo: "TX-TRV-2024-156",
      paymentMethod: "Bank Transfer",
      customerCount: 34,
      month: "2024-02",
      location: "Switzerland",
      phone: "+41 27 123 4567",
      website: "www.mountainview.com",
      address: "Bergstrasse 45, 3920 Zermatt, Switzerland",
    },
  ]

  const months = ["2024-01", "2024-02", "2024-03"]
  const uniqueProviders = [...new Set(commissions.map((c) => c.serviceProvider))]

  const handleSettingsChange = (type: keyof CommissionSettings, value: number) => {
    setTempSettings((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  const saveSettings = () => {
    setCommissionSettings(tempSettings)
    console.log("Saving commission settings:", tempSettings)
  }

  const resetSettings = () => {
    setTempSettings(commissionSettings)
  }

  const toggleProviderExpansion = (provider: string) => {
    setExpandedProviders((prev) => (prev.includes(provider) ? prev.filter((p) => p !== provider) : [...prev, provider]))
  }

  const handleViewProvider = (commission: CommissionData) => {
    setSelectedProvider(commission)
  }

  const handleCloseModal = () => {
    setSelectedProvider(null)
  }

  // Calculate stats
  const stats = {
    totalCommissions: commissions.reduce((sum, commission) => sum + commission.amount, 0),
    thisMonthCommissions: commissions
      .filter((c) => c.month === "2024-02")
      .reduce((sum, commission) => sum + commission.amount, 0),
    totalRevenue: commissions.reduce((sum, commission) => sum + commission.revenue, 0),
    activeProviders: uniqueProviders.length,
  }

  const getFilteredCommissions = () => {
    return commissions.filter((commission) => {
      const matchesSearch =
        commission.serviceProvider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        commission.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        commission.businessRegNo.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === "all" || commission.providerType.toLowerCase() === filterType.toLowerCase()
      const matchesMonth = selectedMonth === "all" || commission.month === selectedMonth
      return matchesSearch && matchesType && matchesMonth
    })
  }

  const filteredCommissions = getFilteredCommissions()

  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case "Hotel":
        return "bg-blue-100 text-blue-800"
      case "Tour Service":
        return "bg-green-100 text-green-800"
      case "Travel Service":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Hotel":
        return <Building2 className="w-4 h-4" />
      case "Tour Service":
        return <Users className="w-4 h-4" />
      case "Travel Service":
        return <CreditCard className="w-4 h-4" />
      default:
        return <Building2 className="w-4 h-4" />
    }
  }

  const getCommissionsByType = (type: string) => {
    return commissions.filter((c) => c.providerType === type).length
  }

  const getTotalCommissionByType = (type: string) => {
    return commissions.filter((c) => c.providerType === type).reduce((sum, c) => sum + c.amount, 0)
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-white shadow-lg border-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">Rs {stats.totalCommissions.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Commissions</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-white shadow-lg border-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">Rs {stats.thisMonthCommissions.toLocaleString()}</p>
              <p className="text-sm text-gray-600">This Month</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-white shadow-lg border-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">Rs {stats.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Revenue</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-white shadow-lg border-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.activeProviders}</p>
              <p className="text-sm text-gray-600">Active Providers</p>
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
            Commission Overview
            <Badge className="bg-blue-100 text-blue-800 ml-2">{commissions.length}</Badge>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
              activeTab === "settings"
                ? "text-[#0088cc] border-b-2 border-[#0088cc] bg-[#0088cc]/5"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Settings className="w-5 h-5" />
            Commission Settings
          </button>
          <button
            onClick={() => setActiveTab("providers")}
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
              activeTab === "providers"
                ? "text-[#0088cc] border-b-2 border-[#0088cc] bg-[#0088cc]/5"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Building2 className="w-5 h-5" />
            Provider Details
            <Badge className="bg-green-100 text-green-800 ml-2">{uniqueProviders.length}</Badge>
          </button>
          <button
            onClick={() => setActiveTab("monthly")}
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
              activeTab === "monthly"
                ? "text-[#0088cc] border-b-2 border-[#0088cc] bg-[#0088cc]/5"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Calendar className="w-5 h-5" />
            Monthly Reports
          </button>
        </div>
      </Card>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <>
          {/* Filters */}
          <Card className="p-4 bg-white shadow-lg border-0">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search by provider, transaction ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088cc] focus:border-transparent w-[180px]"
              >
                <option value="all">All Types</option>
                <option value="hotel">Hotel</option>
                <option value="tour service">Tour Service</option>
                <option value="travel service">Travel Service</option>
              </select>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088cc] focus:border-transparent w-[180px]"
              >
                <option value="all">All Months</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {new Date(month + "-01").toLocaleDateString("en-US", { year: "numeric", month: "long" })}
                  </option>
                ))}
              </select>
            </div>
          </Card>

          {/* Commission Table */}
          <Card className="p-6 bg-white shadow-lg border-0">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Commission Transactions</h3>
              <p className="text-gray-600">Track all commission payments from service providers</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium text-gray-900">Provider</th>
                    <th className="text-left p-3 font-medium text-gray-900">Type</th>
                    <th className="text-left p-3 font-medium text-gray-900">Commission</th>
                    <th className="text-left p-3 font-medium text-gray-900">Revenue</th>
                    <th className="text-left p-3 font-medium text-gray-900">Rate</th>
                    <th className="text-left p-3 font-medium text-gray-900">Date</th>
                    <th className="text-left p-3 font-medium text-gray-900">Transaction ID</th>
                    <th className="text-left p-3 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCommissions.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="p-8 text-center text-gray-500">
                        No commission records found
                      </td>
                    </tr>
                  ) : (
                    filteredCommissions.map((commission) => (
                      <tr key={commission.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{commission.serviceProvider}</p>
                            <p className="text-sm text-gray-500">{commission.location}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className={getTypeBadgeClass(commission.providerType)}>
                            {getTypeIcon(commission.providerType)}
                            <span className="ml-1">{commission.providerType}</span>
                          </Badge>
                        </td>
                        <td className="p-3">
                          <span className="font-semibold text-green-600">Rs {commission.amount.toLocaleString()}</span>
                        </td>
                        <td className="p-3">
                          <span className="font-medium">Rs {commission.revenue.toLocaleString()}</span>
                        </td>
                        <td className="p-3">
                          <span className="font-medium">{commission.percentage}%</span>
                        </td>
                        <td className="p-3 text-gray-600">{new Date(commission.date).toLocaleDateString()}</td>
                        <td className="p-3">
                          <span className="font-mono text-sm text-gray-700">{commission.transactionId}</span>
                        </td>
                        <td className="p-3">
                          <Button size="sm" variant="outline" onClick={() => handleViewProvider(commission)}>
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      {/* Commission Settings Tab */}
      {activeTab === "settings" && (
        <Card className="p-6 bg-white shadow-lg border-0">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Commission Rate Settings</h3>
            <p className="text-gray-600">Configure commission percentages for different service provider types</p>
          </div>
          <div className="space-y-6">
            {Object.entries(tempSettings).map(([type, rate]) => (
              <div key={type} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#0088cc]/10 rounded-xl flex items-center justify-center">
                    {getTypeIcon(type)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{type}</h3>
                    <p className="text-sm text-gray-500">
                      {getCommissionsByType(type)} providers • Rs {getTotalCommissionByType(type).toLocaleString()}{" "}
                      total
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSettingsChange(type as keyof CommissionSettings, Math.max(0, rate - 0.5))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>

                  <div className="text-center min-w-[80px]">
                    <div className="text-2xl font-bold text-gray-900">{rate}%</div>
                    <div className="text-xs text-gray-500">Commission</div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSettingsChange(type as keyof CommissionSettings, Math.min(25, rate + 0.5))}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline" onClick={resetSettings}>
                Reset Changes
              </Button>
              <Button onClick={saveSettings} className="bg-[#0088cc] hover:bg-[#0088cc]/90">
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Provider Details Tab */}
      {activeTab === "providers" && (
        <Card className="p-6 bg-white shadow-lg border-0">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Provider Commission Details</h3>
            <p className="text-gray-600">Detailed commission breakdown by service provider</p>
          </div>
          <div className="space-y-4">
            {uniqueProviders.map((provider) => {
              const providerCommissions = commissions.filter((c) => c.serviceProvider === provider)
              const totalCommission = providerCommissions.reduce((sum, c) => sum + c.amount, 0)
              const totalRevenue = providerCommissions.reduce((sum, c) => sum + c.revenue, 0)
              const isExpanded = expandedProviders.includes(provider)

              return (
                <div key={provider} className="border rounded-lg">
                  <button
                    onClick={() => toggleProviderExpansion(provider)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#0088cc]/10 rounded-xl flex items-center justify-center">
                        {getTypeIcon(providerCommissions[0].providerType)}
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900">{provider}</div>
                        <div className="text-sm text-gray-500">
                          {providerCommissions[0].providerType} • {providerCommissions.length} transactions
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-semibold text-green-600">Rs {totalCommission.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">Total Commission</div>
                      </div>
                      {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t bg-gray-50 p-4">
                      <div className="space-y-2">
                        {providerCommissions.map((commission) => (
                          <div
                            key={commission.id}
                            className="flex items-center justify-between p-3 bg-white border rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-sm text-gray-600">{commission.transactionId}</span>
                              <span className="text-sm text-gray-500">
                                {new Date(commission.date).toLocaleDateString()}
                              </span>
                            </div>

                            <div className="text-right">
                              <div className="font-medium text-green-600">Rs {commission.amount.toLocaleString()}</div>
                              <div className="text-xs text-gray-500">{commission.percentage}% commission</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </Card>
      )}

      {/* Monthly Reports Tab */}
      {activeTab === "monthly" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {months.map((month) => {
            const monthCommissions = commissions.filter((c) => c.month === month)
            const monthTotal = monthCommissions.reduce((sum, c) => sum + c.amount, 0)
            const monthRevenue = monthCommissions.reduce((sum, c) => sum + c.revenue, 0)

            return (
              <Card key={month} className="p-6 bg-white shadow-lg border-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#0088cc]/10 rounded-xl flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#0088cc]" />
                    </div>
                    <h3 className="text-lg font-semibold">
                      {new Date(month + "-01").toLocaleDateString("en-US", { year: "numeric", month: "long" })}
                    </h3>
                  </div>
                  <Badge className="bg-[#0088cc]/10 text-[#0088cc]">{monthCommissions.length} transactions</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">Rs {monthTotal.toLocaleString()}</div>
                    <div className="text-sm text-green-600">Total Commission</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">Rs {monthRevenue.toLocaleString()}</div>
                    <div className="text-sm text-blue-600">Total Revenue</div>
                  </div>
                </div>

                <div className="space-y-2">
                  {["Hotel", "Travel Service", "Tour Service"].map((type) => {
                    const typeCommissions = monthCommissions.filter((c) => c.providerType === type)
                    const typeTotal = typeCommissions.reduce((sum, c) => sum + c.amount, 0)

                    return (
                      <div key={type} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(type)}
                          <span className="text-sm font-medium">{type}</span>
                        </div>
                        <div className="text-sm font-semibold">Rs {typeTotal.toLocaleString()}</div>
                      </div>
                    )
                  })}
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {/* Provider Details Modal */}
      {selectedProvider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#0088cc]/10 rounded-xl flex items-center justify-center">
                    {getTypeIcon(selectedProvider.providerType)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedProvider.serviceProvider}</h2>
                    <p className="text-lg text-gray-600 font-medium">{selectedProvider.providerType}</p>
                    <p className="text-sm text-gray-500">{selectedProvider.businessRegNo}</p>
                  </div>
                </div>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">
                  ×
                </button>
              </div>

              {/* Provider Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Commission Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Commission Details</h3>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Commission Amount:</span>
                      <span className="font-semibold text-green-600">
                        Rs {selectedProvider.amount.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Commission Rate:</span>
                      <span className="font-medium">{selectedProvider.percentage}%</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Revenue Generated:</span>
                      <span className="font-medium">Rs {selectedProvider.revenue.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction ID:</span>
                      <span className="font-mono text-sm">{selectedProvider.transactionId}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-medium">{selectedProvider.paymentMethod}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Customer Count:</span>
                      <span className="font-medium">{selectedProvider.customerCount}</span>
                    </div>
                  </div>
                </div>

                {/* Contact & Location */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Contact & Location</h3>

                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600 text-sm">Address:</span>
                      <p className="text-gray-800 mt-1 leading-relaxed">{selectedProvider.address}</p>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {selectedProvider.location}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {selectedProvider.phone}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Website:</span>
                      <span className="font-medium flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        {selectedProvider.website}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction Date:</span>
                      <span className="font-medium">{new Date(selectedProvider.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8 pt-6 border-t">
                <Button onClick={handleCloseModal} className="bg-[#0088cc] hover:bg-[#0088cc]/90">
                  Close
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Commissions
