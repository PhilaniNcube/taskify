"use client";

import { updateTaskAction } from "@/actions/update-task";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from "@/components/ui/menubar";
import { cn, formatCurrency } from "@/lib/utils";
import type { Status, Task } from "@prisma/client";
import { format, isPast } from "date-fns";
import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";

type TaskDetailProps = {
	task: Task;
	setSelectedTask: (task: Task) => void;
};

const TaskDetail = ({ task, setSelectedTask }: TaskDetailProps) => {
	const router = useRouter();
	const overdue = task.dueDate ? isPast(new Date(task.dueDate)) : false;
	const [pending, startTransition] = useTransition();

	const [optimisticTask, setOptimisticTask] = useOptimistic(
		task,
		(task: Task, newStatus: Status) => {
			return {
				...task,
				status: newStatus,
			};
		},
	);

	async function formAction(formData: FormData) {
		const data = new FormData();

		data.append("id", optimisticTask.id);
		data.append("projectId", optimisticTask.projectId);
		data.append("status", formData.get("status") as Status);
		startTransition(async () => {
			setOptimisticTask(formData.get("status") as Status);
			const updatedTask = await updateTaskAction(data);
			setSelectedTask(updatedTask);
		});
	}

	return (
		<Card className={cn("relative", pending ? "animate-pulse" : "opacity-100")}>
			<Badge className="absolute top-3 right-3">
				{optimisticTask.status === "archived" && "Archived"}
				{optimisticTask.status === "completed" && "Completed"}
				{optimisticTask.status === "inProgress" && "In Progress"}
				{optimisticTask.status === "notStarted" && "Not Started"}
				{optimisticTask.status === "onHold" && "On Hold"}
			</Badge>
			<CardHeader>
				<CardTitle>{task.title}</CardTitle>
				<p>{formatCurrency(task.cost)}</p>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col w-full text-xs gap-y-4 md:gap-y-0 md:flex-row md:justify-between">
					<span className="p-2 text-white rounded-full bg-slate-500">
						Start Date: {format(optimisticTask.startDate, "PPP")}
					</span>
					<span
						className={cn(
							"p-2 rounded-full",
							overdue
								? "text-red-100 bg-red-700"
								: "text-green-100 bg-green-700",
						)}
					>
						Due Date:{" "}
						{optimisticTask.dueDate && format(optimisticTask.dueDate, "PPP")}
					</span>
				</div>
				<div className="flex flex-wrap items-center mt-2 space-x-3">
					<form action={formAction}>
						<Input type="hidden" name="status" value="inProgress" />
						<Button size="sm" variant="ghost" type="submit">
							In Progress
						</Button>
					</form>{" "}
					<form action={formAction}>
						<Input type="hidden" name="status" value="notStarted" />
						<Button size="sm" variant="ghost" type="submit">
							Not Started
						</Button>
					</form>{" "}
					<form action={formAction}>
						<Input type="hidden" name="status" value="onHold" />
						<Button size="sm" variant="ghost" type="submit">
							On Hold
						</Button>
					</form>{" "}
					<form action={formAction}>
						<Input type="hidden" name="status" value="completed" />
						<Button size="sm" variant="ghost" type="submit">
							Completed
						</Button>
					</form>{" "}
					<form action={formAction}>
						<Input type="hidden" name="status" value="archived" />
						<Button size="sm" variant="ghost" type="submit">
							Archived
						</Button>
					</form>
				</div>
			</CardContent>
		</Card>
	);
};
export default TaskDetail;
