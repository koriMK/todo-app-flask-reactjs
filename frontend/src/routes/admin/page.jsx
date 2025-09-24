import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTagsQuery } from "@/services/queries/tags";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Tag, UserPlus } from "lucide-react";

export const AdminPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin-login');
    }
  }, [navigate]);

  const { data: tags = [], isLoading, refetch } = useGetTagsQuery();
  const [newTagName, setNewTagName] = useState("");
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newUser, setNewUser] = useState({ username: "", email: "", password: "" });
  const [isAddingUser, setIsAddingUser] = useState(false);

  const handleAddTag = async () => {
    if (!newTagName.trim()) return;
    
    try {
      const response = await fetch('/api/v1/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({ name: newTagName.trim() }),
      });
      
      if (response.ok) {
        setNewTagName("");
        setIsAddingTag(false);
        refetch();
      }
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  };

  const handleDeleteTag = async (tagId) => {
    try {
      const response = await fetch(`/api/v1/tags/${tagId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      
      if (response.ok) {
        refetch();
      }
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  const handleCreateUser = async () => {
    if (!newUser.username.trim() || !newUser.email.trim() || !newUser.password.trim()) return;
    
    try {
      const response = await fetch('/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify(newUser),
      });
      
      if (response.ok) {
        setNewUser({ username: "", email: "", password: "" });
        setIsAddingUser(false);
        alert('User account created successfully!');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen p-6" style={{ background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 50%, #FBBF24 100%)' }}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div className="text-center">
            <h1 className="font-bold text-3xl mb-2 text-yellow-600">🔧 Admin Panel</h1>
            <p className="glovo-text">Manage users and tags</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="glovo-button text-white">
            Logout
          </Button>
        </div>

        {/* Create User Account */}
        <Card className="glovo-card">
          <CardHeader>
            <CardTitle className="flex items-center glovo-accent">
              <UserPlus className="size-5 mr-2" />
              Create User Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isAddingUser ? (
              <div className="space-y-3">
                <Input
                  value={newUser.username}
                  onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  placeholder="Username"
                />
                <Input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="Email"
                />
                <Input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  placeholder="Password"
                />
                <div className="flex space-x-2">
                  <Button onClick={handleCreateUser} className="glovo-button text-white">
                    Create User
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsAddingUser(false);
                      setNewUser({ username: "", email: "", password: "" });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button onClick={() => setIsAddingUser(true)} className="w-full glovo-button text-white">
                <UserPlus className="size-4 mr-2" />
                Create New User Account
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Add New Tag */}
        <Card className="glovo-card">
          <CardHeader>
            <CardTitle className="flex items-center glovo-accent">
              <Plus className="size-5 mr-2" />
              Add New Tag
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isAddingTag ? (
              <div className="flex space-x-2">
                <Input
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  placeholder="Enter tag name..."
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  className="flex-1"
                />
                <Button onClick={handleAddTag} className="glovo-button text-white">
                  Add
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsAddingTag(false);
                    setNewTagName("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button onClick={() => setIsAddingTag(true)} className="w-full glovo-button text-white">
                <Plus className="size-4 mr-2" />
                Add New Tag
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Existing Tags */}
        <Card className="glovo-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center glovo-accent">
                <Tag className="size-5 mr-2" />
                Available Tags
              </span>
              <span className="text-sm font-normal glovo-text">
                {tags.length} tags
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading tags...</div>
            ) : tags.length === 0 ? (
              <div className="text-center py-8 glovo-text">
                No tags available. Add some tags to get started.
              </div>
            ) : (
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {tags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50"
                  >
                    <div className="flex items-center">
                      <Tag className="size-4 mr-2 text-yellow-600" />
                      <span className="font-medium glovo-text">{tag.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTag(tag.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};