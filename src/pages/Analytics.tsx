import { Card } from '@/components/ui/card';
import { StatsWidget } from '@/components/dashboard/StatsWidget';
import { Users, User, Calendar, Bell, Search } from 'lucide-react';

const Analytics = () => {
  // Mock analytics data
  const monthlyRevenue = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 67000 }
  ];

  const topServices = [
    { name: 'Bali Beach Resort', bookings: 156, revenue: '$23,400' },
    { name: 'Tokyo City Tour', bookings: 134, revenue: '$18,900' },
    { name: 'Paris Airport Transfer', bookings: 128, revenue: '$12,800' },
    { name: 'Maldives Luxury Stay', bookings: 95, revenue: '$47,500' },
    { name: 'Nepal Trekking Adventure', bookings: 87, revenue: '$15,600' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Analytics & Reports</h1>
        <p className="text-muted-foreground">Performance insights and business intelligence</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsWidget
          title="Monthly Revenue"
          value="$89,247"
          change="+18% from last month"
          changeType="positive"
          icon={<Search className="w-6 h-6" />}
          description="Total platform earnings"
        />
        <StatsWidget
          title="Active Users"
          value="12,543"
          change="+12% from last month"
          changeType="positive"
          icon={<Users className="w-6 h-6" />}
          description="Monthly active users"
        />
        <StatsWidget
          title="Conversion Rate"
          value="3.4%"
          change="+0.8% from last month"
          changeType="positive"
          icon={<Calendar className="w-6 h-6" />}
          description="Visitor to booking rate"
        />
        <StatsWidget
          title="Avg. Booking Value"
          value="$312"
          change="+5% from last month"
          changeType="positive"
          icon={<User className="w-6 h-6" />}
          description="Average transaction size"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <Card className="dashboard-widget">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-1">Monthly Revenue Trend</h3>
            <p className="text-sm text-muted-foreground">Platform earnings over the last 6 months</p>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 p-4 bg-muted/20 rounded-lg">
            {monthlyRevenue.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-primary rounded-t-md min-h-[20px] flex items-end justify-center pb-2"
                  style={{ height: `${(item.revenue / 70000) * 200}px` }}
                >
                  <span className="text-xs text-primary-foreground font-medium">
                    ${item.revenue / 1000}k
                  </span>
                </div>
                <span className="text-xs text-muted-foreground mt-2">{item.month}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* User Role Distribution */}
        <Card className="dashboard-widget">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-1">User Role Distribution</h3>
            <p className="text-sm text-muted-foreground">Breakdown of user types</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
                <span className="text-sm font-medium">Regular Travelers</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">8,462</p>
                <p className="text-xs text-muted-foreground">67.4%</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-accent rounded-full"></div>
                <span className="text-sm font-medium">Premium Users</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">2,847</p>
                <p className="text-xs text-muted-foreground">22.7%</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-success rounded-full"></div>
                <span className="text-sm font-medium">TripFluencers</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">1,234</p>
                <p className="text-xs text-muted-foreground">9.8%</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Performing Services */}
      <Card className="dashboard-widget">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-1">Top Performing Services</h3>
          <p className="text-sm text-muted-foreground">Most booked services this month</p>
        </div>
        <div className="space-y-4">
          {topServices.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-primary-light rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">#{index + 1}</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{service.name}</p>
                  <p className="text-sm text-muted-foreground">{service.bookings} bookings</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">{service.revenue}</p>
                <p className="text-xs text-muted-foreground">Revenue</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Analytics;