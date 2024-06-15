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

const TaskListItem = ({task}:{task:Task}) => {

  const overdue = task.dueDate ? isPast(new Date(task.dueDate)) : false


  return (
			<div className="w-full my-2 ">
				<div className="flex-1">
					<h3 className="text-base text-neutral-700 line-clamp-1">{task.title}</h3>
					<p className="text-sm text-neutral-500">
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
			</div>
		);
};
export default TaskListItem;