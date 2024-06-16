"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteTaskAction(id:string) {
  const {orgId, userId} = auth()

  // if there is no orgId or no userId return early
  if(!orgId || !userId) {
    throw new Error('You must be logged in to delete a task')
  }

  try {

    const task = await db.task.delete({
      where: {
        id
      }
    })

    if(!task) {
      throw new Error('Task not found')
    }

    return task;

  } catch (error) {

    return {
      message: 'Could not delete task'
    }

  } finally {

    revalidatePath(`/organization/${orgId}/projects/`)

  }

}
