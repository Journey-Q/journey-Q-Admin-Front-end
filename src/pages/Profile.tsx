import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Save, 
  X,
  Shield,
  Calendar,
  Clock,
  Key,
  RefreshCw,
  CheckCircle
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { auth, adminAPI } from '@/lib/utils';

interface AdminData {
  id: number;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

interface ProfileFormData {
  username: string;
  email: string;
  phone: string;
  location: string;
}

const Profile: React.FC = () => {
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const [profileForm, setProfileForm] = useState<ProfileFormData>({
    username: '',
    email: '',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY'
  });

  const [editForm, setEditForm] = useState<ProfileFormData>(profileForm);

  useEffect(() => {
    if (!auth.isAdminLoggedIn()) {
      navigate('/login');
      return;
    }
    loadAdminProfile();
  }, [navigate]);

  const loadAdminProfile = async () => {
    try {
      setLoading(true);
      
      const localAdminData = auth.getAdminData();
      if (localAdminData) {
        setAdminData(localAdminData);
        setProfileForm({
          username: localAdminData.username,
          email: localAdminData.email,
          phone: '+1 (555) 123-4567',
          location: 'New York, NY'
        });
      }

      const profileData = await adminAPI.getProfile();
      setAdminData(profileData);
      setProfileForm({
        username: profileData.username,
        email: profileData.email,
        phone: '+1 (555) 123-4567',
        location: 'New York, NY'
      });
      
    } catch (error) {
      console.error('Failed to load profile:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditForm(profileForm);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      // Here you would call your API to update the profile
      // await adminAPI.updateProfile(editForm);
      
      setProfileForm(editForm);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditForm(profileForm);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const refreshProfile = async () => {
    await loadAdminProfile();
    toast.success('Profile refreshed successfully');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0088cc] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header Bar */}
      <div className="bg-white shadow-sm border-b px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-[#0088cc] rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Profile Management</h1>
              <p className="text-sm text-gray-600">Manage your account settings and personal information</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Refresh Button */}
            <Button 
              onClick={refreshProfile}
              variant="outline"
              size="sm"
              className="text-gray-600 border-gray-300 hover:bg-gray-100"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </Button>
            
            {/* Edit/Save/Cancel Buttons */}
            {!isEditing ? (
              <Button 
                onClick={handleEdit}
                size="sm"
                className="bg-[#2953A6] hover:bg-[#2953A6]/90 text-white"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit Profile
              </Button>
            ) : (
              <>
                <Button 
                  onClick={handleSave}
                  size="sm"
                  disabled={saving}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  {saving ? (
                    <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-1" />
                  )}
                  Save
                </Button>
                <Button 
                  onClick={handleCancel}
                  variant="outline"
                  size="sm"
                  className="text-gray-600 border-gray-300 hover:bg-gray-100"
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Profile Banner */}
      {adminData && (
        <div className="bg-gradient-to-r from-[#2953A6] to-[#07C7F2] px-8 py-6">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{adminData.username}</h2>
                <p className="text-blue-100">{adminData.email}</p>
                <div className="flex items-center mt-2 space-x-3">
                  <Badge className="bg-white/20 text-white border-white/30">
                    ID: {adminData.id}
                  </Badge>
                  <Badge className={adminData.isActive ? "bg-green-500/80 text-white" : "bg-red-500/80 text-white"}>
                    {adminData.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  <span className="text-sm text-blue-100">
                    Admin since {new Date(adminData.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-100">Profile Status</div>
              <div className="text-lg font-semibold">Complete</div>
              <div className="text-sm text-blue-200">
                Last updated: Today
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Content */}
      <div className="p-8 space-y-8">
        {/* Personal Information Card */}
        <Card className="p-6 shadow-md border-0 bg-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#2953A6]/10 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-[#2953A6]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
              <p className="text-gray-600">Update your personal details and contact information</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2953A6] focus:border-transparent"
                      placeholder="Enter username"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-900 font-medium">{profileForm.username}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2953A6] focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-900 font-medium">{profileForm.email}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2953A6] focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-900 font-medium">{profileForm.phone}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2953A6] focus:border-transparent"
                      placeholder="Enter location"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-900 font-medium">{profileForm.location}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Account Information Card */}
        <Card className="p-6 shadow-md border-0 bg-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Account Information</h3>
              <p className="text-gray-600">View your account details and role information</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg">
                  <Badge className="bg-[#2953A6] text-white">
                    {adminData?.role || 'Admin'}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-900 font-medium">
                    {adminData ? new Date(adminData.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg">
                  <Badge className={adminData?.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {adminData?.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Security Settings Card */}
        <Card className="p-6 shadow-md border-0 bg-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
              <Key className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Security Settings</h3>
              <p className="text-gray-600">Manage your account security and authentication</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h4 className="font-semibold text-gray-900 mb-2">Password Security</h4>
              <p className="text-sm text-gray-600 mb-4">Update your password to keep your account secure</p>
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                <Key className="w-4 h-4 mr-2" />
                Change Password
              </Button>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-2">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600 mb-4">Add an extra layer of security to your account</p>
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
                <CheckCircle className="w-4 h-4 mr-2" />
                Enable 2FA
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;