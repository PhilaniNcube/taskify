import { Badge } from "@/components/ui/badge";
import type { Project } from "@prisma/client";

const ProjectStatus = ({status}:{status: Project['status']}) => {
  return (
			<div>
				{status === "completed" && (
					<Badge className="text-xs bg-green-600">Completed</Badge>
				)}
				{status === "archived" && (
					<Badge className="text-xs bg-slate-700">Archived</Badge>
				)}
				{status === "inProgress" && (
					<Badge className="text-xs bg-blue-600 ">In Progress</Badge>
				)}
				{status === "notStarted" && (
					<Badge className="text-xs bg-zinc-800">Not Started</Badge>
				)}
			</div>
		);
};
export default ProjectStatus;
