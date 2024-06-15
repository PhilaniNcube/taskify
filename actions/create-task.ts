"use server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import { db } from "@/lib/db";
import { createTaskSchema } from "@/schema";
import { revalidatePath } from "next/cache";

export async function createTask(prevState: unknown, formData: FormData) {
	const { userId, orgId } = auth();

	if (!userId || !orgId) {
		return {
			status: "error",
			error: {
				authentication: "You must be logged in to create a task",
			},
		};
	}

	const validatedFields = parseWithZod(formData, {
		schema: createTaskSchema,
	});

  console.log(validatedFields);

	if (validatedFields.status !== "success") {
		return {
			status: validatedFields.reply().status,
			error: validatedFields.reply().error,
		};
	}

	// create the task
	const task = await db.task.create({
		data: {
			title: validatedFields.value.title,
			startDate: validatedFields.value.startDate,
			dueDate: validatedFields.value.dueDate,
			projectId: validatedFields.value.projectId,
			cost: validatedFields.value.cost,
			orgId,
			userId,
		},
	});

	revalidatePath(
		`/organization/${orgId}/projects/${validatedFields.value.projectId}`,
	);

	return {
		status: "success",
		error: null,
		data: task,
	};
}
