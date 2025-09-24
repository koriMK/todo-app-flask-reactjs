import { TagsSection } from "./_components/tags/section.jsx";
import { ChecklistSection } from "./_components/tags/checklist-section.jsx";
import { TasksSection } from "./_components/tasks/section";
import { CollaborativeTasksSection } from "./_components/tasks/collaborative-tasks-section.jsx";
import { MyCollaborativeTasks } from "./_components/tasks/my-collaborative-tasks.jsx";

export const DashboardHomePage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-bold text-center text-2xl mb-2 md:mb-4">
          Tags currently available
        </h1>
        <TagsSection />
      </div>
      
      <ChecklistSection />
      
      <TasksSection />
      
      <MyCollaborativeTasks />
      
      <CollaborativeTasksSection />
    </div>
  );
};
