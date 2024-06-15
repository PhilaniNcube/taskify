import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function getTasks(projectId: string) {
  const { orgId } = auth();

  if (!orgId) {
    return {
      error: "You must be logged in to view tasks",
    };
  }

  const tasks = await db.task.findMany({
    where: {
      projectId: projectId,
    },
  });

  return {
    tasks,
  };
}
