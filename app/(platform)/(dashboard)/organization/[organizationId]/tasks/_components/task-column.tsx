"use client";

import type { Project, Status, Task } from "@prisma/client";
import TaskCard from "./task-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

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

const TaskColumn = ({ tasks, id, heading }: TaskColumnProps) => {
	return (

			<div className="p-2 bg-slate-100 h-[640px]">
				<h2 className="text-lg font-semibold">{heading}</h2>
				<Droppable droppableId={id} type="list">
					{(provided) => {
						return (
							<ScrollArea {...provided.droppableProps} ref={provided.innerRef} className="h-[600px]">
								{tasks.map((task, index) => (
									<TaskCard task={task} key={task.id} index={index} />
								))}
								<ScrollBar />
                {provided.placeholder}
							</ScrollArea>
						);
					}}
				</Droppable>
			</div>

	);
};
export default TaskColumn;
