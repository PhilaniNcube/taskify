"use client";

import type { Project, Status, Task } from "@prisma/client";
import TaskCard from "./task-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useDroppable } from "@dnd-kit/core";

type TaskColumnProps = {
	tasks: {
		id: string;
		title: string;
		startDate: Date;
		dueDate: Date | null;
		status: Status;
		projectId: string;
		cost: number;
		orgId: string;
		userId: string;
    project: Project;
	}[];
	id: Status;
  heading: string;
};

const TaskColumn = ({tasks, id, heading}:TaskColumnProps) => {

  const {isOver, setNodeRef} = useDroppable({
    id,
  })

  return (
			<div ref={setNodeRef} className="p-2 bg-slate-100 h-[640px]">
				<h2 className="text-lg font-semibold">{heading}</h2>
				<ScrollArea className="h-[600px]">
					{tasks.map((task) => (
						<TaskCard task={task} key={task.id} />
					))}
					<ScrollBar />
				</ScrollArea>
			</div>
		);
};
export default TaskColumn;
