import { useState, useEffect } from "react";
import { Users, Clock, User } from "lucide-react";

export const MyCollaborativeTasks = () => {
  const [collaborativeTasks, setCollaborativeTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMyCollaborativeTasks = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch('/api/v1/tasks/collaborative', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const tasks = await response.json();
        setCollaborativeTasks(tasks);
      }
    } catch (error) {
      console.error('Error fetching collaborative tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCollaborativeTasks();
  }, []);

  if (isLoading) {
    return <div className="text-center py-4">Loading collaborative tasks...</div>;
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <Users className="size-5 mr-2" />
        <h2 className="font-bold text-xl">Tasks I'm Collaborating On</h2>
        <span className="ml-2 text-sm text-muted-foreground">
          ({collaborativeTasks.length})
        </span>
      </div>
      
      {collaborativeTasks.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Users className="size-12 mx-auto mb-2 opacity-50" />
          <p>You're not collaborating on any tasks yet</p>
          <p className="text-sm">Wait for others to add you as a collaborator</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {collaborativeTasks.map((task) => (
            <div key={task.id} className="border rounded-lg p-4 bg-background">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{task.title}</h3>
                <span className={`text-xs px-2 py-1 rounded ${
                  task.status === 'completed' ? 'bg-green-100 text-green-800' :
                  task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {task.status.replace('_', ' ')}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {task.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center">
                  <User className="size-3 mr-1" />
                  <span>Role: {task.role}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="size-3 mr-1" />
                  <span>Joined: {new Date(task.joined_at).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="mt-2 text-xs text-blue-600">
                Priority: {task.priority}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};