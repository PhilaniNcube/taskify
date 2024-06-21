import { db } from "@/lib/db";

export async function getProjectDocuments(projectId: string) {

  const documents = await db.document.findMany({
    where: {
      projectId
    }
  })

  if (!documents || documents.length === 0) {
    return {
      error: "No documents found",
      documents: null
    }
  }

  return {
    error: null,
    documents
  }
}
