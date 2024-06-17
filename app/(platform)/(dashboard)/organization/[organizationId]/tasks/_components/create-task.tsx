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
import { createTaskSchema } from "@/schema";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";

const CreateTask = ({projectId}:{projectId:string}) => {

  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLButtonElement>(null);

  	const [lastResult, formAction] = useFormState(createTask, undefined);

  	const [form, fields] = useForm({
				lastResult: undefined,
				onValidate({ formData }) {
					return parseWithZod(formData, { schema: createTaskSchema });
				},
				shouldValidate: "onBlur",
				shouldRevalidate: "onInput",
			});

  return (
			<div>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogClose ref={dialogRef} className="absolute top-0 right-0 p-2" />
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
							action={async(formData: FormData) => {
								const data = parseWithZod(formData, {
									schema: createTaskSchema,
								});

								if (data.status !== "success") {
									return;
								}


								await formAction(formData);
								// dialogRef.current?.click();

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
								<p className="text-sm text-rose-500">{fields.dueDate.errors}</p>
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
		);
};
export default CreateTask;
