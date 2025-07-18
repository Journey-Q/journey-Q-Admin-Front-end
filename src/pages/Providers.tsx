import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, User, Bell, Calendar, Star, MapPin, Phone, Globe, 
  CheckCircle, Clock, Ban, Building, Navigation, Car, UserCheck, Users
} from 'lucide-react';

const Providers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [hoveredProvider, setHoveredProvider] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('approval');

  // Mock provider data with additional details
  const providers = [
    {
      id: 1,
      name: 'Grand Hotel Paradise',
      companyName: 'Grand Paradise Hospitality Pvt Ltd',
      email: 'contact@grandparadise.com',
      type: 'Hotel',
      status: 'Approved',
      joinDate: '2024-01-10',
      bookings: 156,
      rating: 4.8,
      location: 'Bali, Indonesia',
      address: 'Jl. Pantai Kuta No. 123, Kuta, Badung Regency, Bali 80361, Indonesia',
      phone: '+62 361 123 4567',
      website: 'www.grandparadise.com',
      businessRegNumber: 'ID-BRN-2023-456789',
      description: 'Luxury beachfront resort with world-class amenities',
      totalRooms: 150,
      amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym'],
      verifiedDate: '2024-01-15',
      lastActivity: '2024-07-07',
      revenue: 'Rs 45,890'
    },
    {
      id: 2,
      name: 'Adventure Tours Pro',
      companyName: 'Adventure Pro Trekking Company Ltd',
      email: 'info@adventurepro.com',
      type: 'Tour',
      status: 'Pending',
      joinDate: '2024-03-15',
      bookings: 0,
      rating: 0,
      location: 'Nepal',
      address: 'Thamel Marg, Ward No. 26, Kathmandu 44600, Nepal',
      phone: '+977 1 234 5678',
      website: 'www.adventurepro.com',
      businessRegNumber: 'NP-REG-2024-789123',
      description: 'Specialized in mountain trekking and adventure tours',
      totalTours: 25,
      amenities: ['Guides', 'Equipment', 'Safety Gear', 'Insurance'],
      verifiedDate: null,
      lastActivity: '2024-07-06',
      revenue: 'Rs 0'
    },
    {
      id: 3,
      name: 'City Transport Solutions',
      companyName: 'Bangkok City Transport Co., Ltd',
      email: 'booking@citytransport.com',
      type: 'Transport',
      status: 'Approved',
      joinDate: '2024-02-05',
      bookings: 89,
      rating: 4.5,
      location: 'Bangkok, Thailand',
      address: '456 Sukhumvit Road, Klongtoey, Bangkok 10110, Thailand',
      phone: '+66 2 123 4567',
      website: 'www.citytransport.com',
      businessRegNumber: 'TH-0105558123456',
      description: 'Professional airport and city transportation services',
      totalVehicles: 45,
      amenities: ['AC Vehicles', 'GPS Tracking', '24/7 Service', 'Insurance'],
      verifiedDate: '2024-02-10',
      lastActivity: '2024-07-07',
      revenue: 'Rs 23,450'
    },
    {
      id: 4,
      name: 'Luxury Resorts Chain',
      companyName: 'Maldivian Luxury Resorts International',
      email: 'reservations@luxurychain.com',
      type: 'Hotel',
      status: 'Suspended',
      joinDate: '2024-01-20',
      bookings: 234,
      rating: 4.2,
      location: 'Maldives',
      address: 'Malé 20026, Republic of Maldives',
      phone: '+960 123 4567',
      website: 'www.luxurychain.com',
      businessRegNumber: 'MV-NPO/2023/1234',
      description: 'Premium resort chain with overwater villas',
      totalRooms: 200,
      amenities: ['Private Beach', 'Spa', 'Fine Dining', 'Water Sports'],
      verifiedDate: '2024-01-25',
      lastActivity: '2024-06-15',
      revenue: 'Rs 67,890'
    },
    {
      id: 5,
      name: 'Cultural Heritage Tours',
      companyName: 'Peru Cultural Heritage S.A.C.',
      email: 'tours@heritage.com',
      type: 'Tour',
      status: 'Approved',
      joinDate: '2024-02-28',
      bookings: 67,
      rating: 4.9,
      location: 'Peru',
      address: 'Av. El Sol 123, Cusco 08002, Peru',
      phone: '+51 1 234 5678',
      website: 'www.heritage.com',
      businessRegNumber: 'PE-RUC-20567891234',
      description: 'Authentic cultural and historical tour experiences',
      totalTours: 18,
      amenities: ['Expert Guides', 'Small Groups', 'Cultural Immersion', 'Local Meals'],
      verifiedDate: '2024-03-05',
      lastActivity: '2024-07-05',
      revenue: 'Rs 19,670'
    },
    {
      id: 6,
      name: 'Mountain View Lodge',
      companyName: 'Alpine Mountain Hospitality AG',
      email: 'stay@mountainview.com',
      type: 'Hotel',
      status: 'Pending',
      joinDate: '2024-07-01',
      bookings: 0,
      rating: 0,
      location: 'Switzerland',
      address: 'Bergstrasse 45, 3920 Zermatt, Switzerland',
      phone: '+41 27 123 4567',
      website: 'www.mountainview.com',
      businessRegNumber: 'CH-020.3.034.567-8',
      description: 'Cozy mountain lodge with stunning alpine views',
      totalRooms: 45,
      amenities: ['Fireplace', 'Ski Access', 'Restaurant', 'WiFi'],
      verifiedDate: null,
      lastActivity: '2024-07-06',
      revenue: 'Rs 0'
    },
    {
      id: 7,
      name: 'Desert Safari Adventures',
      companyName: 'Emirates Desert Tourism LLC',
      email: 'book@desertsafari.com',
      type: 'Tour',
      status: 'Pending',
      joinDate: '2024-06-20',
      bookings: 0,
      rating: 0,
      location: 'Dubai, UAE',
      address: 'Al Qudra Road, Dubai Desert Conservation Reserve, Dubai, UAE',
      phone: '+971 4 123 4567',
      website: 'www.desertsafari.com',
      businessRegNumber: 'AE-DED-123456789',
      description: 'Thrilling desert adventures and cultural experiences',
      totalTours: 12,
      amenities: ['4WD Vehicles', 'Traditional Meals', 'Cultural Shows', 'Photography'],
      verifiedDate: null,
      lastActivity: '2024-07-05',
      revenue: 'Rs 0'
    }
  ];

  const getFilteredProviders = () => {
    let filtered = providers;
    
    if (activeTab === 'approval') {
      filtered = providers.filter(p => p.status === 'Pending');
    } else if (activeTab === 'existing') {
      filtered = providers.filter(p => p.status === 'Approved' || p.status === 'Suspended');
    }
    
    return filtered.filter(provider => {
      const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           provider.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || provider.type.toLowerCase() === filterType.toLowerCase();
      const matchesStatus = filterStatus === 'all' || provider.status.toLowerCase() === filterStatus.toLowerCase();
      return matchesSearch && matchesType && matchesStatus;
    });
  };

  const filteredProviders = getFilteredProviders();

  const getTypeBadgeClass = (type) => {
    switch (type) {
      case 'Hotel': return 'bg-blue-100 text-blue-800';
      case 'Tour': return 'bg-green-100 text-green-800';
      case 'Transport': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Hotel': return <Building className="w-4 h-4" />;
      case 'Tour': return <Navigation className="w-4 h-4" />;
      case 'Transport': return <Car className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const handleViewProvider = (provider) => {
    setSelectedProvider(provider);
  };

  const handleCloseModal = () => {
    setSelectedProvider(null);
  };

  const getPendingCount = () => providers.filter(p => p.status === 'Pending').length;
  const getApprovedCount = () => providers.filter(p => p.status === 'Approved').length;
  const getSuspendedCount = () => providers.filter(p => p.status === 'Suspended').length;

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-white shadow-lg border-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">1,847</p>
              <p className="text-sm text-gray-600">Total Providers</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-white shadow-lg border-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
              <Building className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">892</p>
              <p className="text-sm text-gray-600">Hotels</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-white shadow-lg border-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
              <Navigation className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">534</p>
              <p className="text-sm text-gray-600">Tour Operators</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-white shadow-lg border-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
              <Car className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">421</p>
              <p className="text-sm text-gray-600">Transport</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Card className="bg-white shadow-lg border-0">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('approval')}
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
              activeTab === 'approval' 
                ? 'text-[#0088cc] border-b-2 border-[#0088cc] bg-[#0088cc]/5' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <UserCheck className="w-5 h-5" />
            Approval
            {getPendingCount() > 0 && (
              <Badge className="bg-yellow-100 text-yellow-800 ml-2">
                {getPendingCount()}
              </Badge>
            )}
          </button>
          <button
            onClick={() => setActiveTab('existing')}
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
              activeTab === 'existing' 
                ? 'text-[#0088cc] border-b-2 border-[#0088cc] bg-[#0088cc]/5' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Users className="w-5 h-5" />
            Existing Users Details
            <Badge className="bg-blue-100 text-blue-800 ml-2">
              {getApprovedCount() + getSuspendedCount()}
            </Badge>
          </button>
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-4 bg-white shadow-lg border-0">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088cc] focus:border-transparent w-full"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088cc] focus:border-transparent w-[180px]"
          >
            <option value="all">All Types</option>
            <option value="hotel">Hotel</option>
            <option value="tour">Tour</option>
            <option value="transport">Transport</option>
          </select>
          {activeTab === 'existing' && (
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088cc] focus:border-transparent w-[180px]"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="suspended">Suspended</option>
            </select>
          )}
        </div>
      </Card>

      {/* Content based on active tab */}
      <Card className="p-6 bg-white shadow-lg border-0">
        {activeTab === 'approval' && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending Approvals</h3>
            <p className="text-gray-600">Review and approve new service providers</p>
          </div>
        )}
        
        {activeTab === 'existing' && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Existing Providers</h3>
            <p className="text-gray-600">Manage approved and suspended service providers</p>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-medium text-gray-900">Provider</th>
                <th className="text-left p-3 font-medium text-gray-900">Type</th>
                {activeTab === 'existing' && <th className="text-left p-3 font-medium text-gray-900">Status</th>}
                <th className="text-left p-3 font-medium text-gray-900">Location</th>
                <th className="text-left p-3 font-medium text-gray-900">Business Reg.</th>
                <th className="text-left p-3 font-medium text-gray-900">
                  {activeTab === 'approval' ? 'Join Date' : 'Bookings'}
                </th>
                {activeTab === 'existing' && <th className="text-left p-3 font-medium text-gray-900">Rating</th>}
                <th className="text-left p-3 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProviders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-gray-500">
                    {activeTab === 'approval' ? 'No pending approvals' : 'No providers found'}
                  </td>
                </tr>
              ) : (
                filteredProviders.map((provider) => (
                  <tr key={provider.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{provider.name}</p>
                        <p className="text-sm text-gray-500">{provider.email}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getTypeBadgeClass(provider.type)}>
                        {getTypeIcon(provider.type)}
                        <span className="ml-1">{provider.type}</span>
                      </Badge>
                    </td>
                    {activeTab === 'existing' && (
                      <td className="p-3">
                        <Badge className={getStatusBadgeClass(provider.status)}>
                          {provider.status}
                        </Badge>
                      </td>
                    )}
                    <td className="p-3 text-gray-600">{provider.location}</td>
                    <td className="p-3">
                      <span className="font-mono text-sm text-gray-700">{provider.businessRegNumber}</span>
                    </td>
                    <td className="p-3">
                      {activeTab === 'approval' ? provider.joinDate : provider.bookings}
                    </td>
                    {activeTab === 'existing' && (
                      <td className="p-3">
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{provider.rating || 'N/A'}</span>
                          {provider.rating > 0 && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                        </div>
                      </td>
                    )}
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewProvider(provider)}
                        >
                          View
                        </Button>
                        {activeTab === 'approval' && (
                          <>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                              Approve
                            </Button>
                            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                              Reject
                            </Button>
                          </>
                        )}
                        {activeTab === 'existing' && (
                          <>
                            {provider.status === 'Approved' && (
                              <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                                Suspend
                              </Button>
                            )}
                            {provider.status === 'Suspended' && (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                Reactivate
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Provider Details Modal for Approval Tab */}
      {selectedProvider && activeTab === 'approval' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto m-4">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#0088cc]/10 rounded-xl flex items-center justify-center">
                    {getTypeIcon(selectedProvider.type)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedProvider.companyName}</h2>
                    <p className="text-sm text-gray-500">Pending Approval</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              {/* Essential Information */}
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Company Information</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Company Name</label>
                      <p className="text-gray-900 font-medium">{selectedProvider.companyName}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-600">Business Registration Number</label>
                      <p className="font-mono text-gray-900">{selectedProvider.businessRegNumber}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email Address</label>
                      <p className="text-gray-900">{selectedProvider.email}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-600">Mobile Number</label>
                      <p className="text-gray-900">{selectedProvider.phone}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-600">Business Address</label>
                      <p className="text-gray-900 leading-relaxed">{selectedProvider.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                  <Ban className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                {/* <Button variant="outline" onClick={handleCloseModal}>
                  Close
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Provider Details Modal for Existing Users Tab */}
      {selectedProvider && activeTab === 'existing' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#0088cc]/10 rounded-xl flex items-center justify-center">
                    {getTypeIcon(selectedProvider.type)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedProvider.name}</h2>
                    <p className="text-lg text-gray-600 font-medium">{selectedProvider.companyName}</p>
                    <p className="text-sm text-gray-500">{selectedProvider.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              {/* Provider Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Service Type:</span>
                      <Badge className={getTypeBadgeClass(selectedProvider.type)}>
                        {getTypeIcon(selectedProvider.type)}
                        <span className="ml-1">{selectedProvider.type}</span>
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Status:</span>
                      <Badge className={getStatusBadgeClass(selectedProvider.status)}>
                        {selectedProvider.status}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Business Reg:</span>
                      <span className="font-mono text-sm font-medium text-gray-800">{selectedProvider.businessRegNumber}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Rating:</span>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{selectedProvider.rating || 'N/A'}</span>
                        {selectedProvider.rating > 0 && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bookings:</span>
                      <span className="font-medium">{selectedProvider.bookings}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Revenue:</span>
                      <span className="font-medium text-green-600">{selectedProvider.revenue}</span>
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
                  </div>
                </div>

                {/* Service Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Service Details</h3>
                  
                  <div className="space-y-3">
                    {selectedProvider.type === 'Hotel' && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Rooms:</span>
                        <span className="font-medium">{selectedProvider.totalRooms}</span>
                      </div>
                    )}
                    {selectedProvider.type === 'Tour' && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Tours:</span>
                        <span className="font-medium">{selectedProvider.totalTours}</span>
                      </div>
                    )}
                    {selectedProvider.type === 'Transport' && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fleet Size:</span>
                        <span className="font-medium">{selectedProvider.totalVehicles} vehicles</span>
                      </div>
                    )}
                    
                    <div>
                      <span className="text-gray-600 text-sm">Description:</span>
                      <p className="text-gray-800 mt-1 italic">"{selectedProvider.description}"</p>
                    </div>
                  </div>
                </div>

                {/* Timeline & Activity */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Timeline & Activity</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Joined:</span>
                      <span className="font-medium">{selectedProvider.joinDate}</span>
                    </div>
                    
                    {selectedProvider.verifiedDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Verified:</span>
                        <span className="font-medium">{selectedProvider.verifiedDate}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Active:</span>
                      <span className="font-medium">{selectedProvider.lastActivity}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amenities & Services */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Amenities & Services</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProvider.amenities.map((amenity, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8 pt-6 border-t">
                {selectedProvider.status === 'Approved' && (
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Ban className="w-4 h-4 mr-2" />
                    Suspend Provider
                  </Button>
                )}
                {selectedProvider.status === 'Suspended' && (
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Reactivate Provider
                  </Button>
                )}
                <Button variant="outline" onClick={handleCloseModal}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Providers;