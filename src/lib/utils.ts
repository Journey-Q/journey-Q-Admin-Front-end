// API Types
export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminAuthResponse {
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

export interface ServiceProviderSignupRequest {
  username: string;
  email: string;
  password: string;
  serviceType: 'HOTEL' | 'TOUR_GUIDE' | 'TRAVEL_AGENT';
  businessRegistrationNumber: string;
  address: string;
  contactNo: string;
}

export interface ServiceProviderLoginRequest {
  email: string;
  password: string;
}

export interface ServiceProviderAuthResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  serviceProvider: {
    id: number;
    username: string;
    email: string;
    serviceType: string;
    businessRegistrationNumber: string;
    address: string;
    contactNo: string;
    isApproved: boolean;
    isActive: boolean;
    createdAt: string;
  };
}

export interface ApiError {
  message: string;
  status: number;
  timestamp: number;
}

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Admin API functions
export const adminAPI = {
  // Setup default admin
  setup: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/setup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Setup failed');
      }
      
      return data;
    } catch (error) {
      console.error('Admin setup error:', error);
      throw error;
    }
  },

  // Admin login
  login: async (email: string, password: string): Promise<AdminAuthResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Get admin profile
  getProfile: async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/admin/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch profile');
      }
      
      return data;
    } catch (error) {
      console.error('Profile fetch error:', error);
      throw error;
    }
  },

  // Test admin API
  test: async (): Promise<string> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/test`);
      const data = await response.text();
      return data;
    } catch (error) {
      console.error('API test error:', error);
      throw error;
    }
  },
};

// Service Provider API functions
export const serviceProviderAPI = {
  // Service provider signup
  signup: async (signupData: ServiceProviderSignupRequest): Promise<ServiceProviderAuthResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }
      
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  // Service provider login
  login: async (email: string, password: string): Promise<ServiceProviderAuthResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Get service provider profile
  getProfile: async () => {
    try {
      const token = localStorage.getItem('service_provider_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch profile');
      }
      
      return data;
    } catch (error) {
      console.error('Profile fetch error:', error);
      throw error;
    }
  },
};

// Authentication utilities
export const auth = {
  // Check if admin is logged in
  isAdminLoggedIn: (): boolean => {
    const token = localStorage.getItem('admin_token');
    const logged_in = localStorage.getItem('admin_logged_in');
    return !!(token && logged_in === 'true');
  },

  // Check if service provider is logged in
  isServiceProviderLoggedIn: (): boolean => {
    const token = localStorage.getItem('service_provider_token');
    const logged_in = localStorage.getItem('service_provider_logged_in');
    return !!(token && logged_in === 'true');
  },

  // Get admin data
  getAdminData: () => {
    const adminData = localStorage.getItem('admin_data');
    return adminData ? JSON.parse(adminData) : null;
  },

  // Get service provider data
  getServiceProviderData: () => {
    const providerData = localStorage.getItem('service_provider_data');
    return providerData ? JSON.parse(providerData) : null;
  },

  // Logout admin
  logoutAdmin: (): void => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('admin_data');
  },

  // Logout service provider
  logoutServiceProvider: (): void => {
    localStorage.removeItem('service_provider_token');
    localStorage.removeItem('service_provider_logged_in');
    localStorage.removeItem('service_provider_data');
  },
};

// Utility functions from shadcn/ui
export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}