import { Link, useLocation } from "react-router-dom";
import { Bell, MessageSquare, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top Navigation for Desktop */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 h-16 bg-white border-b shadow-sm z-50">
        <div className="max-w-7xl mx-auto w-full px-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/ce205f00-8e5a-4ed2-9756-417964ef47e6.png" 
              alt="PaddleRank Logo" 
              className="w-8 h-8"
            />
            <span className="font-bold text-lg">PaddleRank</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
                isActive("/dashboard") ? "bg-primary/10 text-primary" : "hover:bg-gray-100"
              )}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            
            <Link
              to="/messages"
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
                isActive("/messages") ? "bg-primary/10 text-primary" : "hover:bg-gray-100"
              )}
            >
              <MessageSquare className="h-5 w-5" />
              <span>Messages</span>
            </Link>
            
            <Link
              to="/notifications"
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
                isActive("/notifications") ? "bg-primary/10 text-primary" : "hover:bg-gray-100"
              )}
            >
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t shadow-sm z-50">
        <div className="grid grid-cols-3 h-full">
          <Link
            to="/dashboard"
            className={cn(
              "flex flex-col items-center justify-center gap-1",
              isActive("/dashboard") ? "text-primary" : "text-gray-500"
            )}
          >
            <LayoutDashboard className="h-6 w-6" />
            <span className="text-xs">Dashboard</span>
          </Link>
          
          <Link
            to="/messages"
            className={cn(
              "flex flex-col items-center justify-center gap-1",
              isActive("/messages") ? "text-primary" : "text-gray-500"
            )}
          >
            <MessageSquare className="h-6 w-6" />
            <span className="text-xs">Messages</span>
          </Link>
          
          <Link
            to="/notifications"
            className={cn(
              "flex flex-col items-center justify-center gap-1",
              isActive("/notifications") ? "text-primary" : "text-gray-500"
            )}
          >
            <Bell className="h-6 w-6" />
            <span className="text-xs">Notifications</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navigation;