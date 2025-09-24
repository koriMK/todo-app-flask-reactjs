import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-white/90 backdrop-blur-md border-t border-yellow-200">
      <div className="cs-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="font-bold text-lg mb-4 block text-yellow-600 hover:text-yellow-700 transition-colors">
              📝 TodoApp
            </Link>
            <p className="text-sm text-muted-foreground">
              Effortless task management for better productivity.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 glovo-accent cursor-default">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover-bounce cursor-default">Task Management</li>
              <li className="hover-bounce cursor-default">Priority Setting</li>
              <li className="hover-bounce cursor-default">Tag Organization</li>
              <li className="hover-bounce cursor-default">Progress Tracking</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 glovo-accent cursor-default">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover-bounce cursor-default">Help Center</li>
              <li className="hover-bounce cursor-default">Contact Us</li>
              <li className="hover-bounce cursor-default">Privacy Policy</li>
              <li className="hover-bounce cursor-default">Terms of Service</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 TodoApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};