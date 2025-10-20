import { useState, useEffect } from 'react';
import { StatsWidget } from '@/components/dashboard/StatsWidget';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Building2, Shield, CheckCircle, LogOut, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { adminAPI, auth } from '@/lib/utils';

interface AdminData {
  id: number;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

const Dashboard = () => {
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiTesting, setApiTesting] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProviders, setTotalProviders] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    if (!auth.isAdminLoggedIn()) {
      navigate('/login');
      return;
    }

    loadAdminProfile();
    loadUsersCount();
    loadProvidersCount();
  }, [navigate]);

  const loadAdminProfile = async () => {
    try {
      setLoading(true);

      // First try to get data from localStorage
      const localAdminData = auth.getAdminData();
      if (localAdminData) {
        setAdminData(localAdminData);
      }

      // Then fetch fresh data from API
      const profileData = await adminAPI.getProfile();
      setAdminData(profileData);

    } catch (error) {
      // console.error('Failed to load profile:', error);
      // toast.error('Failed to load profile data');

      // If API call fails due to unauthorized, logout and redirect
      if (error instanceof Error && (error.message.includes('Unauthorized') || error.message.includes('token'))) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const loadUsersCount = async () => {
    try {
      const response = await fetch('https://socialmediaservice-production-2b10.up.railway.app/auth/all');
      if (response.ok) {
        const users = await response.json();
        setTotalUsers(users.length);
      }
    } catch (error) {
      console.error('Failed to load users count:', error);
    }
  };

  const loadProvidersCount = async () => {
    try {
      const response = await fetch('https://serviceprovidersservice-production-8f10.up.railway.app/service/providers/all');
      if (response.ok) {
        const data = await response.json();
        setTotalProviders(data.totalProviders || 0);
      }
    } catch (error) {
      console.error('Failed to load providers count:', error);
    }
  };

  const handleLogout = () => {
    auth.logoutAdmin();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const testAPI = async () => {
    setApiTesting(true);
    try {
      const result = await adminAPI.test();
      toast.success('✅ Backend Connected: ' + result);
    } catch (error) {
      if (error instanceof Error) {
        toast.error('❌ Backend Error: ' + error.message);
      } else {
        toast.error('❌ Backend connection failed');
      }
    } finally {
      setApiTesting(false);
    }
  };

  const refreshProfile = async () => {
    try {
      const profileData = await adminAPI.getProfile();
      setAdminData(profileData);
      toast.success('Profile refreshed successfully');
    } catch (error) {
      toast.error('Failed to refresh profile');
    }
  };

  const stats = [
    {
      title: 'Total Users',
      value: totalUsers.toLocaleString(),
      change: '',
      changeType: 'positive' as const,
      icon: <Users className="w-6 h-6" />,
      description: 'Registered users'
    },
    {
      title: 'Service Providers',
      value: totalProviders.toLocaleString(),
      change: '',
      changeType: 'positive' as const,
      icon: <Building2 className="w-6 h-6" />,
      description: 'Active service providers'
    },
  ];

  // Real data from the image showing travel agent approvals
  const recentApprovals = [
    { 
      name: 'wanderlust_travels',
      email: 'info@wanderlusttravels.com',
      type: 'Travel Agent',
      businessRegNo: 'TA12345',
      phone: '0112345678',
      submittedDate: 'Oct 19, 2025',
      status: 'pending'
    },
    { 
      name: 'paradise_tours',
      email: 'contact@paradisetours.lk',
      type: 'Travel Agent',
      businessRegNo: 'TA67890',
      phone: '0773456789',
      submittedDate: 'Oct 19, 2025',
      status: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'investigating': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = (provider: any) => {
    toast.success(`Approved ${provider.name}`);
    // Add your approval logic here
  };

  const handleReject = (provider: any) => {
    toast.error(`Rejected ${provider.name}`);
    // Add your rejection logic here
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0088cc] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading JourneyQ Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Admin Header Bar */}
      <div className="bg-white shadow-sm border-b px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-[#0088cc] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">JourneyQ Admin Dashboard</h1>
              {adminData && (
                <p className="text-sm text-gray-600">
                  Welcome back, <span className="font-medium">{adminData.username}</span> • 
                  <Badge className="ml-2 bg-green-100 text-green-800 text-xs">
                    {adminData.role}
                  </Badge>
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Logout Button */}
            <Button 
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Original Dashboard Content */}
      <div className="p-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <StatsWidget
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
              icon={stat.icon}
              description={stat.description}
            />
          ))}
        </div>

        {/* Service Provider Approvals */}
        <div className="grid grid-cols-1 gap-8">
          {/* Recent Service Provider Approvals */}
          <Card className="p-6 shadow-md border-0 bg-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#2953A6]/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[#2953A6]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Recent Service Provider Approvals</h3>
                  <p className="text-gray-600">Latest provider applications and reviews</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-[#2953A6] border-[#2953A6] hover:bg-[#2953A6] hover:text-white">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentApprovals.map((provider, index) => (
                <div key={index} className="flex items-center justify-between p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <Shield className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{provider.name}</h4>
                          <p className="text-xs text-gray-500">{provider.email}</p>
                        </div>
                      </div>
                      <Badge className={`text-xs ${getStatusColor(provider.status)}`}>
                        {provider.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600">
                      <div>
                        <span className="font-medium text-gray-700">Type:</span>
                        <p className="text-purple-600 font-medium">{provider.type}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Reg No:</span>
                        <p>{provider.businessRegNo}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Phone:</span>
                        <p>{provider.phone}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Submitted:</span>
                        <p>{provider.submittedDate}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-6">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-gray-600 border-gray-300 hover:bg-gray-100"
                    >
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-[#0088cc] hover:bg-[#0077b3] text-white"
                      onClick={() => handleApprove(provider)}
                    >
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-red-600 border-red-300 hover:bg-red-50"
                      onClick={() => handleReject(provider)}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        
      </div>
    </div>
  );
};

export default Dashboard;