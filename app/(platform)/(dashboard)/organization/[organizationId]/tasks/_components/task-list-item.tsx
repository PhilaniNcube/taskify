"use client";
import type { Task } from "@prisma/client";
import {
		Select,
		SelectContent,
		SelectGroup,
		SelectItem,
		SelectLabel,
		SelectTrigger,
		SelectValue,
	} from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import { format, compareDesc, isPast } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import DeleteTask from "./delete-task";

type TaskListItemProps = {
  task:Task;
  setSelectedTask: (task:Task) => void;
}

const TaskListItem = ({ task, setSelectedTask }: TaskListItemProps) => {
	const overdue = task.dueDate ? isPast(new Date(task.dueDate)) : false;
  const router = useRouter()

	return (
		<Card
			className="relative my-2"
			onClick={() => {
				setSelectedTask(task);
        router.push(`/organization/${task.orgId}/projects/${task.projectId}?taskId=${task.id}`)
			}}
		>
      <DeleteTask taskId={task.id} projectId={task.projectId} orgId={task.orgId} />
			<CardContent className="p-4">
				<div className="flex-1">
					<h3 className="text-base text-neutral-700 line-clamp-1">
						{task.title}
					</h3>
					<p className="text-sm text-neutral-400">
						{formatCurrency(task.cost)}
					</p>
					{overdue ? (
						<p className="text-sm text-red-500">
							Overdue: {task.dueDate && format(task?.dueDate, "PPP")}
						</p>
					) : (
						<p className="text-sm text-neutral-500">
							Due Date: {task.dueDate && format(task?.dueDate, "PPP")}
						</p>
					)}
				</div>
			</CardContent>
		</Card>
	);
};
export default TaskListItem;
