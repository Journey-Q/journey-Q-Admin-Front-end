import { useState, useEffect } from 'react';
import { StatsWidget } from '@/components/dashboard/StatsWidget';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Building2, Shield, CreditCard, AlertTriangle, TrendingUp, Star, CheckCircle, Flag, LogOut, RefreshCw } from 'lucide-react';
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
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    if (!auth.isAdminLoggedIn()) {
      navigate('/login');
      return;
    }

    loadAdminProfile();
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
      value: '24,847',
      change: '',
      changeType: 'positive' as const,
      icon: <Users className="w-6 h-6" />,
      description: ''
    },
    {
      title: 'Service Providers',
      value: '2,156',
      change: '',
      changeType: 'positive' as const,
      icon: <Building2 className="w-6 h-6" />,
      description: ''
    },
    {
      title: 'Monthly Revenue',
      value: 'Rs186,420',
      change: '',
      changeType: 'positive' as const,
      icon: <CreditCard className="w-6 h-6" />,
      description: ''
    },
  ];

  const recentApprovals = [
    { 
      name: 'Sunset Beach Resort',
      type: 'Hotel',
      address: '1234 Ocean Drive, Miami Beach, FL 33139',
      businessRegNo: 'FL-HTL-2024-001',
      submittedDate: '2 days ago',
      status: 'pending'
    },
    { 
      name: 'Mountain Adventure Tours',
      type: 'Tour Operator',
      address: '567 Alpine Way, Denver, CO 80202',
      businessRegNo: 'CO-TOR-2024-045',
      submittedDate: '3 days ago',
      status: 'approved'
    },
    { 
      name: 'Urban Eats Restaurant',
      type: 'Restaurant',
      address: '890 Broadway Ave, New York, NY 10003',
      businessRegNo: 'NY-RST-2024-089',
      submittedDate: '4 days ago',
      status: 'pending'
    },
    { 
      name: 'Coastal Car Rentals',
      type: 'Transport',
      address: '321 Harbor Blvd, San Diego, CA 92101',
      businessRegNo: 'CA-TRP-2024-156',
      submittedDate: '5 days ago',
      status: 'under_review'
    },
    { 
      name: 'Heritage Walking Tours',
      type: 'Tour Guide',
      address: '456 Freedom Trail, Boston, MA 02108',
      businessRegNo: 'MA-GID-2024-023',
      submittedDate: '1 week ago',
      status: 'approved'
    },
    { 
      name: 'Paradise Spa & Wellness',
      type: 'Spa',
      address: '789 Serenity Lane, Sedona, AZ 86336',
      businessRegNo: 'AZ-SPA-2024-067',
      submittedDate: '1 week ago',
      status: 'pending'
    },
    { 
      name: 'Downtown Luxury Hotel',
      type: 'Hotel',
      address: '123 Metropolitan St, Chicago, IL 60601',
      businessRegNo: 'IL-HTL-2024-034',
      submittedDate: '2 weeks ago',
      status: 'under_review'
    },
    { 
      name: 'Golden Gate Tours',
      type: 'Tour Operator',
      address: '654 Bay Street, San Francisco, CA 94133',
      businessRegNo: 'CA-TOR-2024-078',
      submittedDate: '2 weeks ago',
      status: 'approved'
    }
  ];

  const userReports = [
    { 
      reportId: '#RPT-2024-156',
      reportedUser: 'john_traveler23',
      reportedBy: 'sarah_explorer',
      reason: 'Inappropriate Content',
      type: 'Content Violation',
      severity: 'high',
      submittedDate: '1 hour ago',
      status: 'pending'
    },
    { 
      reportId: '#RPT-2024-155',
      reportedUser: 'fake_hotel_acc',
      reportedBy: 'mike_reviewer',
      reason: 'Fake Reviews',
      type: 'Review Manipulation',
      severity: 'medium',
      submittedDate: '3 hours ago',
      status: 'investigating'
    },
    { 
      reportId: '#RPT-2024-154',
      reportedUser: 'spam_promoter',
      reportedBy: 'admin_system',
      reason: 'Spam Activities',
      type: 'Spam/Bot Activity',
      severity: 'high',
      submittedDate: '5 hours ago',
      status: 'resolved'
    },
    { 
      reportId: '#RPT-2024-153',
      reportedUser: 'rude_customer',
      reportedBy: 'hotel_manager_01',
      reason: 'Harassment',
      type: 'User Behavior',
      severity: 'medium',
      submittedDate: '8 hours ago',
      status: 'pending'
    },
    { 
      reportId: '#RPT-2024-152',
      reportedUser: 'scammer_profile',
      reportedBy: 'victim_user',
      reason: 'Fraudulent Activity',
      type: 'Fraud/Scam',
      severity: 'high',
      submittedDate: '12 hours ago',
      status: 'investigating'
    },
    { 
      reportId: '#RPT-2024-151',
      reportedUser: 'bot_account_xyz',
      reportedBy: 'security_system',
      reason: 'Automated Posting',
      type: 'Bot Activity',
      severity: 'medium',
      submittedDate: '15 hours ago',
      status: 'resolved'
    },
    { 
      reportId: '#RPT-2024-150',
      reportedUser: 'offensive_reviewer',
      reportedBy: 'hotel_staff_member',
      reason: 'Abusive Language',
      type: 'User Behavior',
      severity: 'high',
      submittedDate: '18 hours ago',
      status: 'pending'
    },
    { 
      reportId: '#RPT-2024-149',
      reportedUser: 'duplicate_listings',
      reportedBy: 'provider_complaint',
      reason: 'Multiple Accounts',
      type: 'Account Violation',
      severity: 'medium',
      submittedDate: '1 day ago',
      status: 'investigating'
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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
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
            {/* Connection Status */}
            {/* <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600">Backend Connected</span>
            </div> */}
            
            {/* API Test Button */}
            {/* <Button 
              onClick={testAPI}
              variant="outline"
              size="sm"
              disabled={apiTesting}
              className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
            >
              {apiTesting ? (
                <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <CheckCircle className="w-4 h-4 mr-1" />
              )}
              Test API
            </Button> */}
            
            {/* Refresh Profile */}
            {/* <Button 
              onClick={refreshProfile}
              variant="outline"
              size="sm"
              className="text-gray-600 border-gray-300 hover:bg-gray-100"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </Button> */}
            
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

      {/* Admin Profile Banner */}
      {/* {adminData && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
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
              <div className="text-sm text-blue-100">System Status</div>
              <div className="text-lg font-semibold">All Systems Operational</div>
              <div className="text-sm text-blue-200">
                Frontend: Port 8081 • Backend: Port 8080
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* Original Dashboard Content */}
      <div className="p-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Service Provider Approvals & User Reports */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
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
            
            <div className="h-80 overflow-y-auto space-y-4 pr-2">
              {recentApprovals.slice(0, 6).map((provider, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-gray-900">{provider.name}</h4>
                      <Badge className={`text-xs ${getStatusColor(provider.status)}`}>
                        {provider.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><span className="font-medium">Type:</span> {provider.type}</p>
                      <p><span className="font-medium">Address:</span> {provider.address}</p>
                      <p><span className="font-medium">Business Reg No:</span> {provider.businessRegNo}</p>
                      <p className="text-xs text-gray-500">Submitted {provider.submittedDate}</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-[#0088cc] hover:bg-[#1e3d7a] ml-4">
                    Review
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* User Reports */}
          <Card className="p-6 shadow-md border-0 bg-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                  <Flag className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">User Reports</h3>
                  <p className="text-gray-600">Recent user reports and violations</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white">
                View All
              </Button>
            </div>
            
            <div className="h-80 overflow-y-auto space-y-4 pr-2">
              {userReports.slice(0, 6).map((report, index) => (
                <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm">{report.reportId}</h4>
                      <Badge variant={getSeverityColor(report.severity)} className="text-xs">
                        {report.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><span className="font-medium">Reported User:</span> {report.reportedUser}</p>
                      <p><span className="font-medium">Reason:</span> {report.reason}</p>
                      <p><span className="font-medium">Type:</span> {report.type}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={`text-xs ${getStatusColor(report.status)}`}>
                          {report.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <span className="text-xs text-gray-500">{report.submittedDate}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white ml-4">
                    Investigate
                  </Button>
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