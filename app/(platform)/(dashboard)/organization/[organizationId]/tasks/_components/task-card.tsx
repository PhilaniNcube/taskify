"use client";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import type { Project, Task } from "@prisma/client";
import { format } from "date-fns";
import { Calendar, CalendarCheck, Link } from "lucide-react";
import ProjectStatus from "../../projects/[projectId]/_components/project-status";
import { cn, formatCurrency } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type TaskCardProps = {
	task: Task & { project: Project };
	index: number;
};

const TaskCard = ({ task, index }: TaskCardProps) => {

  const router = useRouter()

	return (
		<Draggable draggableId={task.id} index={index} >
			{(provided) => {
				return (
					<Card
						className={cn(
							"my-2 py-3 relative",
							task.status === "completed" && "bg-green-600 text-white",
							task.status === "notStarted" && "bg-zinc-200 text-slate-700",
							task.status === "onHold" && "bg-yellow-100 text-zinc-600",
							task.status === "inProgress" && "bg-blue-500 text-blue-50",
						)}
						{...provided.dragHandleProps}
						{...provided.draggableProps}
						ref={provided.innerRef}
						{...provided.dragHandleProps}
					>
						<CardContent>
							<div className="flex items-center justify-between mb-4">
								<Button
                  variant="ghost"
									onClick={() =>
										router.push(
											`/organization/${task.orgId}/projects/${task.projectId}?taskId=${task.id}`,
										)
									}
								>
									View Project
								</Button>
								<div className="flex text-xs">
									<CalendarCheck size={16} />
									<span className="flex items-center space-x-2">
										{format(task.startDate, "dd MMM")}
									</span>{" "}
									-{" "}
									<span className="flex items-center space-x-2">
										{task.dueDate && format(task?.dueDate, "dd MMM")}
									</span>
								</div>
							</div>
							<p className="mb-1 text-xs">Project: {task.project.title}</p>
							<h2 className="text-lg leading-5">{task.title}</h2>
							<p className="p-2 mt-2 text-xs text-white bg-black rounded-sm w-fit">
								{formatCurrency(task.cost)}
							</p>
						</CardContent>
					</Card>
				);
			}}
		</Draggable>
	);
};
export default TaskCard;
