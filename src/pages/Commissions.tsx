import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Users, 
  Download,
  Search,
  Filter,
  RefreshCw,
  CheckCircle,
  CreditCard,
  Building2,
  AlertTriangle,
  Clock,
  Eye,
  Edit,
  ArrowUpRight,
  Activity
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatsWidget } from '@/components/dashboard/StatsWidget';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/lib/utils';

interface CommissionData {
  id: string;
  serviceProvider: string;
  providerType: string;
  amount: number;
  percentage: number;
  date: string;
  status: 'paid' | 'pending' | 'processing' | 'failed';
  transactionId: string;
  revenue: number;
  businessRegNo: string;
  paymentMethod: string;
  customerCount: number;
}

const Commissions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCommissions, setSelectedCommissions] = useState<string[]>([]);
  const navigate = useNavigate();

  // Mock data
  const commissions: CommissionData[] = [
    {
      id: '1',
      serviceProvider: 'Sunset Beach Resort',
      providerType: 'Hotel',
      amount: 1250.00,
      percentage: 12.5,
      date: '2024-01-15',
      status: 'paid',
      transactionId: 'TXN001',
      revenue: 10000.00,
      businessRegNo: 'FL-HTL-2024-001',
      paymentMethod: 'Bank Transfer',
      customerCount: 45
    },
    {
      id: '2',
      serviceProvider: 'Mountain Adventure Tours',
      providerType: 'Tour Operator',
      amount: 850.00,
      percentage: 10.0,
      date: '2024-01-14',
      status: 'pending',
      transactionId: 'TXN002',
      revenue: 8500.00,
      businessRegNo: 'CO-TOR-2024-045',
      paymentMethod: 'PayPal',
      customerCount: 28
    },
    {
      id: '3',
      serviceProvider: 'Urban Eats Restaurant',
      providerType: 'Restaurant',
      amount: 2100.00,
      percentage: 15.0,
      date: '2024-01-13',
      status: 'processing',
      transactionId: 'TXN003',
      revenue: 14000.00,
      businessRegNo: 'NY-RST-2024-089',
      paymentMethod: 'Direct Deposit',
      customerCount: 156
    },
    {
      id: '4',
      serviceProvider: 'Coastal Car Rentals',
      providerType: 'Transport',
      amount: 675.00,
      percentage: 8.5,
      date: '2024-01-12',
      status: 'paid',
      transactionId: 'TXN004',
      revenue: 7941.18,
      businessRegNo: 'CA-TRP-2024-156',
      paymentMethod: 'Bank Transfer',
      customerCount: 22
    },
    {
      id: '5',
      serviceProvider: 'Heritage Walking Tours',
      providerType: 'Tour Guide',
      amount: 425.00,
      percentage: 12.0,
      date: '2024-01-11',
      status: 'failed',
      transactionId: 'TXN005',
      revenue: 3541.67,
      businessRegNo: 'MA-GID-2024-023',
      paymentMethod: 'Credit Card',
      customerCount: 18
    },
    {
      id: '6',
      serviceProvider: 'Paradise Spa & Wellness',
      providerType: 'Spa',
      amount: 950.00,
      percentage: 18.0,
      date: '2024-01-10',
      status: 'paid',
      transactionId: 'TXN006',
      revenue: 5277.78,
      businessRegNo: 'AZ-SPA-2024-067',
      paymentMethod: 'Direct Deposit',
      customerCount: 34
    },
    {
      id: '7',
      serviceProvider: 'Downtown Luxury Hotel',
      providerType: 'Hotel',
      amount: 3200.00,
      percentage: 16.0,
      date: '2024-01-09',
      status: 'paid',
      transactionId: 'TXN007',
      revenue: 20000.00,
      businessRegNo: 'IL-HTL-2024-034',
      paymentMethod: 'Bank Transfer',
      customerCount: 89
    },
    {
      id: '8',
      serviceProvider: 'Golden Gate Tours',
      providerType: 'Tour Operator',
      amount: 1480.00,
      percentage: 11.5,
      date: '2024-01-08',
      status: 'pending',
      transactionId: 'TXN008',
      revenue: 12869.57,
      businessRegNo: 'CA-TOR-2024-078',
      paymentMethod: 'PayPal',
      customerCount: 67
    }
  ];

  useEffect(() => {
    if (!auth.isAdminLoggedIn()) {
      navigate('/login');
      return;
    }
    loadCommissions();
  }, [navigate]);

  const loadCommissions = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      toast.error('Failed to load commission data');
    } finally {
      setLoading(false);
    }
  };

  const refreshCommissions = async () => {
    try {
      setRefreshing(true);
      await loadCommissions();
      toast.success('Commission data refreshed');
    } catch (error) {
      toast.error('Failed to refresh data');
    } finally {
      setRefreshing(false);
    }
  };

  const exportCommissions = () => {
    toast.info('Exporting commission data...');
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Provider,Type,Commission,Percentage,Revenue,Status,Date,Transaction ID\n"
      + filteredCommissions.map(c => 
          `${c.serviceProvider},${c.providerType},${c.amount},${c.percentage}%,${c.revenue},${c.status},${c.date},${c.transactionId}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `commissions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const processPayment = (commissionId: string) => {
    toast.success(`Processing payment for commission ${commissionId}`);
  };

  const bulkProcessPayments = () => {
    if (selectedCommissions.length === 0) {
      toast.error('Please select commissions to process');
      return;
    }
    toast.success(`Processing ${selectedCommissions.length} payments`);
    setSelectedCommissions([]);
  };

  const toggleCommissionSelection = (id: string) => {
    setSelectedCommissions(prev =>
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // Calculate stats
  const stats = {
    totalCommissions: commissions.reduce((sum, commission) => sum + commission.amount, 0),
    thisMonthCommissions: commissions
      .filter(c => new Date(c.date).getMonth() === new Date().getMonth())
      .reduce((sum, commission) => sum + commission.amount, 0),
    pendingCommissions: commissions.filter(c => c.status === 'pending').length,
    activeProviders: commissions.length,
    pendingAmount: commissions.filter(c => c.status === 'pending').reduce((sum, c) => sum + c.amount, 0)
  };

  const filteredCommissions = commissions.filter(commission => {
    const matchesSearch = commission.serviceProvider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commission.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commission.businessRegNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || commission.status === statusFilter;
    const matchesType = typeFilter === 'all' || commission.providerType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'processing': return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'failed': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const statsWidgets = [
    {
      title: 'Total Commissions',
      value: `Rs ${stats.totalCommissions.toLocaleString()}`,
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: <DollarSign className="w-6 h-6" />,
      description: 'All time earnings'
    },
    {
      title: 'This Month',
      value: `Rs ${stats.thisMonthCommissions.toLocaleString()}`,
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: <TrendingUp className="w-6 h-6" />,
      description: 'Current month earnings'
    },
    {
      title: 'Pending Amount',
      value: `Rs ${stats.pendingAmount.toLocaleString()}`,
      change: `${stats.pendingCommissions} payments`,
      changeType: 'neutral' as const,
      icon: <Clock className="w-6 h-6" />,
      description: 'Awaiting processing'
    },
    {
      title: 'Active Providers',
      value: stats.activeProviders.toString(),
      change: '+3 this week',
      changeType: 'positive' as const,
      icon: <Building2 className="w-6 h-6" />,
      description: 'Total service providers'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0088cc] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Commission Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col">
      {/* Header Bar */}
      <div className="bg-white shadow-sm border-b px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-[#0088cc] rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Commission Management</h1>
              <p className="text-sm text-gray-600">Monitor and manage service provider commissions</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600">Payment System Active</span>
            </div>
            
            {selectedCommissions.length > 0 && (
              <Button 
                onClick={bulkProcessPayments}
                size="sm"
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Process {selectedCommissions.length} Selected
              </Button>
            )}
            
            <Button 
              onClick={refreshCommissions}
              variant="outline"
              size="sm"
              disabled={refreshing}
              className="text-gray-600 border-gray-300 hover:bg-gray-100"
            >
              {refreshing ? (
                <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-1" />
              )}
              Refresh
            </Button>
            
            <Button 
              onClick={exportCommissions}
              size="sm"
              className="bg-[#2953A6] hover:bg-[#2953A6]/90 text-white"
            >
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Commission Banner */}
      <div className="bg-gradient-to-r from-[#2953A6] to-[#07C7F2] px-8 py-6">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Commission Overview</h2>
              <p className="text-blue-100">Total Revenue: Rs {commissions.reduce((sum, c) => sum + c.revenue, 0).toLocaleString()}</p>
              <div className="flex items-center mt-2 space-x-3">
                <Badge className="bg-white/20 text-white border-white/30">
                  Active Providers: {stats.activeProviders}
                </Badge>
                <Badge className={`${stats.pendingCommissions > 0 ? 'bg-yellow-500/80' : 'bg-green-500/80'} text-white`}>
                  {stats.pendingCommissions > 0 ? `${stats.pendingCommissions} Pending` : 'All Processed'}
                </Badge>
                <Badge className="bg-green-500/80 text-white">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +12.5% Growth
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-100">Commission Rate</div>
            <div className="text-lg font-semibold">8.5% - 18.0%</div>
            <div className="text-sm text-blue-200">
              Average: {(commissions.reduce((sum, c) => sum + c.percentage, 0) / commissions.length).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Fixed Height */}
      <div className="flex-1 p-8 overflow-hidden">
        <div className="h-full flex flex-col space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsWidgets.map((stat, index) => (
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

          {/* Filters */}
          <Card className="p-4 shadow-md border-0 bg-white">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search providers, transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2953A6] w-full md:w-64"
                  />
                </div>
                
                <div className="flex gap-3">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2953A6] appearance-none bg-white"
                    >
                      <option value="all">All Status</option>
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>

                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2953A6] appearance-none bg-white"
                  >
                    <option value="all">All Types</option>
                    <option value="Hotel">Hotels</option>
                    <option value="Restaurant">Restaurants</option>
                    <option value="Tour Operator">Tour Operators</option>
                    <option value="Transport">Transport</option>
                    <option value="Spa">Spas</option>
                    <option value="Tour Guide">Tour Guides</option>
                  </select>
                </div>
              </div>
              
              <div className="text-sm text-gray-500">
                {filteredCommissions.length} of {commissions.length} commissions
              </div>
            </div>
          </Card>

          {/* Main Content Area - Split Layout */}
          <div className="flex-1 grid grid-cols-1 xl:grid-cols-3 gap-6 min-h-0">
            {/* Commission Table - Takes 2/3 of space */}
            <Card className="xl:col-span-2 shadow-md border-0 bg-white flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2953A6]/10 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-[#2953A6]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Commission Transactions</h3>
                    <p className="text-sm text-gray-600">Recent commission records</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-4">
                  {filteredCommissions.map((commission) => (
                    <div key={commission.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {commission.status === 'pending' && (
                            <input
                              type="checkbox"
                              checked={selectedCommissions.includes(commission.id)}
                              onChange={() => toggleCommissionSelection(commission.id)}
                              className="rounded border-gray-300 text-[#2953A6] focus:ring-[#2953A6]"
                            />
                          )}
                          <div className="w-10 h-10 bg-[#2953A6] rounded-full flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{commission.serviceProvider}</div>
                            <div className="text-sm text-gray-500">{commission.providerType} • {commission.businessRegNo}</div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">Rs {commission.amount.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">{commission.percentage}% of Rs {commission.revenue.toLocaleString()}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(commission.status)}`}>
                            {getStatusIcon(commission.status)}
                            <span className="ml-1 capitalize">{commission.status}</span>
                          </span>
                          <span className="text-sm text-gray-500">{commission.transactionId}</span>
                          <span className="text-sm text-gray-500">{new Date(commission.date).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="flex space-x-2">
                          {commission.status === 'pending' && (
                            <Button 
                              size="sm" 
                              className="bg-green-500 hover:bg-green-600 text-white"
                              onClick={() => processPayment(commission.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Process
                            </Button>
                          )}
                          {commission.status === 'failed' && (
                            <Button 
                              size="sm" 
                              className="bg-red-500 hover:bg-red-600 text-white"
                              onClick={() => processPayment(commission.id)}
                            >
                              <RefreshCw className="w-4 h-4 mr-1" />
                              Retry
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toast.info(`Viewing details for ${commission.serviceProvider}`)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {filteredCommissions.length === 0 && (
                    <div className="text-center py-8">
                      <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No commissions found</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Sidebar - Takes 1/3 of space */}
            <div className="space-y-6">
              {/* Top Performers */}
              <Card className="p-6 shadow-md border-0 bg-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Top Performers</h3>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {commissions
                    .sort((a, b) => b.amount - a.amount)
                    .slice(0, 3)
                    .map((commission, index) => (
                    <div key={commission.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{commission.serviceProvider}</p>
                          <p className="text-xs text-gray-500">{commission.providerType}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 text-sm">Rs {commission.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6 shadow-md border-0 bg-white">
                <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 gap-3">
                  <Button 
                    className="bg-[#2953A6] hover:bg-[#2953A6]/90 text-white justify-start"
                    onClick={() => toast.info('Processing all pending payments')}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Process All Pending
                  </Button>
                  <Button 
                    className="bg-[#07C7F2] hover:bg-[#07C7F2]/90 text-white justify-start"
                    onClick={() => toast.info('Generating report')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button 
                    className="bg-green-500 hover:bg-green-600 text-white justify-start"
                    onClick={() => toast.info('Setting up auto payments')}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Auto Payments
                  </Button>
                </div>
              </Card>

              {/* Quick Stats */}
              <Card className="p-6 shadow-md border-0 bg-white">
                <h3 className="font-bold text-gray-900 mb-4">Payment Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Completed</span>
                    <span className="text-sm font-medium text-green-600">
                      {commissions.filter(c => c.status === 'paid').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Pending</span>
                    <span className="text-sm font-medium text-yellow-600">
                      {commissions.filter(c => c.status === 'pending').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Processing</span>
                    <span className="text-sm font-medium text-blue-600">
                      {commissions.filter(c => c.status === 'processing').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Failed</span>
                    <span className="text-sm font-medium text-red-600">
                      {commissions.filter(c => c.status === 'failed').length}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commissions;