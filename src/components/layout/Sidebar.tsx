
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Laptop, 
  Shield, 
  AlertTriangle, 
  Settings, 
  BarChart, 
  Users, 
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Devices", path: "/devices", icon: Laptop },
  { name: "Policies", path: "/policies", icon: Shield },
  { name: "Alerts", path: "/alerts", icon: AlertTriangle },
  { name: "Reports", path: "/reports", icon: BarChart },
  { name: "Users", path: "/users", icon: Users },
  { name: "Actions", path: "/actions", icon: RefreshCw },
  { name: "Settings", path: "/settings", icon: Settings },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md h-screen sticky top-0">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-dashboard-blue flex items-center gap-2">
          <Shield size={24} className="text-dashboard-purple" /> Intune Genius
        </h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink to={item.path} icon={item.icon}>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span>AI Assistant Active</span>
        </div>
      </div>
    </aside>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const NavLink = ({ to, icon: Icon, children }: NavLinkProps) => {
  // In a real app, we'd check if the current path matches
  const isActive = window.location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        isActive 
          ? "bg-dashboard-blue text-white" 
          : "text-gray-600 hover:bg-gray-100"
      )}
    >
      <Icon size={18} />
      <span>{children}</span>
    </Link>
  );
};
