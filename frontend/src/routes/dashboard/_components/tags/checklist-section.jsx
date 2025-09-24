import { useGetTagsQuery } from "@/services/queries/tags";
import { LoadingState } from "./loading-state";
import { TagChecklist } from "./tag-checklist.jsx";

export const ChecklistSection = () => {
  const { data: tags = [], isLoading } = useGetTagsQuery();

  if (isLoading) return <LoadingState />;

  return (
    <div>
      <h2 className="font-bold text-lg mb-4">
        <span className="hover-glow cursor-default">Tag</span> Checklists
      </h2>
      {tags.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No tags available</p>
          <p className="text-sm">Ask admin to add some tags</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tags.map((tag) => (
            <TagChecklist key={tag.id} tag={tag} />
          ))}
        </div>
      )}
    </div>
  );
};