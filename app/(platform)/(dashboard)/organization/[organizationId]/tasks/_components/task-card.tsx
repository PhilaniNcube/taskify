"use client";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import type { Project, Task } from "@prisma/client";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import ProjectStatus from "../../projects/[projectId]/_components/project-status";
import { cn, formatCurrency } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Draggable, Droppable } from "@hello-pangea/dnd";

type TaskCardProps = {
	task: Task & { project: Project };
	index: number;
};

const TaskCard = ({ task, index }: TaskCardProps) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: task.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<Draggable draggableId={task.id} index={index} >
			{(provided) => {
				return (
					<Card className="my-2" {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
						<CardHeader
              {...provided.dragHandleProps}
							className={cn(
								"mb-2",
								task.status === "completed" && "bg-green-600 text-white",
								task.status === "notStarted" && "bg-zinc-200 text-slate-700",
								task.status === "onHold" && "bg-yellow-100 text-zinc-600",
								task.status === "inProgress" && "bg-blue-500 text-blue-50",
							)}
						>
							<div className="flex justify-between">
								<p className="text-xs">Project: {task.project.title}</p>
							</div>

							<h2 className="text-lg">{task.title}</h2>
						</CardHeader>
						<CardContent>
							<div className="text-xs text-slate-600">
								<p>{formatCurrency(task.cost)}</p>
							</div>
						</CardContent>
						<CardFooter className="flex justify-start">
							<span className="flex items-center space-x-2">
								{format(task.startDate, "dd MMM")}
							</span>{" "}
							-{" "}
							<span className="flex items-center space-x-2">
								{task.dueDate && format(task?.dueDate, "dd MMM")}
							</span>
						</CardFooter>
					</Card>
				);
			}}
		</Draggable>
	);
};
export default TaskCard;
