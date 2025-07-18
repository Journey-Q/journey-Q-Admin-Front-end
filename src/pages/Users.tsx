import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Users as UsersIcon, User } from 'lucide-react';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  // Mock user data
  const users = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      role: 'Premium',
      status: 'Active',
      joinDate: '2024-01-15',
      bookings: 12,
      spent: '$2,450'
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      role: 'TripFluencer',
      status: 'Active',
      joinDate: '2024-02-03',
      bookings: 8,
      spent: '$1,890'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      email: 'emma.w@email.com',
      role: 'Traveler',
      status: 'Active',
      joinDate: '2024-03-12',
      bookings: 3,
      spent: '$680'
    },
    {
      id: 4,
      name: 'David Rodriguez',
      email: 'david.r@email.com',
      role: 'Premium',
      status: 'Suspended',
      joinDate: '2024-01-28',
      bookings: 15,
      spent: '$3,200'
    },
    {
      id: 5,
      name: 'Lisa Park',
      email: 'lisa.park@email.com',
      role: 'TripFluencer',
      status: 'Active',
      joinDate: '2024-02-18',
      bookings: 22,
      spent: '$4,100'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role.toLowerCase() === filterRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'Premium': return 'default';
      case 'TripFluencer': return 'secondary';
      case 'Traveler': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    return status === 'Active' ? 'default' : 'destructive';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">User Management</h1>
          <p className="text-muted-foreground">Manage travelers, premium users, and TripFluencers</p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover">
          <User className="w-4 h-4 mr-2" />
          Add New User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="dashboard-widget">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
              <UsersIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">12,543</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
          </div>
        </Card>
        <Card className="dashboard-widget">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold">2,847</p>
              <p className="text-sm text-muted-foreground">Premium</p>
            </div>
          </div>
        </Card>
        <Card className="dashboard-widget">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">1,234</p>
              <p className="text-sm text-muted-foreground">TripFluencers</p>
            </div>
          </div>
        </Card>
        <Card className="dashboard-widget">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">8,462</p>
              <p className="text-sm text-muted-foreground">Regular Travelers</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="dashboard-card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="traveler">Traveler</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="tripfluencer">TripFluencer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="dashboard-card">
        <div className="overflow-x-auto">
          <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Bookings</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getRoleBadgeVariant(user.role)}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(user.status)}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{user.joinDate}</TableCell>
                <TableCell>{user.bookings}</TableCell>
                <TableCell className="font-medium">{user.spent}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">View</Button>
                    <Button size="sm" variant="outline">Edit</Button>
                    {user.status === 'Active' ? (
                      <Button size="sm" variant="destructive">Suspend</Button>
                    ) : (
                      <Button size="sm" variant="default">Activate</Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default UserManagement;