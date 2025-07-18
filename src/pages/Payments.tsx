import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Star,
  Percent,
  Crown,
  Search,
  Download,
  Eye,
  Calendar
} from 'lucide-react';
import { useState } from 'react';

const TravelPayments = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const stats = [
    {
      title: 'Monthly Revenue',
      value: 'Rs 4,250,000',
      change: '+23% from last month',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Active Subscriptions',
      value: '1,847',
      change: '+156 this month',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'TripFluencer Discounts',
      value: 'Rs 890,000',
      change: '+45% savings given',
      icon: <Percent className="w-6 h-6" />,
      color: 'bg-yellow-500'
    }
  ];

  const subscriptionPayments = [
    {
      id: 'SUB-2024-001',
      user: 'Nimali Perera',
      email: 'nimali.p@email.com',
      plan: 'Monthly Premium',
      originalAmount: 'Rs 2,500',
      discountApplied: '0%',
      finalAmount: 'Rs 2,500',
      pointsUsed: 0,
      status: 'Active',
      paymentMethod: 'Credit Card',
      startDate: '2024-03-15',
      nextBilling: '2024-04-15',
      isTripFluencer: false
    },
    {
      id: 'SUB-2024-002',
      user: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      plan: 'Monthly Premium',
      originalAmount: 'Rs 2,500',
      discountApplied: '50%',
      finalAmount: 'Rs 1,250',
      pointsUsed: 50,
      status: 'Active',
      paymentMethod: 'Digital Wallet',
      startDate: '2024-03-14',
      nextBilling: '2024-04-14',
      isTripFluencer: true
    },
    {
      id: 'SUB-2024-003',
      user: 'Kasun Silva',
      email: 'kasun.s@email.com',
      plan: 'Monthly Premium',
      originalAmount: 'Rs 2,500',
      discountApplied: '0%',
      finalAmount: 'Rs 2,500',
      pointsUsed: 0,
      status: 'Active',
      paymentMethod: 'Bank Transfer',
      startDate: '2024-03-13',
      nextBilling: '2024-04-13',
      isTripFluencer: false
    },
    {
      id: 'SUB-2024-004',
      user: 'Mike Chen',
      email: 'mike.chen@email.com',
      plan: 'Monthly Premium',
      originalAmount: 'Rs 2,500',
      discountApplied: '80%',
      finalAmount: 'Rs 500',
      pointsUsed: 80,
      status: 'Active',
      paymentMethod: 'Credit Card',
      startDate: '2024-03-12',
      nextBilling: '2024-04-12',
      isTripFluencer: true
    },
    {
      id: 'SUB-2024-005',
      user: 'Ayesha Fernando',
      email: 'ayesha.f@email.com',
      plan: 'Monthly Premium',
      originalAmount: 'Rs 2,500',
      discountApplied: '0%',
      finalAmount: 'Rs 2,500',
      pointsUsed: 0,
      status: 'Expired',
      paymentMethod: 'Credit Card',
      startDate: '2024-02-15',
      nextBilling: '2024-03-15',
      isTripFluencer: false
    },
    {
      id: 'SUB-2024-006',
      user: 'David Kim',
      email: 'david.kim@email.com',
      plan: 'Monthly Premium',
      originalAmount: 'Rs 2,500',
      discountApplied: '100%',
      finalAmount: 'FREE',
      pointsUsed: 100,
      status: 'Active',
      paymentMethod: 'Points Redemption',
      startDate: '2024-03-11',
      nextBilling: '2024-04-11',
      isTripFluencer: true
    },
    {
      id: 'SUB-2024-007',
      user: 'Dilini Rajapaksa',
      email: 'dilini.r@email.com',
      plan: 'Monthly Premium',
      originalAmount: 'Rs 2,500',
      discountApplied: '0%',
      finalAmount: 'Rs 2,500',
      pointsUsed: 0,
      status: 'Active',
      paymentMethod: 'Digital Wallet',
      startDate: '2024-03-10',
      nextBilling: '2024-04-10',
      isTripFluencer: false
    },
    {
      id: 'SUB-2024-008',
      user: 'Emma Rodriguez',
      email: 'emma.r@email.com',
      plan: 'Monthly Premium',
      originalAmount: 'Rs 2,500',
      discountApplied: '25%',
      finalAmount: 'Rs 1,875',
      pointsUsed: 25,
      status: 'Active',
      paymentMethod: 'Credit Card',
      startDate: '2024-03-09',
      nextBilling: '2024-04-09',
      isTripFluencer: true
    }
  ];

  const tripFluencerDiscounts = [
    {
      id: 'TF-DISC-001',
      user: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      followers: '15,420',
      totalPointsEarned: 2450,
      pointsUsed: 50,
      discountAmount: 'Rs 1,250',
      originalPrice: 'Rs 2,500',
      finalPrice: 'Rs 1,250',
      discountPercentage: '50%',
      subscriptionDate: '2024-03-14',
      status: 'Active'
    },
    {
      id: 'TF-DISC-002',
      user: 'Mike Chen',
      email: 'mike.chen@email.com',
      followers: '28,650',
      totalPointsEarned: 4890,
      pointsUsed: 80,
      discountAmount: 'Rs 2,000',
      originalPrice: 'Rs 2,500',
      finalPrice: 'Rs 500',
      discountPercentage: '80%',
      subscriptionDate: '2024-03-12',
      status: 'Active'
    },
    {
      id: 'TF-DISC-003',
      user: 'David Kim',
      email: 'david.kim@email.com',
      followers: '18,920',
      totalPointsEarned: 3120,
      pointsUsed: 100,
      discountAmount: 'Rs 2,500',
      originalPrice: 'Rs 2,500',
      finalPrice: 'FREE',
      discountPercentage: '100%',
      subscriptionDate: '2024-03-11',
      status: 'Active'
    },
    {
      id: 'TF-DISC-004',
      user: 'Emma Rodriguez',
      email: 'emma.r@email.com',
      followers: '9,580',
      totalPointsEarned: 1250,
      pointsUsed: 25,
      discountAmount: 'Rs 625',
      originalPrice: 'Rs 2,500',
      finalPrice: 'Rs 1,875',
      discountPercentage: '25%',
      subscriptionDate: '2024-03-09',
      status: 'Active'
    },
    {
      id: 'TF-DISC-005',
      user: 'Maria Santos',
      email: 'maria.s@email.com',
      followers: '31,250',
      totalPointsEarned: 5670,
      pointsUsed: 75,
      discountAmount: 'Rs 1,875',
      originalPrice: 'Rs 2,500',
      finalPrice: 'Rs 625',
      discountPercentage: '75%',
      subscriptionDate: '2024-02-28',
      status: 'Expired'
    }
  ];

  const filteredSubscriptions = subscriptionPayments.filter(sub => {
    const matchesSearch = sub.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || sub.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const filteredDiscounts = tripFluencerDiscounts.filter(discount => {
    const matchesSearch = discount.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discount.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discount.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || discount.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
              <p className="text-gray-600">Monitor subscriptions and TripFluencer discount usage</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 bg-white shadow-lg border-0">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.color}/10 rounded-xl flex items-center justify-center`}>
                <div className={`${stat.color.replace('bg-', 'text-')}`}>
                  {stat.icon}
                </div>
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
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Subscription Payments
            </button>
            <button
              onClick={() => setActiveTab('discounts')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'discounts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              TripFluencer Discounts
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by user, email, or ID..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {activeTab === 'overview' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Subscription Payments</h3>
                  <p className="text-gray-600">All monthly premium subscription transactions</p>
                </div>
                <Button className="bg-blue-500 hover:bg-blue-600">
                  <Download className="w-4 h-4 mr-2" />
                  Export Subscriptions
                </Button>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subscription ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Original Amount</TableHead>
                      <TableHead>Discount</TableHead>
                      <TableHead>Final Amount</TableHead>
                      <TableHead>Points Used</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Next Billing</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubscriptions.map((subscription) => (
                      <TableRow key={subscription.id}>
                        <TableCell className="font-mono text-sm">{subscription.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div>
                              <p className="font-medium">{subscription.user}</p>
                              <p className="text-sm text-gray-500">{subscription.email}</p>
                            </div>
                            {subscription.isTripFluencer && (
                              <Crown className="w-4 h-4 text-yellow-500" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{subscription.originalAmount}</TableCell>
                        <TableCell>
                          <Badge variant={subscription.discountApplied === '0%' ? 'outline' : 'default'}>
                            {subscription.discountApplied}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium text-green-600">{subscription.finalAmount}</TableCell>
                        <TableCell>
                          {subscription.pointsUsed > 0 ? (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span>{subscription.pointsUsed}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(subscription.status)}>
                            {subscription.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{subscription.nextBilling}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {activeTab === 'discounts' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">TripFluencer Discount Usage</h3>
                  <p className="text-gray-600">Points-based discounts applied by TripFluencers</p>
                </div>
                <Button className="bg-yellow-500 hover:bg-yellow-600">
                  <Download className="w-4 h-4 mr-2" />
                  Export Discounts
                </Button>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Discount ID</TableHead>
                      <TableHead>TripFluencer</TableHead>
                      <TableHead>Followers</TableHead>
                      <TableHead>Points Used</TableHead>
                      <TableHead>Discount Amount</TableHead>
                      <TableHead>Original Price</TableHead>
                      <TableHead>Final Price</TableHead>
                      <TableHead>Discount %</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDiscounts.map((discount) => (
                      <TableRow key={discount.id}>
                        <TableCell className="font-mono text-sm">{discount.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Crown className="w-4 h-4 text-yellow-500" />
                            <div>
                              <p className="font-medium">{discount.user}</p>
                              <p className="text-sm text-gray-500">{discount.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{discount.followers}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="font-medium">{discount.pointsUsed}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-green-600">{discount.discountAmount}</TableCell>
                        <TableCell className="text-gray-500 line-through">{discount.originalPrice}</TableCell>
                        <TableCell className="font-medium text-blue-600">{discount.finalPrice}</TableCell>
                        <TableCell>
                          <Badge className="bg-yellow-100 text-yellow-800">
                            {discount.discountPercentage}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{discount.subscriptionDate}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(discount.status)}>
                            {discount.status}
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
    </div>
  );
};

export default TravelPayments;