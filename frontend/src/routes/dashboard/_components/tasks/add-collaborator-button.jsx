import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";

export const AddCollaboratorButton = ({ task, onCollaboratorAdded }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleAddCollaborator = async () => {
    if (!email.trim()) return;
    
    setIsLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`/api/v1/tasks/${task.id}/collaborators`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email: email.trim() }),
      });
      
      if (response.ok) {
        setEmail("");
        setIsOpen(false);
        if (onCollaboratorAdded) onCollaboratorAdded();
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <UserPlus className="size-4 mr-1" />
          Add Collaborator
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Collaborator</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Input
              placeholder="Enter collaborator's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddCollaborator()}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Only registered users can be added as collaborators
            </p>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={handleAddCollaborator} 
              disabled={isLoading || !email.trim()}
              className="flex-1"
            >
              {isLoading ? "Adding..." : "Add Collaborator"}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};