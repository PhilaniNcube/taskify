import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function getProjects() {
  const {orgId} = auth()

  if(!orgId) {
    return {
      error: 'You must be logged in to view projects'
    }
  }

  const projects = await db.project.findMany({
    where: {
      orgId: orgId
    }
  })



  return {
    projects
  }

}


export async function getProject(projectId: string) {

    const { orgId } = auth();

				if (!orgId) {
					return {
						error: "You must be logged in to view projects",
					};
				}

    const project = await db.project.findFirst({
        where: {
            id: projectId,
            orgId: orgId
        }
    })

    return {
        project
    }

}
