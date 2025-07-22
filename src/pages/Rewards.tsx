"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Star, Users, Target, Coins, Settings, Eye, Heart, Crown, Percent, Download } from "lucide-react"
import { useState } from "react"

const TripFluencerRewards = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [viewingUser, setViewingUser] = useState(null)
  const [editingPoints, setEditingPoints] = useState(false)
  const [pointSettings, setPointSettings] = useState({
    tier1: { range: "0-1,000", points: 10 },
    tier2: { range: "1,001-10,000", points: 20 },
    tier3: { range: "10,001-100,000", points: 30 },
    tier4: { range: "100,001-500,000", points: 40 },
    tier5: { range: "500,001-1,000,000", points: 50 },
  })

  const stats = [
    {
      title: "Active TripFluencers",
      value: "1,248",
      change: "+89 this month",
      icon: <Star className="w-6 h-6" />,
      color: "bg-yellow-500",
    },
    {
      title: "Total Points Earned",
      value: "2.4M",
      change: "+18% this week",
      icon: <Coins className="w-6 h-6" />,
      color: "bg-blue-500",
    },
    {
      title: "Monthly Subscriptions",
      value: "1,567",
      change: "+25% from last month",
      icon: <Percent className="w-6 h-6" />,
      color: "bg-green-500",
    },
  ]

  const [tripFluencers, setTripFluencers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b5c9a245?w=40&h=40&fit=crop&crop=face",
      followers: 15420,
      totalLikes: 127000,
      currentPoints: 850,
      totalPointsEarned: 2450,
      usedPoints: 1600,
      premiumDiscountUsed: "16%",
      joinDate: "2024-01-15",
      lastActivity: "2 hours ago",
      tier: "Gold",
      monthlyLikes: 8500,
      totalPosts: 127,
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@email.com",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      followers: 28650,
      totalLikes: 89000,
      currentPoints: 1250,
      totalPointsEarned: 4890,
      usedPoints: 3640,
      premiumDiscountUsed: "36%",
      joinDate: "2023-11-22",
      lastActivity: "1 hour ago",
      tier: "Platinum",
      monthlyLikes: 12300,
      totalPosts: 203,
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      email: "emma.r@email.com",
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      followers: 9580,
      totalLikes: 45000,
      currentPoints: 380,
      totalPointsEarned: 1250,
      usedPoints: 870,
      premiumDiscountUsed: "8%",
      joinDate: "2024-03-08",
      lastActivity: "3 hours ago",
      tier: "Silver",
      monthlyLikes: 4200,
      totalPosts: 89,
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.kim@email.com",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      followers: 18920,
      totalLikes: 156000,
      currentPoints: 920,
      totalPointsEarned: 3120,
      usedPoints: 2200,
      premiumDiscountUsed: "22%",
      joinDate: "2023-12-05",
      lastActivity: "30 minutes ago",
      tier: "Gold",
      monthlyLikes: 9800,
      totalPosts: 156,
    },
    {
      id: 5,
      name: "Lisa Park",
      email: "lisa.p@email.com",
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      followers: 22150,
      totalLikes: 89500,
      currentPoints: 675,
      totalPointsEarned: 2890,
      usedPoints: 2215,
      premiumDiscountUsed: "22%",
      joinDate: "2023-10-18",
      lastActivity: "45 minutes ago",
      tier: "Gold",
      monthlyLikes: 7800,
      totalPosts: 178,
    },
    {
      id: 6,
      name: "Alex Turner",
      email: "alex.t@email.com",
      profileImage: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=40&h=40&fit=crop&crop=face",
      followers: 12890,
      totalLikes: 56700,
      currentPoints: 420,
      totalPointsEarned: 1780,
      usedPoints: 1360,
      premiumDiscountUsed: "13%",
      joinDate: "2024-02-03",
      lastActivity: "1 day ago",
      tier: "Silver",
      monthlyLikes: 5200,
      totalPosts: 134,
    },
    {
      id: 7,
      name: "Maria Santos",
      email: "maria.s@email.com",
      profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face",
      followers: 31250,
      totalLikes: 145600,
      currentPoints: 1540,
      totalPointsEarned: 5670,
      usedPoints: 4130,
      premiumDiscountUsed: "41%",
      joinDate: "2023-08-12",
      lastActivity: "20 minutes ago",
      tier: "Platinum",
      monthlyLikes: 14500,
      totalPosts: 245,
    },
    {
      id: 8,
      name: "James Wilson",
      email: "james.w@email.com",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      followers: 8750,
      totalLikes: 38900,
      currentPoints: 290,
      totalPointsEarned: 1450,
      usedPoints: 1160,
      premiumDiscountUsed: "11%",
      joinDate: "2024-01-28",
      lastActivity: "2 hours ago",
      tier: "Silver",
      monthlyLikes: 3400,
      totalPosts: 98,
    },
    {
      id: 9,
      name: "Sophie Zhang",
      email: "sophie.z@email.com",
      profileImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face",
      followers: 19680,
      totalLikes: 78400,
      currentPoints: 780,
      totalPointsEarned: 2950,
      usedPoints: 2170,
      premiumDiscountUsed: "21%",
      joinDate: "2023-09-25",
      lastActivity: "3 hours ago",
      tier: "Gold",
      monthlyLikes: 6890,
      totalPosts: 167,
    },
    {
      id: 10,
      name: "Carlos Rodriguez",
      email: "carlos.r@email.com",
      profileImage: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=40&h=40&fit=crop&crop=face",
      followers: 25340,
      totalLikes: 112300,
      currentPoints: 1120,
      totalPointsEarned: 4560,
      usedPoints: 3440,
      premiumDiscountUsed: "34%",
      joinDate: "2023-07-14",
      lastActivity: "1 hour ago",
      tier: "Platinum",
      monthlyLikes: 9870,
      totalPosts: 198,
    },
  ])

  const candidateUsers = [
    {
      id: 5,
      name: "Jessica Park",
      email: "jessica.p@email.com",
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      followers: 1200,
      totalLikes: 8500,
      totalPosts: 85,
      engagementRate: "8.2%",
      qualificationStatus: "Eligible",
      joinDate: "2024-02-20",
    },
    {
      id: 6,
      name: "Alex Turner",
      email: "alex.t@email.com",
      profileImage: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=40&h=40&fit=crop&crop=face",
      followers: 1150,
      totalLikes: 9200,
      totalPosts: 92,
      engagementRate: "9.1%",
      qualificationStatus: "Under Review",
      joinDate: "2024-01-10",
    },
    {
      id: 7,
      name: "Maria Santos",
      email: "maria.s@email.com",
      profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face",
      followers: 1580,
      totalLikes: 12400,
      totalPosts: 134,
      engagementRate: "7.8%",
      qualificationStatus: "Eligible",
      joinDate: "2023-12-15",
    },
  ]

  const redemptionHistory = [
    {
      id: 1,
      userId: 1,
      userName: "Sarah Johnson",
      pointsUsed: 50,
      discountReceived: "50%",
      premiumPurchase: "Monthly Premium",
      originalPrice: "Rs 2,500",
      discountedPrice: "Rs 1,250",
      dateRedeemed: "2024-03-14",
      status: "Active",
    },
    {
      id: 2,
      userId: 2,
      userName: "Mike Chen",
      pointsUsed: 80,
      discountReceived: "80%",
      premiumPurchase: "Monthly Premium",
      originalPrice: "Rs 2,500",
      discountedPrice: "Rs 500",
      dateRedeemed: "2024-03-13",
      status: "Active",
    },
    {
      id: 3,
      userId: 3,
      userName: "Emma Rodriguez",
      pointsUsed: 25,
      discountReceived: "25%",
      premiumPurchase: "Monthly Premium",
      originalPrice: "Rs 2,500",
      discountedPrice: "Rs 1,875",
      dateRedeemed: "2024-03-12",
      status: "Active",
    },
    {
      id: 4,
      userId: 4,
      userName: "David Kim",
      pointsUsed: 100,
      discountReceived: "100%",
      premiumPurchase: "Monthly Premium",
      originalPrice: "Rs 2,500",
      discountedPrice: "FREE",
      dateRedeemed: "2024-03-11",
      status: "Active",
    },
    {
      id: 5,
      userId: 1,
      userName: "Sarah Johnson",
      pointsUsed: 60,
      discountReceived: "60%",
      premiumPurchase: "Monthly Premium",
      originalPrice: "Rs 2,500",
      discountedPrice: "Rs 1,000",
      dateRedeemed: "2024-02-14",
      status: "Expired",
    },
  ]

  const calculatePointsFromLikes = (likes) => {
    if (likes <= 1000) return Math.floor(likes / 100) * pointSettings.tier1.points
    if (likes <= 10000) return pointSettings.tier2.points
    if (likes <= 100000) return pointSettings.tier3.points
    if (likes <= 500000) return pointSettings.tier4.points
    if (likes <= 1000000) return pointSettings.tier5.points
    return pointSettings.tier5.points // For likes above 1M, still use tier5 points
  }

  const getTierColor = (tier) => {
    switch (tier) {
      case "Platinum":
        return "bg-gray-100 text-gray-800 border-gray-300"
      case "Gold":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "Silver":
        return "bg-blue-100 text-blue-800 border-blue-300"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getQualificationColor = (status) => {
    switch (status) {
      case "Eligible":
        return "bg-green-100 text-green-800"
      case "Under Review":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const promoteTripFluencer = (candidateId) => {
    const candidate = candidateUsers.find((u) => u.id === candidateId)
    if (candidate) {
      const newTripFluencer = {
        ...candidate,
        currentPoints: 0,
        totalPointsEarned: 0,
        usedPoints: 0,
        premiumDiscountUsed: "0%",
        status: "Active",
        tier: "Silver",
        monthlyLikes: 0,
        totalPosts: candidate.totalPosts,
      }
      setTripFluencers([...tripFluencers, newTripFluencer])
    }
  }

  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
              <Crown className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">TripFluencer Rewards System</h1>
              <p className="text-gray-600">Manage travelers with 1,000+ followers who earn points through engagement</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                  <Settings className="w-4 h-4 mr-2" />
                  Point Settings
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Point System Settings</DialogTitle>
                  <DialogDescription>Configure how points are awarded based on likes received</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {Object.entries(pointSettings).map(([key, setting]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{setting.range} likes</p>
                        <p className="text-sm text-gray-600">Points per milestone</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={setting.points}
                          onChange={(e) =>
                            setPointSettings({
                              ...pointSettings,
                              [key]: { ...setting, points: Number.parseInt(e.target.value) },
                            })
                          }
                          className="w-20"
                        />
                        <span className="text-sm text-gray-500">points</span>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Settings</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 bg-white shadow-lg border-0">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.color}/10 rounded-xl flex items-center justify-center`}>
                <div className={`${stat.color.replace("bg-", "text-")}`}>{stat.icon}</div>
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-xs text-green-600 font-medium">{stat.change}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-lg border-0">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              System Overview
            </button>
            <button
              onClick={() => setActiveTab("tripfluencers")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "tripfluencers"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Active TripFluencers
            </button>
            <button
              onClick={() => setActiveTab("redemptions")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "redemptions"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Redemption History
            </button>
          </nav>
        </div>
        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 border border-blue-200 bg-blue-50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">TripFluencer Qualification</h3>
                      <p className="text-sm text-gray-600">Requirements to become a TripFluencer</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">
                        Minimum <strong>1,000 followers</strong>
                      </span>
                    </div>
                   
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Active travel content posting</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Clean community record</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border border-yellow-200 bg-yellow-50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                      <Heart className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Points from Likes</h3>
                      <p className="text-sm text-gray-600">How TripFluencers earn points</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">0-1,000 likes</span>
                      <Badge className="bg-yellow-100 text-yellow-800">{pointSettings.tier1.points} points</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">1,001-10,000 likes</span>
                      <Badge className="bg-yellow-100 text-yellow-800">{pointSettings.tier2.points} points</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">10,001-100,000 likes</span>
                      <Badge className="bg-yellow-100 text-yellow-800">{pointSettings.tier3.points} points</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">100,001-500,000 likes</span>
                      <Badge className="bg-yellow-100 text-yellow-800">{pointSettings.tier4.points} points</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">500,001-1,000,000 likes</span>
                      <Badge className="bg-yellow-100 text-yellow-800">{pointSettings.tier5.points} points</Badge>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6 border border-green-200 bg-green-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <Percent className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Monthly Premium Discount</h3>
                    <p className="text-sm text-gray-600">Each point = 1% discount on monthly premium subscription</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-green-200 p-6">
                  <div className="text-center mb-4">
                    <h4 className="text-2xl font-bold text-green-800 mb-2">Monthly Premium Plan</h4>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-3xl font-bold text-green-600">Rs 2,500</span>
                      <span className="text-lg text-gray-500">/month</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">Example: 25 points</span>
                      <span className="text-green-600 font-bold">25% OFF → Rs 1,875</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">Example: 50 points</span>
                      <span className="text-green-600 font-bold">50% OFF → Rs 1,250</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">Example: 100 points</span>
                      <span className="text-green-600 font-bold">100% OFF → FREE</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700 text-center">
                      <strong>Note:</strong> Only monthly subscriptions available.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "tripfluencers" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Active TripFluencers</h3>
                  <p className="text-gray-600">Manage TripFluencers and their point earnings</p>
                </div>
                <Button className="bg-blue-500 hover:bg-blue-600">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>TripFluencer</TableHead>
                      <TableHead>Followers</TableHead>
                      <TableHead>Total Likes</TableHead>
                      <TableHead>Current Points</TableHead>
                      <TableHead>Points Earned</TableHead>
                      <TableHead>Discount Used</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tripFluencers.map((influencer) => (
                      <TableRow key={influencer.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={influencer.profileImage || "/placeholder.svg"}
                              alt={influencer.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <p className="font-medium">{influencer.name}</p>
                              <p className="text-sm text-gray-500">{influencer.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{influencer.followers.toLocaleString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4 text-red-400" />
                            <span className="font-medium">{influencer.totalLikes.toLocaleString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Coins className="w-4 h-4 text-yellow-500" />
                            <span className="font-medium text-blue-600">{influencer.currentPoints}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{influencer.totalPointsEarned.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">Total earned</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Percent className="w-4 h-4 text-green-500" />
                            <span className="font-medium text-green-600">{influencer.premiumDiscountUsed}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => setViewingUser(influencer)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {activeTab === "redemptions" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Monthly Premium Redemptions</h3>
                  <p className="text-gray-600">Track how TripFluencers use points for monthly premium subscriptions</p>
                </div>
                <Button className="bg-blue-500 hover:bg-blue-600">
                  <Download className="w-4 h-4 mr-2" />
                  Export Redemptions
                </Button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>TripFluencer</TableHead>
                      <TableHead>Points Used</TableHead>
                      <TableHead>Discount Applied</TableHead>
                      <TableHead>Premium Subscription</TableHead>
                      <TableHead>Original Price</TableHead>
                      <TableHead>Final Price</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {redemptionHistory.map((redemption) => (
                      <TableRow key={redemption.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <Star className="w-4 h-4 text-blue-500" />
                            </div>
                            <span className="font-medium">{redemption.userName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Coins className="w-4 h-4 text-yellow-500" />
                            <span className="font-medium">{redemption.pointsUsed}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Percent className="w-4 h-4 text-green-500" />
                            <span className="font-medium text-green-600">{redemption.discountReceived}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{redemption.premiumPurchase}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-500 line-through">{redemption.originalPrice}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-green-600">{redemption.discountedPrice}</span>
                        </TableCell>
                        <TableCell>{redemption.dateRedeemed}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              redemption.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {redemption.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Details Dialog */}
      <Dialog open={viewingUser !== null} onOpenChange={() => setViewingUser(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>TripFluencer Details</DialogTitle>
            <DialogDescription>
              {viewingUser && `Complete profile and monthly premium discount information for ${viewingUser.name}`}
            </DialogDescription>
          </DialogHeader>
          {viewingUser && (
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="flex items-center gap-4">
                <img
                  src={viewingUser.profileImage || "/placeholder.svg"}
                  alt={viewingUser.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="text-xl font-bold">{viewingUser.name}</h3>
                  <p className="text-gray-600">{viewingUser.email}</p>
                  <span className="text-sm text-gray-500">Active since {viewingUser.joinDate}</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">Followers</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{viewingUser.followers.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium">Total Likes</span>
                  </div>
                  <p className="text-2xl font-bold text-red-600">{viewingUser.totalLikes.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Coins className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">Current Points</span>
                  </div>
                  <p className="text-2xl font-bold text-yellow-600">{viewingUser.currentPoints}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Percent className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">Discount Used</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">{viewingUser.premiumDiscountUsed}</p>
                </div>
              </div>

              {/* Detailed Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Engagement Stats</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Posts:</span>
                      <span className="font-medium">{viewingUser.totalPosts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Monthly Likes:</span>
                      <span className="font-medium">{viewingUser.monthlyLikes.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Join Date:</span>
                      <span className="font-medium">{viewingUser.joinDate}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Points Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Earned:</span>
                      <span className="font-medium">{viewingUser.totalPointsEarned.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Points Used:</span>
                      <span className="font-medium">{viewingUser.usedPoints.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Available:</span>
                      <span className="font-medium text-green-600">{viewingUser.currentPoints}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-end pt-4">
                <Button onClick={() => setViewingUser(null)} className="bg-blue-500 hover:bg-blue-600">
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TripFluencerRewards
