import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const SignedInHomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="cs-section">
        <div className="cs-container">
          <h1 className="font-bold text-2xl text-center mb-2 md:text-3xl md:max-w-lg md:mx-auto lg:text-4xl lg:max-w-xl">
            Welcome back to <span className="hover-glow cursor-default">TodoApp</span>
          </h1>
          <p className="text-sm text-center text-muted-foreground mb-8 md:max-w-2xl md:mx-auto">
            Stay organized and boost your productivity with TodoApp! Create,
            prioritize, and manage your tasks seamlessly in a clean, user-friendly
            interface accessible anytime, anywhere.
          </p>
          <div className="text-center">
            <Link to="/dashboard">
              <Button size="lg">Go to Dashboard</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="cs-section">
        <div className="cs-container">
          <h2 className="font-bold text-2xl text-center mb-8 md:text-3xl">
            <span className="hover-gradient cursor-default">Powerful</span> Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center hover-bounce">
              <h3 className="font-semibold text-lg mb-2 hover-gradient cursor-default">Task Organization</h3>
              <p className="text-sm text-muted-foreground">
                Create, edit, and organize your tasks with custom tags and priorities.
              </p>
            </div>
            <div className="text-center hover-bounce">
              <h3 className="font-semibold text-lg mb-2 hover-gradient cursor-default">Progress Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Monitor your progress with status updates and completion tracking.
              </p>
            </div>
            <div className="text-center hover-bounce">
              <h3 className="font-semibold text-lg mb-2 hover-gradient cursor-default">Secure Access</h3>
              <p className="text-sm text-muted-foreground">
                Your data is protected with secure authentication and user accounts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="cs-section">
        <div className="cs-container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-bold text-2xl mb-4 md:text-3xl">
              About <span className="hover-glow cursor-default">TodoApp</span>
            </h2>
            <p className="text-muted-foreground mb-6">
              TodoApp is a modern task management solution built with React and Flask. 
              It provides a seamless experience for managing your daily tasks, projects, 
              and goals with an intuitive interface and powerful features.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with modern technologies including React, TypeScript, Flask, and SQLAlchemy.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};