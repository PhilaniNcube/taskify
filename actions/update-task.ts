"use server";

import { db } from "@/lib/db";
import { updateTaskStatusSchema } from "@/schema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


export async function updateTaskAction(formData:FormData) {

  const {orgId, userId} = auth()

  // if there is no orgId or no userId return early
  if(!orgId || !userId) {
   throw new Error('You must be logged in to update a task')
  }

  const validatedFields = updateTaskStatusSchema.safeParse({
    id: formData.get('id'),
    status: formData.get('status'),
    projectId: formData.get('projectId')
  })

  if(!validatedFields.success) {
    throw new Error('Invalid fields')
  }

  const updatedStatus = await db.task.update({
    where: {
      projectId: validatedFields.data.projectId,
      id: validatedFields.data.id
    },
    data: {
      status: validatedFields.data.status
    }
  })

  revalidatePath(`/organization/${orgId}/projects/${validatedFields.data.projectId}?taskId=${updatedStatus.id}`)


  return updatedStatus;


}
