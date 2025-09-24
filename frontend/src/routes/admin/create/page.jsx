import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const CreateAdminPage = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [adminExists, setAdminExists] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    checkAdminExists();
  }, []);

  const checkAdminExists = async () => {
    try {
      const response = await fetch('/api/v1/admin/exists');
      const data = await response.json();
      setAdminExists(data.admin_exists);
    } catch (error) {
      console.error('Error checking admin:', error);
    } finally {
      setCheckingAdmin(false);
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/v1/admin/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminData),
      });
      
      if (response.ok) {
        alert('Admin created successfully! You can now login.');
        navigate('/admin-login');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to create admin');
      }
    } catch (error) {
      alert('Error creating admin');
    } finally {
      setIsLoading(false);
    }
  };

  if (checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center landing-bg">
        <div className="text-center">
          <div className="text-lg">Checking admin status...</div>
        </div>
      </div>
    );
  }

  if (adminExists) {
    return (
      <div className="min-h-screen flex items-center justify-center landing-bg">
        <Card className="glovo-card w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-yellow-600">⚠️ Admin Already Exists</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="glovo-text">Only one admin is allowed in the system.</p>
            <Button 
              onClick={() => navigate('/admin-login')} 
              className="w-full glovo-button text-white"
            >
              Go to Admin Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center landing-bg">
      <Card className="glovo-card w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-yellow-600">👑 Create Admin Account</CardTitle>
          <p className="text-center text-sm glovo-text">Create the single admin account for the system</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateAdmin} className="space-y-4">
            <Input
              type="email"
              placeholder="Admin Email"
              value={adminData.email}
              onChange={(e) => setAdminData({...adminData, email: e.target.value})}
              required
            />
            <Input
              type="password"
              placeholder="Admin Password (min 6 characters)"
              value={adminData.password}
              onChange={(e) => setAdminData({...adminData, password: e.target.value})}
              required
              minLength={6}
            />
            <Button type="submit" disabled={isLoading} className="w-full glovo-button text-white">
              {isLoading ? "Creating Admin..." : "Create Admin Account"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};