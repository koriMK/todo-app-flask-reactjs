import { useState, useEffect } from "react";
import { TaskCard } from "./card";
import { EmptyState } from "./empty-state";
import { Users } from "lucide-react";

export const CollaborativeTasksSection = () => {
  const [collaborativeTasks, setCollaborativeTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCollaborativeTasks = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch('/api/v1/tasks/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const allTasks = await response.json();
        
        // Filter tasks that have collaborators
        const tasksWithCollaborators = [];
        for (const task of allTasks) {
          const collabResponse = await fetch(`/api/v1/tasks/${task.id}/collaborators`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (collabResponse.ok) {
            const collaborators = await collabResponse.json();
            if (collaborators.length > 0) {
              tasksWithCollaborators.push({
                ...task,
                collaborators: collaborators
              });
            }
          }
        }
        
        setCollaborativeTasks(tasksWithCollaborators);
      }
    } catch (error) {
      console.error('Error fetching collaborative tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCollaborativeTasks();
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Loading collaborative tasks...</div>;
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <Users className="size-5 mr-2" />
        <h2 className="font-bold text-xl">Collaborative Tasks</h2>
        <span className="ml-2 text-sm text-muted-foreground">
          ({collaborativeTasks.length})
        </span>
      </div>
      
      {collaborativeTasks.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Users className="size-12 mx-auto mb-2 opacity-50" />
          <p>No collaborative tasks yet</p>
          <p className="text-sm">Add collaborators to your tasks to see them here</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {collaborativeTasks.map((task) => (
            <div key={task.id} className="relative">
              <TaskCard task={task} />
              <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {task.collaborators.length} collaborator{task.collaborators.length !== 1 ? 's' : ''}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};