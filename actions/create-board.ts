"use server";
import { db } from "@/lib/db";
import { z } from "zod";

const formSchema = z.object({
  title: z.string()
})


export async function create(formData:FormData) {

  const title = formData.get('title');

  const validatedFields = formSchema.safeParse({ title });

  if (!validatedFields.success) {
    throw new Error('Invalid form data');
  }

  await db.board.create({
    data: {
      title: validatedFields.data.title
    }
  })

}
