"use client";
import type { Project, Status, Task } from "@prisma/client";
import { useOptimistic, useTransition } from "react";
import TaskCard from "./task-card";
import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area";
import { Reorder } from "framer-motion";

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskColumn from "./task-column";
import { DragDropContext } from "@hello-pangea/dnd";
import { updateTaskAction } from "@/actions/update-task";

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
	const notStartedTasks = optimisticTasks.filter(
		(task) => task.status === "notStarted",
	);
	const completedTasks = optimisticTasks.filter(
		(task) => task.status === "completed",
	);
	const onHoldTasks = optimisticTasks.filter((task) => task.status === "onHold");
	const inProgressTasks = optimisticTasks.filter(
		(task) => task.status === "inProgress",
	);



  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const onDragEnd = async (event:any) => {
    console.log("drag end", event)

    const {draggableId, source, destination, type} = event
    const {index: sourceIndex, droppableId: sourceId} = source

    if(!destination) {
      return
    }

    // dropped in the same position
    if(sourceId === destination.droppableId && sourceIndex === destination.index) {
      return
    }

    const destinationStatus = destination.droppableId as Status

    // find the task that was dragged
    const draggedTask = optimisticTasks.find(task => task.id === draggableId)

    if(!draggedTask) {
      return
    }

    // update the task status to the new status and update the task in the optimisticTasks array
    const updatedTask = {...draggedTask, status: destinationStatus}

    const formData = new FormData()
    formData.append('id', updatedTask.id)
    formData.append('status', destinationStatus)
    formData.append('projectId', updatedTask.projectId)

    startTransition(() => {
      setOptimisticTasks(updatedTask)
       updateTaskAction(formData)
    })







  }

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="grid h-[680px] grid-cols-4 gap-3">
				<TaskColumn
					tasks={notStartedTasks}
					id="notStarted"
					heading="Not Started"

				/>
				<TaskColumn tasks={onHoldTasks} id="onHold" heading="On Hold" />
				<TaskColumn
					tasks={inProgressTasks}
					id="inProgress"
					heading="In Progress"

				/>
				<TaskColumn
					tasks={completedTasks}
					id="completed"
					heading="Completed"

				/>
			</div>
		</DragDropContext>
	);
};
export default TaskGrid;
