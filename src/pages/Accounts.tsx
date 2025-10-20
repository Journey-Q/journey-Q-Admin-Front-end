import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { Users, UserX, UserCheck, AlertTriangle, Search, Filter, MoreHorizontal, Eye, Ban, CheckCircle, Crown, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

const Accounts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [hoveredUser, setHoveredUser] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://socialmediaservice-production-2b10.up.railway.app/auth/all');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const stats = [
    {
      title: 'Total Users',
      value: users.length.toLocaleString(),
      change: '',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Accounts',
      value: users.filter(u => u.status?.toLowerCase() === 'active' || !u.status).length.toLocaleString(),
      change: '',
      icon: <UserCheck className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Suspended',
      value: users.filter(u => u.status?.toLowerCase() === 'suspended').length.toLocaleString(),
      change: '',
      icon: <UserX className="w-6 h-6" />,
      color: 'bg-red-500'
    },
    {
      title: 'Policy Violations',
      value: users.filter(u => u.violations && u.violations > 0).length.toLocaleString(),
      change: '',
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'bg-yellow-500'
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
    const matchesSearch = (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (user.username?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || (user.status?.toLowerCase() || 'active') === filterStatus.toLowerCase();
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

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#0088cc] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading users...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 font-medium">Error loading users</p>
              <p className="text-gray-600 text-sm mt-2">{error}</p>
            </div>
          </div>
        ) : (
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
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-500">
                      No users found matching your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                  <tr key={user._id || user.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{user.name || user.username || 'N/A'}</p>
                        <p className="text-sm text-gray-500">{user.email || 'N/A'}</p>
                        <p className="text-xs text-gray-400">
                          Joined: {user.joinDate || user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getStatusColor(user.status || 'Active')}>
                        {user.status || 'Active'}
                      </Badge>
                    </td>
                    <td className="p-3">{user.followers || user.followersCount || '0'}</td>
                    <td className="p-3">{user.posts || user.postsCount || '0'}</td>
                    <td className="p-3">
                      {user.tripFluencer || user.isTripFluencer ? (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          Yes
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800">No</Badge>
                      )}
                    </td>
                    <td className="p-3">
                      {user.premium || user.isPremium ? (
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
                ))
                )}
              </tbody>
            </table>
          </div>
        )}
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
                  {(hoveredUser.name || hoveredUser.username || 'U').split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{hoveredUser.name || hoveredUser.username || 'Unknown'}</h4>
                <p className="text-sm text-gray-500">{hoveredUser.email || 'N/A'}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              {hoveredUser.location && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Location:</span>
                  <span className="font-medium">{hoveredUser.location}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Joined:</span>
                <span className="font-medium">
                  {hoveredUser.joinDate || (hoveredUser.createdAt ? new Date(hoveredUser.createdAt).toLocaleDateString() : 'N/A')}
                </span>
              </div>
              {hoveredUser.lastActive && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Active:</span>
                  <span className="font-medium">{hoveredUser.lastActive}</span>
                </div>
              )}
              {(hoveredUser.premium || hoveredUser.isPremium) && hoveredUser.premiumSince && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Premium Since:</span>
                  <span className="font-medium">{hoveredUser.premiumSince}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Violations:</span>
                <span className={`font-medium ${(hoveredUser.violations || 0) > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {hoveredUser.violations || 0}
                </span>
              </div>
            </div>

            {hoveredUser.bio && (
              <div className="pt-2 border-t">
                <p className="text-sm text-gray-600 italic">"{hoveredUser.bio}"</p>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Badge className={getStatusColor(hoveredUser.status || 'Active')}>
                {hoveredUser.status || 'Active'}
              </Badge>
              {(hoveredUser.premium || hoveredUser.isPremium) && (
                <Badge className="bg-purple-100 text-purple-800">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              )}
              {(hoveredUser.tripFluencer || hoveredUser.isTripFluencer) && (
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