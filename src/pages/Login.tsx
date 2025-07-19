import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Types
interface AdminLoginRequest {
  email: string;
  password: string;
}

interface AdminAuthResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  admin: {
    id: number;
    username: string;
    email: string;
    role: string;
    isActive: boolean;
    createdAt: string;
  };
}

interface ApiError {
  message: string;
  status: number;
  timestamp: number;
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [setupLoading, setSetupLoading] = useState(false);
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('admin_logged_in');
    if (adminLoggedIn === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  // API Base URL
  // const API_BASE_URL = 'http://localhost:8080/admin';
    // const API_BASE_URL = 'https://journeyqapigateway-production.up.railway.app/api/service/admin';
    const API_BASE_URL = 'https://serviceprovidersservice-production.up.railway.app/admin';

    
  // Setup default admin
  const handleSetupAdmin = async () => {
    setSetupLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/setup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        // Auto-fill the credentials
        setEmail(data.email);
        setPassword(data.defaultPassword);
      } else {
        toast.error(data.message || 'Setup failed');
      }
    } catch (error) {
      console.error('Setup error:', error);
      toast.error('Network error. Please check if the server is running.');
    } finally {
      setSetupLoading(false);
    }
  };

  // Login function
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginData: AdminLoginRequest = {
        email,
        password,
      };

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data: AdminAuthResponse = await response.json();
        
        // Store authentication data in localStorage
        localStorage.setItem('admin_token', data.accessToken);
        localStorage.setItem('admin_logged_in', 'true');
        localStorage.setItem('admin_data', JSON.stringify(data.admin));
        
        toast.success(`Welcome back, ${data.admin.username}!`);
        navigate('/dashboard');
      } else {
        const errorData: ApiError = await response.json();
        toast.error(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Network error. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-[#E5E7EB] to-[#D1D5DB] flex items-center justify-center p-4">
    <Card className="w-full max-w-md p-8 shadow-lg border border-[#A9A9A9] bg-white rounded-xl">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-[#0088cc] rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-2xl">J</span>
        </div>
        <h1 className="text-3xl font-bold text-[#333333] mb-2">JourneyQ Admin</h1>
        <p className="text-[#696969]">Sign in to your admin dashboard</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[#333333]">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@serviceproviders.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 border-[#A9A9A9] focus:ring-[#0088cc]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-[#333333]">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-12 border-[#A9A9A9] focus:ring-[#0088cc]"
          />
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-[#0088cc] hover:bg-[#0077b3] text-white font-semibold transition-colors"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="mt-6 space-y-4">
        

        {/* <Button
          onClick={handleSetupAdmin}
          variant="outline"
          className="w-full h-10 border-[#A9A9A9] text-[#333333] hover:bg-[#E5E7EB] transition-colors"
          disabled={setupLoading}
        >
          {setupLoading ? 'Setting up...' : 'Setup Default Admin'}
        </Button> */}
      </div>
    </Card>
  </div>
);
};

export default Login;