"use client"

import { Link, useLocation } from "react-router-dom"
import {
  Users,
  Building2,
  Shield,
  Megaphone,
  Gift,
  CreditCard,
  UserPlus,
  LogOut,
  LayoutDashboard,
  RefreshCw,
  User,
  DollarSign,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/dashboard",
    description: "",
  },
  {
    icon: Users,
    label: "Account Management",
    path: "/accounts",
    description: "",
  },
  {
    icon: Building2,
    label: "Service Providers",
    path: "/providers",
    description: "",
  },
  {
    icon: Shield,
    label: "Content Moderation",
    path: "/moderation",
    description: "",
  },
  {
    icon: Megaphone,
    label: "Promotions & Ads",
    path: "/promotions",
    description: "",
  },
  {
    icon: Gift,
    label: "Rewards Program",
    path: "/rewards",
    description: "",
  },
  {
    icon: CreditCard,
    label: "Payment Monitor",
    path: "/payments",
    description: "",
  },
  {
    icon: DollarSign,
    label: "Commissions",
    path: "/commissions",
    description: "",
  },
  {
    icon: RefreshCw,
    label: "Subscription Management",
    path: "/subscriptions",
    description: "",
  },
  {
    icon: UserPlus,
    label: "Add Admin",
    path: "/add-admin",
    description: "",
  },
  {
    icon: User,
    label: "Profile",
    path: "/profile",
    description: "",
  },
]

export const AppSidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { state } = useSidebar()
  const collapsed = state === "collapsed"

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in")
    toast.success("Logged out successfully")
    navigate("/")
  }

  return (
    <Sidebar className="bg-white text-black border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-100 p-6">
        <div className="flex items-center gap-4">
          {/* Logo with Image */}
          <div className="relative">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src="/logo.png"
                alt="JourneyQ Logo"
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  // Fallback to text if image fails to load
                  e.currentTarget.style.display = "none"
                  e.currentTarget.nextElementSibling.style.display = "block"
                }}
              />
              <span className="text-[#2953A6] font-bold text-xl hidden" style={{ display: "none" }}>
                J
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>

          {!collapsed && (
            <div className="flex flex-col">
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#2953A6] to-[#07C7F2] bg-clip-text text-transparent leading-tight">
                JourneyQ
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-600 font-medium">Admin Portal</p>
              </div>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500 font-semibold text-xs uppercase tracking-wider">
            {/* Management */}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path
                const Icon = item.icon

                return (
                  <SidebarMenuItem key={item.path} className="relative">
                    {/* Active indicator line */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#2953A6] to-[#07C7F2] rounded-r-full"></div>
                    )}

                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={collapsed ? item.label : undefined}
                      className={`transition-all duration-200 h-12 rounded-lg ${
                        isActive
                          ? "bg-white text-[#2953A6] font-medium data-[active=true]:bg-white data-[active=true]:text-[#2953A6]"
                          : "text-gray-600 hover:bg-white/50 hover:text-[#2953A6]"
                      }`}
                    >
                      <Link to={item.path} className="flex items-center gap-3 px-3">
                        <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-[#2953A6]" : "text-gray-500"}`} />
                        {!collapsed && (
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">{item.label}</div>
                            <div className={`text-xs truncate ${isActive ? "text-[#2953A6]/70" : "text-gray-500"}`}>
                              {item.description}
                            </div>
                          </div>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Divider */}
        <div className="my-4 border-t border-gray-100"></div>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="text-gray-600 hover:bg-white/50 hover:text-[#2953A6] rounded-lg transition-all duration-200 h-12 cursor-pointer"
                >
                  <LogOut className="w-5 h-5 text-gray-500" />
                  {!collapsed && <span className="font-medium">Logout</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
