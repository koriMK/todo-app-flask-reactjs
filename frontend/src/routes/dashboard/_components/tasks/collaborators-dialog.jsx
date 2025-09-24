import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Plus, UserCheck } from "lucide-react";

export const CollaboratorsDialog = ({ task }) => {
  const [collaborators, setCollaborators] = useState([]);
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchCollaborators = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`/api/v1/tasks/${task.id}/collaborators`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCollaborators(data);
      }
    } catch (error) {
      console.error('Error fetching collaborators:', error);
    }
  };

  const addCollaborator = async () => {
    if (!newCollaboratorEmail.trim()) return;
    
    setIsLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`/api/v1/tasks/${task.id}/collaborators`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email: newCollaboratorEmail.trim() }),
      });
      
      if (response.ok) {
        setNewCollaboratorEmail("");
        fetchCollaborators();
        alert('Collaborator added successfully!');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to add collaborator');
      }
    } catch (error) {
      console.error('Error adding collaborator:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCollaborators();
  }, [task.id]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Users className="size-4 mr-1" />
          Collaborators ({collaborators.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Task Collaborators</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Add Collaborator */}
          <div className="flex space-x-2">
            <Input
              placeholder="Enter email to add collaborator"
              value={newCollaboratorEmail}
              onChange={(e) => setNewCollaboratorEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCollaborator()}
            />
            <Button onClick={addCollaborator} disabled={isLoading} size="sm">
              <Plus className="size-4" />
            </Button>
          </div>

          {/* Collaborators List */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Current Collaborators:</h4>
            {collaborators.length === 0 ? (
              <p className="text-sm text-muted-foreground">No collaborators yet</p>
            ) : (
              collaborators.map((collaborator) => (
                <div key={collaborator.id} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center space-x-2">
                    <UserCheck className="size-4 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">{collaborator.username}</p>
                      <p className="text-xs text-muted-foreground">{collaborator.email}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {collaborator.role}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};