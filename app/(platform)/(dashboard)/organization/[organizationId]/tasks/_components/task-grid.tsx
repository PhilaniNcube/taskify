"use client";
import type { Project, Status, Task } from "@prisma/client";
import { useOptimistic, useTransition } from "react";
import TaskCard from "./task-card";
import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area";
import { Reorder } from "framer-motion";
import { DndContext, type DragEndEvent, closestCenter, useDroppable} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskColumn from "./task-column";

type ExtendedTask = Task & { project: Project };

const TaskGrid = ({ tasks }: { tasks: ExtendedTask[] }) => {
	const [pending, startTransition] = useTransition();

	const [optimisticTasks, setOptimisticTasks] = useOptimistic(
		tasks,
		(tasks, newTask: ExtendedTask) => {
			// find the task that was updated form the tasks array
			const updatedTasks = tasks.map((task) => {
				if (task.id === newTask.id) {
					return newTask;
				}
				return task;
			});

			return updatedTasks;
		},
	);



	//filter tasks by status
	const notStartedTasks = tasks.filter((task) => task.status === "notStarted");
	const completedTasks = tasks.filter((task) => task.status === "completed");
	const onHoldTasks = tasks.filter((task) => task.status === "onHold");
	const inProgressTasks = tasks.filter((task) => task.status === "inProgress");

	console.log(notStartedTasks);

  const onDragEnd = (event:DragEndEvent) => {

    const {active, over} = event

    console.log(active.id, over?.id)


  }

	return (
		<DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
			<div className="grid h-[680px] grid-cols-4 gap-3">
				<TaskColumn tasks={notStartedTasks} id="notStarted" heading="Not Started" />
        <TaskColumn tasks={onHoldTasks} id="onHold" heading="On Hold" />
				<TaskColumn tasks={inProgressTasks} id="inProgress" heading="In Progress" />
				<TaskColumn tasks={completedTasks} id="completed" heading="Completed" />
			</div>
		</DndContext>
	);
};
export default TaskGrid;
