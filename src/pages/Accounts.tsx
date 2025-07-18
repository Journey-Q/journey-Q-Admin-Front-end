import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { Users, UserX, UserCheck, AlertTriangle, Search, Filter, MoreHorizontal, Eye, Ban, CheckCircle, Crown, Star } from 'lucide-react';
import { useState } from 'react';

const Accounts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [hoveredUser, setHoveredUser] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const stats = [
    {
      title: 'Total Users',
      value: '24,847',
      change: '',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Accounts',
      value: '23,651',
      change: '',
      icon: <UserCheck className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Suspended',
      value: '1,196',
      change: '',
      icon: <UserX className="w-6 h-6" />,
      color: 'bg-red-500'
    },
    {
      title: 'Policy Violations',
      value: '127',
      change: '',
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'bg-yellow-500'
    }
  ];

  const users = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      joinDate: '2024-01-15',
      lastActive: '2024-07-06',
      status: 'Active',
      followers: '45K',
      posts: 127,
      violations: 0,
      tripFluencer: true,
      earnings: '$2,450',
      premium: true,
      premiumSince: '2024-02-01',
      location: 'New York, USA',
      bio: 'Travel enthusiast and professional photographer'
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      joinDate: '2023-11-22',
      lastActive: '2024-07-05',
      status: 'Active',
      followers: '78K',
      posts: 203,
      violations: 1,
      tripFluencer: true,
      earnings: '$4,890',
      premium: true,
      premiumSince: '2023-12-15',
      location: 'San Francisco, USA',
      bio: 'Adventure seeker and content creator'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      email: 'emma.r@email.com',
      joinDate: '2024-03-08',
      lastActive: '2024-07-07',
      status: 'Active',
      followers: '1.2K',
      posts: 89,
      violations: 0,
      tripFluencer: false,
      earnings: '$0',
      premium: false,
      premiumSince: null,
      location: 'Madrid, Spain',
      bio: 'Food and culture explorer'
    },
    {
      id: 4,
      name: 'John Smith',
      email: 'john.smith@email.com',
      joinDate: '2024-02-10',
      lastActive: '2024-06-20',
      status: 'Suspended',
      followers: '892',
      posts: 45,
      violations: 3,
      tripFluencer: false,
      earnings: '$0',
      premium: false,
      premiumSince: null,
      location: 'London, UK',
      bio: 'Backpacker and budget traveler'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      email: 'lisa.wang@email.com',
      joinDate: '2023-12-05',
      lastActive: '2024-07-06',
      status: 'Under Review',
      followers: '15K',
      posts: 156,
      violations: 2,
      tripFluencer: false,
      earnings: '$0',
      premium: true,
      premiumSince: '2024-01-10',
      location: 'Tokyo, Japan',
      bio: 'Cultural historian and travel writer'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleMouseEnter = (user, event) => {
    setHoveredUser(user);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredUser(null);
  };

  const handleMouseMove = (event) => {
    if (hoveredUser) {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      {/* <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#0088cc]/10 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-[#0088cc]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Account Management</h1>
            <p className="text-gray-600">Monitor and manage user registrations, accounts, and activities</p>
          </div>
        </div>
      </div> */}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* User Management */}
      <Card className="p-6 bg-white shadow-lg border-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">User Account Management</h3>
            {/* <p className="text-gray-600">Monitor user activities and manage account status</p> */}
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088cc] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088cc] focus:border-transparent"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="under review">Under Review</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-medium text-gray-900">User</th>
                <th className="text-left p-3 font-medium text-gray-900">Status</th>
                <th className="text-left p-3 font-medium text-gray-900">Followers</th>
                <th className="text-left p-3 font-medium text-gray-900">Posts</th>
                <th className="text-left p-3 font-medium text-gray-900">Trip Fluencer</th>
                <th className="text-left p-3 font-medium text-gray-900">Premium</th>
                <th className="text-left p-3 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <p className="text-xs text-gray-400">Joined: {user.joinDate}</p>
                    </div>
                  </td>
                  <td className="p-3">
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="p-3">{user.followers}</td>
                  <td className="p-3">{user.posts}</td>
                  <td className="p-3">
                    {user.tripFluencer ? (
                      <Badge className="bg-yellow-100 text-yellow-800">
                        Yes
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-800">No</Badge>
                    )}
                  </td>
                  <td className="p-3">
                    {user.premium ? (
                      <Badge className="bg-purple-100 text-purple-800">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-800">Free</Badge>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onMouseEnter={(e) => handleMouseEnter(user, e)}
                        onMouseLeave={handleMouseLeave}
                        onMouseMove={handleMouseMove}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {user.status === 'Active' ? (
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Ban className="w-4 h-4" />
                        </Button>
                      ) : user.status === 'Suspended' ? (
                        <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* User Details Popup */}
      {hoveredUser && (
        <div
          className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-80 pointer-events-none"
          style={{
            left: `${mousePosition.x - 320}px`,
            top: `${mousePosition.y - 100}px`,
          }}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3 border-b pb-3">
              <div className="w-12 h-12 bg-[#0088cc]/10 rounded-full flex items-center justify-center">
                <span className="text-[#0088cc] font-bold text-lg">
                  {hoveredUser.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{hoveredUser.name}</h4>
                <p className="text-sm text-gray-500">{hoveredUser.email}</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Location:</span>
                <span className="font-medium">{hoveredUser.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Joined:</span>
                <span className="font-medium">{hoveredUser.joinDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Last Active:</span>
                <span className="font-medium">{hoveredUser.lastActive}</span>
              </div>
              {hoveredUser.premium && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Premium Since:</span>
                  <span className="font-medium">{hoveredUser.premiumSince}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Violations:</span>
                <span className={`font-medium ${hoveredUser.violations > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {hoveredUser.violations || 0}
                </span>
              </div>
            </div>
            
            <div className="pt-2 border-t">
              <p className="text-sm text-gray-600 italic">"{hoveredUser.bio}"</p>
            </div>
            
            <div className="flex gap-2 pt-2">
              <Badge className={getStatusColor(hoveredUser.status)}>
                {hoveredUser.status}
              </Badge>
              {hoveredUser.premium && (
                <Badge className="bg-purple-100 text-purple-800">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              )}
              {hoveredUser.tripFluencer && (
                <Badge className="bg-yellow-100 text-yellow-800">
                  <Star className="w-3 h-3 mr-1" />
                  Trip Fluencer
                </Badge>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accounts;