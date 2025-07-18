import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Accounts from "./pages/Accounts";
import Providers from "./pages/Providers";
import Moderation from "./pages/Moderation";
import Promotions from "./pages/Promotions";
import Rewards from "./pages/Rewards";
import Payments from "./pages/Payments";
import Commissions from "./pages/Commissions";
import AddAdmin from "./pages/AddAdmin";
import Subscriptions from "./pages/subscriptions";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem('admin_logged_in');
  return isLoggedIn ? <>{children}</> : <Navigate to="/" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/accounts" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Accounts />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/providers" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Providers />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/moderation" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Moderation />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/promotions" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Promotions />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/rewards" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Rewards />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/payments" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Payments />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/commissions" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Commissions />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/subscriptions" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Subscriptions />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/add-admin" element={
            <ProtectedRoute>
              <DashboardLayout>
                <AddAdmin />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;