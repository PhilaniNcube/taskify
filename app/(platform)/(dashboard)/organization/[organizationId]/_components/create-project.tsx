"use client";

import { createProject } from "@/actions/create-project";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createProjectSchema } from "@/schema";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { useFormState } from "react-dom";

const CreateProject = () => {
	const [lastResult, formAction] = useFormState(createProject, undefined);

	const [isOpen, setIsOpen] = useState(false);

  const dialogRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();

	const [isPending, startTransition] = useTransition();

	const [form, fields] = useForm({
		lastResult: undefined,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: createProjectSchema });
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",

	});

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogClose ref={dialogRef}  className="absolute top-0 right-0 p-2" />
			<DialogTrigger asChild>
				<Button
					size="icon"
					className="p-2 w-fit"
					variant="primary"
					type="button"
				>
					<PlusIcon /> Create Project
				</Button>
			</DialogTrigger>
			<DialogContent>
				<form
					id={form.id}
					onSubmit={form.onSubmit}
					action={(formData: FormData) => {

            formAction(formData);


            startTransition(() => {
              setIsOpen(false);
              dialogRef.current?.click();
              // router.refresh();
            });
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
					</div>
					<div className="flex flex-col space-y-2">
						<Label htmlFor="description">Description</Label>
						<Textarea
							name={fields.description.name}
							key={fields.description.key}
						/>
						<p className="text-sm text-rose-500">{fields.description.errors}</p>
					</div>
					<div className="flex flex-col space-y-2">
						<Label htmlFor="startDte">Start Date</Label>
						<Input
							type="date"
							name={fields.startDate.name}
							key={fields.startDate.key}
						/>{" "}
						<p className="text-sm text-rose-500">{fields.startDate.errors}</p>
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
					<SubmitButton className="bg-teal-700">Create Project</SubmitButton>
				</form>
			</DialogContent>
		</Dialog>
	);
};
export default CreateProject;
