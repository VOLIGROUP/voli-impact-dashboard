
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  FileBarChart2, 
  Users, 
  Store, 
  Award, 
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  Home,
  Menu
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active: boolean;
  collapsed: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to, active, collapsed }) => {
  return (
    <Link
      to={to}
      className={`flex items-center py-3 px-4 rounded-lg transition-colors ${
        active
          ? 'bg-voli-primary text-black font-medium'
          : 'hover:bg-gray-100 text-gray-700'
      } ${collapsed ? 'justify-center' : ''}`}
    >
      <div className="w-6 h-6 flex items-center justify-center">
        {icon}
      </div>
      {!collapsed && <span className="ml-3">{label}</span>}
    </Link>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  const navigationItems = [
    { icon: <Home size={20} />, label: 'Welcome', to: '/welcome' },
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', to: '/dashboard' },
    { icon: <FileBarChart2 size={20} />, label: 'Reports', to: '/reports' },
    { icon: <Users size={20} />, label: 'Team', to: '/team' },
    { icon: <Store size={20} />, label: 'Marketplace', to: '/marketplace' },
    { icon: <Award size={20} />, label: 'Achievements', to: '/achievements' },
    { icon: <Settings size={20} />, label: 'Settings', to: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div 
        className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className={`flex items-center justify-center py-6 ${collapsed ? 'px-2' : 'px-6'}`}>
          {user.companyLogo ? (
            <img 
              src={user.companyLogo} 
              alt={`${user.organization || 'Company'} Logo`} 
              className={`object-contain max-h-10 ${
                collapsed ? 'max-w-[40px]' : 'max-w-full w-full'
              }`}
            />
          ) : (
            <img 
              src="/voli-logo.png" 
              alt="VOLI Logo" 
              className={`object-contain ${collapsed ? 'h-8' : 'h-10'}`}
            />
          )}
        </div>
        
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => (
            <SidebarItem
              key={item.to}
              icon={item.icon}
              label={item.label}
              to={item.to}
              active={location.pathname.startsWith(item.to)}
              collapsed={collapsed}
            />
          ))}
        </div>
        
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className={`flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 text-gray-700 w-full transition-colors ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <LogOut size={20} />
            </div>
            {!collapsed && <span className="ml-3">Logout</span>}
          </button>
          
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="mt-3 w-full flex items-center justify-center py-2 rounded-lg hover:bg-gray-100 text-gray-700"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
          <div className="flex items-center space-x-4 w-1/2">
            {/* Toggle button for mobile/tablet */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setCollapsed(!collapsed)} 
              className="md:hidden"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <Menu size={20} />
            </Button>
            
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="search"
                className="voli-input pl-10"
                placeholder="Search..."
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-voli-primary animate-pulse" />
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="flex flex-col items-end">
                <span className="font-medium text-sm">{user.name}</span>
                <span className="text-gray-500 text-xs">{user.role}</span>
              </div>
              <Avatar>
                <AvatarImage src={user.avatarUrl} />
                <AvatarFallback>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
