import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@prisma/client";
import ProjectStatus from "./project-status";

import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const ProjectHeader = ({ project }: { project: Project }) => {
	return (
		<Card className="">
			<CardHeader className="flex flex-row items-center justify-between bg-slate-200">
				<div>
					<CardTitle>{project.title}</CardTitle>
          <p className="mt-1 text-sm text-zinc-900">Budget: {project.budget ? formatCurrency(project.budget) : 'N/A'}</p>
				</div>
				<ProjectStatus status={project.status} />
			</CardHeader>
			<CardContent className="mt-4">
				<div className="flex flex-row items-center space-x-12">
					<span className="flex text-zinc-600">
						<Calendar className="w-6 h-6 mr-2" />
						Start Date: {format(new Date(project.startDate), "MMM dd, yyyy")}
					</span>
					<span className="flex text-zinc-600">
						<Calendar className="w-6 h-6 mr-2" />
						Due Date: {format(new Date(project.dueDate), "MMM dd, yyyy")}
					</span>
				</div>
				<div className="mt-6">
					<p className="text-lg font-medium text-muted-foreground">
						{project.description}
					</p>
				</div>
			</CardContent>
		</Card>
	);
};
export default ProjectHeader;
