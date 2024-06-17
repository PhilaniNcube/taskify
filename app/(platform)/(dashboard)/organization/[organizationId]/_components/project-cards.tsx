import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getProjects } from "@/fetchers/projects";
import type { Project } from "@prisma/client";
import { Calendar, EyeIcon } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProjectStatus from "../projects/[projectId]/_components/project-status";

const ProjectCards = async () => {
	const result = await getProjects();

	const { projects, error } = result;

	if (error || projects?.length === 0 || !projects) {
		return (
			<div className="mt-4">
				<h1 className="text-2xl font-semibold">No Projects Found</h1>
			</div>
		);
	}

	return (
		<div className="w-full mt-4">
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{projects.map((project) => {
					return <ProjectCard key={project.id} project={project} />;
				})}
			</div>
		</div>
	);
};
export default ProjectCards;

const ProjectCard = ({ project }: { project: Project }) => {
	return (
		<Card className="relative w-full">

			<CardHeader className="flex flex-row items-center justify-between w-full text-3xl font-semibold line-clamp-1">
				<CardTitle>{project.title}</CardTitle>
			</CardHeader>
			<Link href={`/organization/${project.orgId}/projects/${project.id}`}>
				<Button
					size="sm"
					variant="primary"
					className="absolute bottom-2 right-2"
				>
					<EyeIcon className="mr-2" /> View Project
				</Button>
			</Link>
			<CardContent className="relative">
				<div>
					<h1 className="text-lg font-semibold">Description</h1>
					<p className="text-base line-clamp-3 text-neutral-700">
						{project.description}
					</p>
				</div>
			</CardContent>
			<CardFooter className="flex flex-col items-start space-y-3">
				<span className="flex items-end space-x-2">
					<Calendar size={16} />
					<span className="ml-2 text-xs">
						Start Date {format(project.startDate, "PPP")}
					</span>
				</span>
				<span className="flex items-end space-x-2">
					<Calendar size={16} />
					<span className="ml-2 text-xs">
						Due Date {format(project.startDate, "PPP")}
					</span>
				</span>
			</CardFooter>
		</Card>
	);
};
