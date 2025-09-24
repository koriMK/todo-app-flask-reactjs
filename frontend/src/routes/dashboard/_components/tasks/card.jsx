import { TagBadge } from "../tags/tag-badge";
import { StatusBadge } from "./status-badge";
import { ShowDialog } from "./show-dialog";
import { EditDialog } from "./edit-dialog";
import { CollaboratorsDialog } from "./collaborators-dialog.jsx";
import { AddCollaboratorButton } from "./add-collaborator-button.jsx";

export const TaskCard = ({ task }) => {
  return (
    <div className="glovo-card rounded-xl p-4 hover-lift">
      <div className="pb-2 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ShowDialog task={task} />
            <EditDialog task={task} />
          </div>
          <CollaboratorsDialog task={task} />
        </div>
        <div className="flex justify-center">
          <AddCollaboratorButton task={task} />
        </div>
      </div>
      <div className="flex items-center gap-x-1">
        <TagBadge name={task.tagName} />
        <StatusBadge status={task.status} />
      </div>
    </div>
  );
};
