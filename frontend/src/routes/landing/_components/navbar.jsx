import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-background z-50 border-b">
      <nav className="flex items-center justify-between h-16 cs-container">
        <Link to="/" className="font-bold text-lg hover:text-primary transition-colors">
          TodoApp
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link 
            to="/" 
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/#features" 
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link 
            to="/about" 
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            About
          </Link>
        </div>
      </nav>
    </header>
  );
};
