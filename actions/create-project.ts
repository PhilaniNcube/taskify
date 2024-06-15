"use server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import { db } from "@/lib/db";
import { createProjectSchema } from "@/schema";
import { revalidatePath } from "next/cache";




export async function createProject(prevState: unknown, formData: FormData) {
	//get the current userid and the orgId from clerk
	const { userId, orgId } = auth();

	if (!userId || !orgId) {
		return {
      status: "error",
      error: {
        authentication: "You must be logged in to create a project",
      }
    }
	}

	const validatedFields = parseWithZod(formData, {
		schema: createProjectSchema,
	});

  if (validatedFields.status !== 'success') {
    return {
      status: validatedFields.reply().status,
      error: validatedFields.reply().error,
    }
  }

  //create the project
  const project = await db.project.create({
    data: {
      title: validatedFields.value.title,
      orgId: orgId,
      description: validatedFields.value.description,
      startDate: validatedFields.value.startDate,
      dueDate: validatedFields.value.dueDate,
    }
  })

  revalidatePath(`organization/${orgId}`)

  return {
    status: 'success',
    error: null,
    data: project
  }

}
