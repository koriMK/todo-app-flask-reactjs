import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";
import { Link, useNavigate } from "react-router-dom";

export const DashboardNavbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-background z-50 border-b">
      <nav className="flex items-center justify-between h-16 cs-container">
        <Link to="/dashboard" className="font-bold text-lg gradient-text hover:opacity-80 transition-opacity">
          TodoApp
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link 
            to="/home" 
            className="text-sm font-medium text-gray-700 hover:text-yellow-600 transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className="text-sm font-medium text-gray-700 hover:text-yellow-600 transition-colors"
          >
            Dashboard
          </Link>
          <Link 
            to="/admin-login" 
            className="text-sm font-medium text-gray-700 hover:text-yellow-600 transition-colors"
          >
            Admin
          </Link>
          <Link 
            to="/about" 
            className="text-sm font-medium text-gray-700 hover:text-yellow-600 transition-colors"
          >
            About
          </Link>
          <Button
            className="font-medium glovo-button text-white border-0"
            size="sm"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </nav>
    </header>
  );
};