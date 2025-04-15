
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Users,
  UserPlus,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole?: "victim" | "intern" | "lawyer";
}

// Role-specific navigation items
const navigationItems = {
  victim: [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Cases", href: "/dashboard/cases", icon: FileText },
    { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    { name: "Lawyer Directory", href: "/directory", icon: Users },
  ],
  intern: [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Assigned Cases", href: "/dashboard/cases", icon: FileText },
    { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    { name: "Profile", href: "/dashboard/profile", icon: UserPlus },
  ],
  lawyer: [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Assigned Cases", href: "/dashboard/cases", icon: FileText },
    { name: "Escalated Cases", href: "/dashboard/escalated", icon: FileText },
    { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    { name: "Profile", href: "/dashboard/profile", icon: UserPlus },
  ],
};

// Common navigation items for all roles
const commonNavItems = [
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const DashboardLayout = ({ children, userRole = "victim" }: DashboardLayoutProps) => {
  const location = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Combine role-specific and common navigation items
  const navItems = [...navigationItems[userRole], ...commonNavItems];

  const handleLogout = () => {
    // Here you would normally handle the logout process
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    // Navigate to home page after logout
    window.location.href = "/";
  };

  const NavItems = () => (
    <>
      <div className="mb-6">
        <div className="flex items-center p-4">
          <div className="w-10 h-10 bg-law-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">LC</span>
          </div>
          <h1 className="ml-3 text-xl font-semibold text-gray-800">Legal Consult</h1>
        </div>
      </div>
      <div className="flex-1 px-3">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                location.pathname === item.href
                  ? "bg-law-100 text-law-700 hover:text-law-900"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-4 border-t">
        <div className="flex items-center gap-3 p-2">
          <Avatar>
            <AvatarImage src="" alt="User" />
            <AvatarFallback className="bg-law-200 text-law-700">
              {userRole.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {userRole === "victim" ? "Family Member" : userRole === "intern" ? "Law Intern" : "Lawyer"}
            </p>
            <p className="text-xs text-gray-500 truncate">user@example.com</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="text-gray-500 hover:text-gray-700"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {isMobile ? (
        <div className="flex flex-col min-h-screen">
          <header className="bg-white border-b p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-law-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">LC</span>
              </div>
              <h1 className="ml-3 text-xl font-semibold text-gray-800">Legal Consult</h1>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <NavItems />
              </SheetContent>
            </Sheet>
          </header>
          <main className="flex-1 p-4 overflow-auto">{children}</main>
        </div>
      ) : (
        <div className="flex h-screen overflow-hidden">
          <aside className="hidden md:flex md:flex-col md:w-64 border-r bg-white">
            <NavItems />
          </aside>
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
