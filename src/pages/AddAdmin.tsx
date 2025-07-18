"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Shield, Trash2, Edit, Users, Eye, Mail, Calendar, X } from "lucide-react"

const AddAdmin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })

  // Mock existing admins
  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@journeyq.com",
      createdAt: "2024-02-20",
      lastLogin: "2024-07-09",
      avatar: "SJ",
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike@journeyq.com",
      createdAt: "2024-03-10",
      lastLogin: "2024-07-08",
      avatar: "MC",
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma@journeyq.com",
      createdAt: "2024-04-05",
      lastLogin: "2024-06-15",
      avatar: "EW",
    },
  ])

  const [showEditModal, setShowEditModal] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState(null)
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email) {
      alert("Please fill in all required fields")
      return
    }

    const newAdmin = {
      id: admins.length + 1,
      name: formData.name,
      email: formData.email,
      createdAt: new Date().toISOString().split("T")[0],
      lastLogin: "Never",
      avatar: formData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
    }

    setAdmins([...admins, newAdmin])
    setFormData({ name: "", email: "" })
    alert("Admin account created successfully!")
  }

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this admin account?")) {
      setAdmins(admins.filter((admin) => admin.id !== id))
      alert("Admin account deleted")
    }
  }

  const handleEditAdmin = (admin) => {
    setEditingAdmin(admin)
    setEditForm({
      name: admin.name,
      email: admin.email,
    })
    setShowEditModal(true)
  }

  const handleUpdateAdmin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!editForm.name || !editForm.email) {
      alert("Please fill in all required fields")
      return
    }

    setAdmins((prev) =>
      prev.map((admin) =>
        admin.id === editingAdmin.id ? { ...admin, name: editForm.name, email: editForm.email } : admin,
      ),
    )

    setShowEditModal(false)
    setEditingAdmin(null)
    setEditForm({ name: "", email: "" })
    alert("Admin account updated successfully!")
  }

  const handleCancelEdit = () => {
    setShowEditModal(false)
    setEditingAdmin(null)
    setEditForm({ name: "", email: "" })
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
            <Badge className="bg-[#0088cc]/10 text-[#0088cc]">{admins.length} Total Admins</Badge>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Add New Admin Form */}
        <div className="xl:col-span-1">
          <Card className="p-6 shadow-lg border-0 bg-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-[#0088cc]/10 rounded-lg flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-[#0088cc]" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Add New Admin</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                  className="focus:ring-2 focus:ring-[#0088cc] focus:border-transparent"
                  required
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
                  placeholder="admin@journeyq.com"
                  className="focus:ring-2 focus:ring-[#0088cc] focus:border-transparent"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-[#0088cc] hover:bg-blue-700 text-white">
                <UserPlus className="w-4 h-4 mr-2" />
                Create Admin Account
              </Button>
            </form>
          </Card>
        </div>

        {/* Existing Admins List */}
        <div className="xl:col-span-2">
          <Card className="p-6 shadow-lg border-0 bg-white">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Admin Accounts</h2>
              <Badge className="bg-blue-100 text-blue-800">{admins.length} Total</Badge>
            </div>

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
                        {admin.avatar}
                      </div>

                      <div className="flex-1">
                        {/* Name */}
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900 text-lg">{admin.name}</h3>
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
                            <span>Created: {admin.createdAt}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>Last login: {admin.lastLogin}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditAdmin(admin)}
                        className="hover:bg-blue-50 hover:border-blue-300 bg-transparent"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(admin.id)}
                        className="hover:bg-red-50 hover:border-red-300 text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {admins.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No admin accounts yet</h3>
                <p className="text-gray-500">Create your first admin account to get started.</p>
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
              <form onSubmit={handleUpdateAdmin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="edit-name" className="text-sm font-medium text-gray-700">
                    Full Name *
                  </Label>
                  <Input
                    id="edit-name"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    placeholder="Enter full name"
                    className="focus:ring-2 focus:ring-[#0088cc] focus:border-transparent"
                    required
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
                    placeholder="admin@journeyq.com"
                    className="focus:ring-2 focus:ring-[#0088cc] focus:border-transparent"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={handleCancelEdit} className="flex-1 bg-transparent">
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-[#0088cc] hover:bg-blue-700 text-white">
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