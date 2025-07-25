"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Search,
  Calendar,
  MapPin,
  DollarSign,
  Eye,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Mail,
  Flag,
  Heart,
  Camera,
  Share2,
  MessageCircle,
  Trash2,
  AlertCircle,
  Lightbulb,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const AdminModerationDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("pending")
  const [filterPriority, setFilterPriority] = useState("all")
  const [selectedItems, setSelectedItems] = useState(new Set())
  const [viewingPost, setViewingPost] = useState(null)
  const [showModerationDialog, setShowModerationDialog] = useState(false)
  const [moderationAction, setModerationAction] = useState("")
  const [actionReason, setActionReason] = useState("")
  const [warningMessage, setWarningMessage] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Mock reported posts data with Sri Lankan content
  const [reportedPosts, setReportedPosts] = useState([
    {
      id: 1,
      type: "Journey Post",
      author: "Kasun Perera",
      authorEmail: "kasun.p@email.com",
      authorId: "user_123",
      title: "Ancient Wonders of Sigiriya",
      description:
        "An incredible 4-day journey exploring the ancient rock fortress of Sigiriya, Dambulla Cave Temple, and the cultural triangle of Sri Lanka.",
      fullDescription:
        "An incredible 4-day journey exploring the ancient rock fortress of Sigiriya, Dambulla Cave Temple, and the cultural triangle of Sri Lanka. This comprehensive guide includes climbing tips, historical insights, and the best photography spots in the ancient kingdom.",
      location: "Sigiriya, Sri Lanka",
      duration: "4 days",
      budget: "LKR 85,000",
      images: [
        "https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      ],
      hashtags: ["#sigiriya", "#srilanka", "#ancientcity", "#culture", "#heritage"],
      places: [
        {
          name: "Sigiriya Rock Fortress",
          day: 1,
          activities: ["Rock climbing", "Frescoes viewing", "Lion Gate exploration"],
          budget: "LKR 25,000",
        },
        {
          name: "Dambulla Cave Temple",
          day: 2,
          activities: ["Cave exploration", "Buddha statue viewing", "Temple prayers"],
          budget: "LKR 20,000",
        },
        {
          name: "Polonnaruwa Ancient City",
          day: 3,
          activities: ["Archaeological site tour", "Cycling", "Historical photography"],
          budget: "LKR 22,000",
        },
      ],
      tips: [
        "Start climbing Sigiriya early morning to avoid heat",
        "Carry water and wear comfortable shoes",
        "Respect religious sites and dress modestly",
        "Hire a local guide for historical context",
      ],
      reportReason: "Inappropriate Content",
      reportDetails: "Contains potentially misleading budget information and promotional links for tour operators",
      reportedBy: "TravelModerator",
      reportDate: "2024-03-15",
      postDate: "2024-03-14",
      status: "Pending",
      priority: "Medium",
      likes: 245,
      comments: 18,
      shares: 12,
      views: 1250,
      authorStats: {
        totalPosts: 89,
        followers: 2340,
        following: 456,
        totalReports: 1,
        accountAge: "2 years",
        lastActive: "2 hours ago",
        warnings: 0,
        verifiedTraveler: true,
      },
      reportInfo: {
        totalReports: 2,
        reporters: ["TravelModerator", "User456"],
        reasons: ["Inappropriate Content", "Misleading Information"],
      },
    },
    {
      id: 2,
      type: "Journey Post",
      author: "Nimali Fernando",
      authorEmail: "nimali.f@email.com",
      authorId: "user_456",
      title: "Tea Country Adventures in Nuwara Eliya",
      description:
        "Explore the misty hills of Nuwara Eliya, visit tea plantations, and experience the cool climate of Sri Lanka's hill country. Use my discount code TEA20 for bookings!",
      fullDescription:
        "Explore the misty hills of Nuwara Eliya, visit tea plantations, and experience the cool climate of Sri Lanka's hill country. This 5-day highland adventure includes tea factory tours, scenic train rides, and strawberry picking. Use my discount code TEA20 for 20% off bookings at partner hotels!",
      location: "Nuwara Eliya, Sri Lanka",
      duration: "5 days",
      budget: "LKR 95,000",
      images: [
        "https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      ],
      hashtags: ["#nuwaraeliya", "#teacountry", "#srilanka", "#hillcountry", "#scenic"],
      places: [
        {
          name: "Pedro Tea Estate",
          day: 1,
          activities: ["Tea factory tour", "Tea tasting", "Plantation walk"],
          budget: "LKR 18,000",
        },
        {
          name: "Horton Plains National Park",
          day: 2,
          activities: ["World's End viewpoint", "Baker's Falls", "Nature hiking"],
          budget: "LKR 25,000",
        },
        {
          name: "Gregory Lake",
          day: 3,
          activities: ["Boat rides", "Lakeside walks", "Horse riding"],
          budget: "LKR 15,000",
        },
      ],
      tips: [
        "Pack warm clothes - it gets cold in the hills",
        "Book train tickets in advance for scenic rides",
        "Try fresh strawberries and cream",
        "Visit tea factories early morning for best experience",
      ],
      reportReason: "Spam/Promotional",
      reportDetails: "Post contains promotional codes and commercial links for affiliate marketing with hotels",
      reportedBy: "System Auto-Detection",
      reportDate: "2024-03-14",
      postDate: "2024-03-14",
      status: "Pending",
      priority: "High",
      likes: 156,
      comments: 23,
      shares: 8,
      views: 890,
      authorStats: {
        totalPosts: 156,
        followers: 8920,
        following: 234,
        totalReports: 5,
        accountAge: "1 year",
        lastActive: "1 day ago",
        warnings: 2,
        verifiedTraveler: false,
      },
      reportInfo: {
        totalReports: 3,
        reporters: ["System Auto-Detection", "User789", "TravelGuard"],
        reasons: ["Spam/Promotional", "Commercial Content", "Affiliate Links"],
      },
    },
    {
      id: 3,
      type: "Journey Post",
      author: "Rohan Silva",
      authorEmail: "rohan.s@email.com",
      authorId: "user_789",
      title: "Coastal Paradise in Galle",
      description:
        "A perfect 6-day coastal adventure in Galle. Explore the historic Dutch fort, pristine beaches, and vibrant marine life of southern Sri Lanka.",
      fullDescription:
        "A perfect 6-day coastal adventure in Galle. Explore the historic Dutch fort, pristine beaches, and vibrant marine life of southern Sri Lanka. This comprehensive guide includes the best beach spots, historical sites, and local seafood experiences along the southern coast.",
      location: "Galle, Sri Lanka",
      duration: "6 days",
      budget: "LKR 120,000",
      images: [
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      ],
      hashtags: ["#galle", "#beaches", "#srilanka", "#coastal", "#heritage"],
      places: [
        {
          name: "Galle Dutch Fort",
          day: 1,
          activities: ["Fort exploration", "Lighthouse visit", "Colonial architecture tour"],
          budget: "LKR 20,000",
        },
        {
          name: "Unawatuna Beach",
          day: 2,
          activities: ["Beach relaxation", "Snorkeling", "Sunset viewing"],
          budget: "LKR 25,000",
        },
        {
          name: "Mirissa Whale Watching",
          day: 3,
          activities: ["Whale watching tour", "Dolphin spotting", "Ocean safari"],
          budget: "LKR 30,000",
        },
      ],
      tips: [
        "Visit Galle Fort during sunset for best photos",
        "Try fresh seafood at local restaurants",
        "Book whale watching tours in advance",
        "Respect marine life during water activities",
      ],
      reportReason: "False Report",
      reportDetails:
        "Report appears to be malicious - content meets all community guidelines and provides valuable travel information",
      reportedBy: "Anonymous User",
      reportDate: "2024-03-13",
      postDate: "2024-03-12",
      status: "Resolved",
      priority: "Low",
      likes: 412,
      comments: 45,
      shares: 28,
      views: 2100,
      authorStats: {
        totalPosts: 67,
        followers: 1250,
        following: 890,
        totalReports: 0,
        accountAge: "3 years",
        lastActive: "30 minutes ago",
        warnings: 0,
        verifiedTraveler: true,
      },
      reportInfo: {
        totalReports: 1,
        reporters: ["Anonymous User"],
        reasons: ["False Report"],
      },
    },
  ])

  const filteredPosts = reportedPosts.filter((post) => {
    const matchesSearch =
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || post.type.toLowerCase() === filterType.toLowerCase()
    const matchesStatus = filterStatus === "all" || post.status.toLowerCase() === filterStatus.toLowerCase()
    const matchesPriority = filterPriority === "all" || post.priority.toLowerCase() === filterPriority.toLowerCase()
    return matchesSearch && matchesType && matchesStatus && matchesPriority
  })

  const handleAction = (postId, action, reason = "") => {
    const updatedPosts = reportedPosts.map((post) => {
      if (post.id === postId) {
        return { ...post, status: action, actionReason: reason }
      }
      return post
    })
    setReportedPosts(updatedPosts)
  }

  const handleBulkAction = (action) => {
    const updatedPosts = reportedPosts.map((post) => {
      if (selectedItems.has(post.id)) {
        return { ...post, status: action }
      }
      return post
    })
    setReportedPosts(updatedPosts)
    setSelectedItems(new Set())
  }

  const handleSelectItem = (id) => {
    const newSelected = new Set(selectedItems)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedItems(newSelected)
  }

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "Pending":
        return "secondary"
      case "Resolved":
        return "default"
      case "Removed":
        return "destructive"
      case "Warning Sent":
        return "outline"
      default:
        return "outline"
    }
  }

  const getPriorityBadgeVariant = (priority) => {
    switch (priority) {
      case "High":
        return "destructive"
      case "Medium":
        return "secondary"
      case "Low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-4 h-4" />
      case "Resolved":
        return <CheckCircle className="w-4 h-4" />
      case "Removed":
        return <XCircle className="w-4 h-4" />
      case "Warning Sent":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  const nextImage = () => {
    if (viewingPost && viewingPost.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % viewingPost.images.length)
    }
  }

  const prevImage = () => {
    if (viewingPost && viewingPost.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + viewingPost.images.length) % viewingPost.images.length)
    }
  }

  const pendingCount = reportedPosts.filter((post) => post.status === "Pending").length
  const resolvedToday = reportedPosts.filter(
    (post) => post.status === "Resolved" && post.reportDate === "2024-03-15",
  ).length
  const removedToday = reportedPosts.filter(
    (post) => post.status === "Removed" && post.reportDate === "2024-03-15",
  ).length

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Moderation</h1>
          <p className="text-gray-600">Review and moderate reported travel posts</p>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-blue-600" />
          <span className="text-sm font-medium text-blue-600">Admin Dashboard</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Flag className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pendingCount}</p>
              <p className="text-sm text-gray-600">Pending Reports</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{resolvedToday}</p>
              <p className="text-sm text-gray-600">Resolved Today</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{removedToday}</p>
              <p className="text-sm text-gray-600">Removed Today</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">2.4K</p>
              <p className="text-sm text-gray-600">Posts Today</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-4 bg-white">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by author, title, location, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="removed">Removed</SelectItem>
                <SelectItem value="warning sent">Warning Sent</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bulk Actions */}
          {selectedItems.size > 0 && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-sm text-blue-800">
                {selectedItems.size} post{selectedItems.size > 1 ? "s" : ""} selected
              </span>
              <div className="flex gap-2 ml-auto">
                <Button size="sm" onClick={() => handleBulkAction("Resolved")}>
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Resolve All
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleBulkAction("Removed")}>
                  <Trash2 className="w-4 h-4 mr-1" />
                  Remove All
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Reported Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="p-6 bg-white">
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                checked={selectedItems.has(post.id)}
                onChange={() => handleSelectItem(post.id)}
                className="mt-1 rounded"
              />

              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline">
                      <Camera className="w-3 h-3 mr-1" />
                      Journey Post
                    </Badge>
                    <Badge variant={getStatusBadgeVariant(post.status)}>
                      {getStatusIcon(post.status)}
                      <span className="ml-1">{post.status}</span>
                    </Badge>
                    <Badge variant={getPriorityBadgeVariant(post.priority)}>{post.priority} Priority</Badge>
                    <Badge variant="destructive">
                      <Flag className="w-3 h-3 mr-1" />
                      {post.reportInfo.totalReports} report{post.reportInfo.totalReports > 1 ? "s" : ""}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Reported: {post.reportDate}</p>
                    <p className="text-sm text-gray-500">Posted: {post.postDate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Post Preview */}
                  <div className="lg:col-span-4">
                    <div className="space-y-3">
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={post.images[0] || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setViewingPost(post)
                          setCurrentImageIndex(0)
                        }}
                        className="w-full"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Show Post
                      </Button>
                    </div>
                  </div>

                  {/* Post Details */}
                  <div className="lg:col-span-5 space-y-4">
                    {/* Author Info */}
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{post.author}</p>
                          {post.authorStats.verifiedTraveler && <CheckCircle className="w-4 h-4 text-blue-500" />}
                        </div>
                        <p className="text-sm text-gray-600">{post.authorEmail}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                          <span>{post.authorStats.totalPosts} posts</span>
                          <span>{post.authorStats.followers} followers</span>
                          <span>{post.authorStats.warnings} warnings</span>
                        </div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium">{post.location}</span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mb-3">{post.description}</p>
                    </div>

                    {/* Report Details */}
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <p className="text-sm font-medium text-red-800">Primary Report: {post.reportReason}</p>
                      </div>
                      <p className="text-xs text-red-600 mb-2">{post.reportDetails}</p>
                      <p className="text-xs text-red-600 mb-2">Reported by: {post.reportInfo.reporters.join(", ")}</p>

                      {/* All Report Reasons in Scrollable Container */}
                      {post.reportInfo.totalReports >= 3 && (
                        <div className="mt-2">
                          <p className="text-xs text-red-600 mb-1 font-medium">
                            All Report Reasons ({post.reportInfo.totalReports} reports):
                          </p>
                          <div className="max-h-16 overflow-y-auto bg-red-100 rounded p-2 space-y-1">
                            {post.reportInfo.reasons.map((reason, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></div>
                                <span className="text-xs text-red-700">{reason}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* For less than 3 reports, show as badges */}
                      {post.reportInfo.totalReports < 3 && post.reportInfo.reasons.length > 1 && (
                        <div className="mt-2">
                          <p className="text-xs text-red-600 mb-1">Additional reasons:</p>
                          <div className="flex flex-wrap gap-1">
                            {post.reportInfo.reasons.slice(1).map((reason, idx) => (
                              <Badge key={idx} variant="destructive" className="text-xs">
                                {reason}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="lg:col-span-3 space-y-3">
                    {post.status === "Pending" && (
                      <div className="flex flex-col gap-2">
                        <Button size="sm" onClick={() => handleAction(post.id, "Resolved")} className="w-full">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Resolve Reports
                        </Button>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" className="w-full bg-transparent">
                              <Mail className="w-4 h-4 mr-1" />
                              Send Warning
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Send Warning to {post.author}</DialogTitle>
                              <DialogDescription>
                                Send a warning about community guidelines violation.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">Warning Type:</label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select warning type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="inappropriate">Inappropriate Content</SelectItem>
                                    <SelectItem value="spam">Spam/Promotional</SelectItem>
                                    <SelectItem value="cultural">Cultural Insensitivity</SelectItem>
                                    <SelectItem value="guidelines">Community Guidelines</SelectItem>
                                    <SelectItem value="custom">Custom Warning</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <Textarea
                                placeholder="Enter warning message..."
                                value={warningMessage}
                                onChange={(e) => setWarningMessage(e.target.value)}
                                className="min-h-[100px]"
                              />
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setWarningMessage("")}>
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() => {
                                    handleAction(post.id, "Warning Sent")
                                    setWarningMessage("")
                                  }}
                                >
                                  Send Warning
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="destructive" className="w-full">
                              <Trash2 className="w-4 h-4 mr-1" />
                              Remove Post
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Remove Post</DialogTitle>
                              <DialogDescription>
                                This action will permanently remove the post from the platform.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">Removal Reason:</label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select removal reason" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="inappropriate">Inappropriate Content</SelectItem>
                                    <SelectItem value="spam">Spam/Commercial</SelectItem>
                                    <SelectItem value="cultural">Cultural Insensitivity</SelectItem>
                                    <SelectItem value="false">False Information</SelectItem>
                                    <SelectItem value="harassment">Harassment</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <Textarea
                                placeholder="Additional notes (optional)..."
                                value={actionReason}
                                onChange={(e) => setActionReason(e.target.value)}
                                className="min-h-[80px]"
                              />
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setActionReason("")}>
                                  Cancel
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() => {
                                    handleAction(post.id, "Removed", actionReason)
                                    setActionReason("")
                                  }}
                                >
                                  Remove Post
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAction(post.id, "Resolved")}
                          className="w-full"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Dismiss Reports
                        </Button>
                      </div>
                    )}

                    {post.status !== "Pending" && (
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Status: {post.status}</p>
                        {post.actionReason && <p className="text-xs text-gray-500 mt-1">Reason: {post.actionReason}</p>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* View Full Post Dialog */}
      <Dialog open={viewingPost !== null} onOpenChange={() => setViewingPost(null)}>
        <DialogContent className="max-w-7xl w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Journey Post Details</DialogTitle>
            <DialogDescription>
              {viewingPost && `Posted by ${viewingPost.author} in ${viewingPost.location}`}
            </DialogDescription>
          </DialogHeader>
          {viewingPost && (
            <div className="space-y-6">
              {/* Journey Header */}
              <div className="relative">
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={viewingPost.images[currentImageIndex] || "/placeholder.svg"}
                    alt={viewingPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {viewingPost.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
                      onClick={nextImage}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                      {viewingPost.images.map((_, imgIndex) => (
                        <div
                          key={imgIndex}
                          className={`w-2 h-2 rounded-full ${
                            currentImageIndex === imgIndex ? "bg-white" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Journey Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">{viewingPost.location}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{viewingPost.title}</h3>
                    <p className="text-gray-600">{viewingPost.fullDescription}</p>
                  </div>

                  {/* Journey Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">{viewingPost.duration}</span>
                      </div>
                      <p className="text-xs text-gray-600">Duration</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg text-center">
                      <div className="flex items-center justify-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-500" />
                        <span className="font-medium">{viewingPost.budget}</span>
                      </div>
                      <p className="text-xs text-gray-600">Budget</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg text-center">
                      <div className="flex items-center justify-center gap-2">
                        <MapPin className="w-4 h-4 text-purple-500" />
                        <span className="font-medium">{viewingPost.places.length}</span>
                      </div>
                      <p className="text-xs text-gray-600">Places</p>
                    </div>
                  </div>

                  {/* Hashtags */}
                  <div>
                    <h4 className="font-medium mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-1">
                      {viewingPost.hashtags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* Engagement Stats */}
                  <div>
                    <h4 className="font-medium mb-2">Engagement</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-red-500" />
                          <span className="font-medium">{viewingPost.likes}</span>
                        </div>
                        <p className="text-xs text-gray-600">Likes</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">{viewingPost.comments}</span>
                        </div>
                        <p className="text-xs text-gray-600">Comments</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Share2 className="w-4 h-4 text-green-500" />
                          <span className="font-medium">{viewingPost.shares}</span>
                        </div>
                        <p className="text-xs text-gray-600">Shares</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-purple-500" />
                          <span className="font-medium">{viewingPost.views}</span>
                        </div>
                        <p className="text-xs text-gray-600">Views</p>
                      </div>
                    </div>
                  </div>

                  {/* Author Info */}
                  <div>
                    <h4 className="font-medium mb-2">Author</h4>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{viewingPost.author}</p>
                            {viewingPost.authorStats.verifiedTraveler && (
                              <CheckCircle className="w-4 h-4 text-blue-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{viewingPost.authorEmail}</p>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                        <span className="text-gray-600">{viewingPost.authorStats.totalPosts} posts</span>
                        <span className="text-gray-600">{viewingPost.authorStats.followers} followers</span>
                        <span className="text-gray-600">{viewingPost.authorStats.accountAge} account</span>
                        <span className="text-gray-600">{viewingPost.authorStats.warnings} warnings</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Places */}
              <div>
                <h4 className="font-medium mb-3">Journey Places</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {viewingPost.places.map((place, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium">{place.name}</h5>
                        <Badge variant="outline" className="text-xs">
                          Day {place.day}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <p className="text-gray-600 mb-1">Activities:</p>
                          <div className="flex flex-wrap gap-1">
                            {place.activities.map((activity, actIdx) => (
                              <Badge key={actIdx} variant="outline" className="text-xs">
                                {activity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-green-600 font-medium">Budget: {place.budget}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Travel Tips */}
              <div>
                <h4 className="font-medium mb-3">Travel Tips</h4>
                <div className="space-y-2">
                  {viewingPost.tips.map((tip, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-blue-800">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Report Information */}
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-medium text-red-800 mb-2">Report Information</h4>
                <p className="text-sm text-red-700 mb-2">
                  <strong>Primary Reason:</strong> {viewingPost.reportReason}
                </p>
                <p className="text-sm text-red-700 mb-2">
                  <strong>Details:</strong> {viewingPost.reportDetails}
                </p>
                <p className="text-sm text-red-700">
                  <strong>Reported by:</strong> {viewingPost.reportInfo.reporters.join(", ")}
                </p>
                {viewingPost.reportInfo.reasons.length > 1 && (
                  <div className="mt-2">
                    <p className="text-sm text-red-700 mb-1">All reported reasons:</p>
                    <div className="flex flex-wrap gap-1">
                      {viewingPost.reportInfo.reasons.map((reason, idx) => (
                        <Badge key={idx} variant="destructive" className="text-xs">
                          {reason}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons in Dialog */}
              {viewingPost.status === "Pending" && (
                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    onClick={() => {
                      handleAction(viewingPost.id, "Resolved")
                      setViewingPost(null)
                    }}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Resolve Reports
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowModerationDialog(true)
                      setModerationAction("warning")
                    }}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Warning
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setShowModerationDialog(true)
                      setModerationAction("remove")
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove Post
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleAction(viewingPost.id, "Resolved")
                      setViewingPost(null)
                    }}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Dismiss Reports
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AdminModerationDashboard
