import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, adminAPI } from '@/lib/utils';

interface AdminData {
  id: number;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const isLoggedIn = auth.isAdminLoggedIn();
      
      if (!isLoggedIn) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      // Get admin data from localStorage
      const localAdminData = auth.getAdminData();
      if (localAdminData) {
        setAdminData(localAdminData);
        setIsAuthenticated(true);
      }

      // Optionally verify token with backend
      try {
        const profileData = await adminAPI.getProfile();
        setAdminData(profileData);
        setIsAuthenticated(true);
      } catch (error) {
        // Token might be expired, logout
        logout();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await adminAPI.login(email, password);
      
      // Store authentication data
      localStorage.setItem('admin_token', response.accessToken);
      localStorage.setItem('admin_logged_in', 'true');
      localStorage.setItem('admin_data', JSON.stringify(response.admin));
      
      setAdminData(response.admin);
      setIsAuthenticated(true);
      
      return { success: true, data: response };
    } catch (error) {
      console.error('Login failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      };
    }
  };

  const logout = () => {
    auth.logoutAdmin();
    setIsAuthenticated(false);
    setAdminData(null);
    navigate('/login');
  };

  const refreshProfile = async () => {
    try {
      const profileData = await adminAPI.getProfile();
      setAdminData(profileData);
      return profileData;
    } catch (error) {
      console.error('Failed to refresh profile:', error);
      throw error;
    }
  };

  return {
    isAuthenticated,
    adminData,
    loading,
    login,
    logout,
    refreshProfile,
    checkAuthentication,
  };
};