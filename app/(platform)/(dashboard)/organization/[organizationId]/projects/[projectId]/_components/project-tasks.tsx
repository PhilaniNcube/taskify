"use client";
import { createTask } from "@/actions/create-task";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createTaskSchema } from "@/schema";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import type { Task } from "@prisma/client";
import { format, set } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useId, useOptimistic, useRef, useState, useTransition } from "react";
import { useFormState } from "react-dom";
import TaskListItem from "../../../tasks/_components/task-list-item";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import TaskDetail from "../../../tasks/_components/task-detail";
import UploadDocuments from "./upload-document";

const ProjectTasks = ({
	projectId,
	tasks,
}: { projectId: string; tasks: Task[] }) => {
	const id = useId();

  const searchParams = useSearchParams()


  const taskId = searchParams.get('taskId') || tasks[0].id || ''

	const [lastResult, formAction] = useFormState(createTask, undefined);

	const dialogRef = useRef<HTMLButtonElement>(null);

	const router = useRouter();


	const [optimisticTasks, setOptimisticTasks] = useOptimistic(
    tasks,
		(state, newTask: Task) => {
      return [...state, newTask];
		},
	);

 const [selectedTask, setSelectedTask] = useState<Task | undefined>(
		optimisticTasks.find((task) => task.id === taskId),
	);

	const [form, fields] = useForm({
		lastResult: undefined,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: createTaskSchema });
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	});

	const [open, setOpen] = useState(false);

	return (
		<div className="w-full py-6">
			<div className="grid gap-3 md:grid-cols-2">
				<div className="w-full">
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogClose
							ref={dialogRef}
							className="absolute top-0 right-0 p-2"
						/>
						<DialogTrigger asChild>
							<Button>Add Task</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<h1 className="text-xl font-semibold">Add Task</h1>
							</DialogHeader>
							<form
								id={form.id}
								onSubmit={form.onSubmit}
								action={(formData: FormData) => {
									const data = parseWithZod(formData, {
										schema: createTaskSchema,
									});

									if (data.status !== "success") {
										return;
									}

									setOptimisticTasks({
										title: data.value.title,
										startDate: data.value.startDate,
										dueDate: data.value.dueDate,
										projectId: projectId,
										cost: data.value.cost,
										orgId: "",
										userId: "",
										id: id,
										status: "notStarted",
									});

									formAction(formData);
									dialogRef.current?.click();
								}}
								className="flex flex-col space-y-4"
							>
								<div className="flex flex-col space-y-2">
									<Label htmlFor="title">Title</Label>
									<Input
										className=""
										type="text"
										name={fields.title.name}
										key={fields.title.key}
									/>
									<p className="text-sm text-rose-500">{fields.title.errors}</p>
								</div>{" "}
								<div className="flex flex-col space-y-2">
									<Label htmlFor="startDte">Start Date</Label>
									<Input
										type="date"
										name={fields.startDate.name}
										key={fields.startDate.key}
									/>{" "}
									<p className="text-sm text-rose-500">
										{fields.startDate.errors}
									</p>
								</div>
								<div className="flex flex-col space-y-2">
									<Label htmlFor="dueDate">Estimated Due Date</Label>
									<Input
										type="date"
										name={fields.dueDate.name}
										key={fields.dueDate.key}
									/>
									<p className="text-sm text-rose-500">
										{fields.dueDate.errors}
									</p>
								</div>
								<div className="flex flex-col space-y-2">
									<Label htmlFor="cost">Cost</Label>
									<Input
										type="number"
										name={fields.cost.name}
										key={fields.cost.key}
									/>
									<p className="text-sm text-rose-500">{fields.cost.errors}</p>
								</div>
								<Input type="hidden" value={projectId} name="projectId" />
								<div className="mt-3">
									<SubmitButton className="w-1/2">Save</SubmitButton>
								</div>
							</form>
						</DialogContent>
					</Dialog>
				</div>
			</div>
			<div className="grid gap-6 md:grid-cols-2">
				<ScrollArea className="h-[400px] py-3">
					{optimisticTasks.map((task) => {
						return (
							<TaskListItem
								task={task}
								key={task.id}
								setSelectedTask={setSelectedTask}
							/>
						);
					})}
					<ScrollBar />
				</ScrollArea>
				<div className="flex flex-col items-start w-full space-y-4">
					<TaskDetail
						setSelectedTask={setSelectedTask}
						task={selectedTask || optimisticTasks[0]}
					/>
          <UploadDocuments projectId={projectId} />
				</div>
			</div>
		</div>
	);
};
export default ProjectTasks;
