"use server";

import { db } from "@/lib/db";
import cloudinaryClient from "@/utils/cloudinary";
import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";




export async function uploadFile(formData: FormData) {

  // Configuration
	cloudinary.config({
		cloud_name: "dozpb0ccl",
		api_key: "356178379936539",
		secure: true,
		upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
		api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
	});

	const { userId, orgId } = auth();

	if (!userId || !orgId) {
		throw new Error("Unauthorized");
	}

	const file = formData.get("file") as File;
  const projectId = formData.get("projectId") as string;

  if (!file) {
    throw new Error("No file found");
  }

  if (!projectId) {
    throw new Error("No project id found");
  }

	// turn into array buffer
	const arrayBuffer = await file.arrayBuffer();

	const buffer = new Uint8Array(arrayBuffer);

	// upload file to cloudinary
   await new Promise((resolve, reject) => {
      cloudinary.uploader
							.upload_stream(
								{
                 tags: [orgId, projectId],
								},
								async (error, result) => {
									if (error) {
										reject(error);
										return;
									}

									console.log("Uploaded file to cloudinary", result);

                  if(!result?.url) {
                    reject("No url found in cloudinary response")
                    return;
                  }



                await db.document.create({
                    data: {
                      url: result.url,
                      projectId,
                      orgId,
                    }
                  })

									resolve(result);
								},
							)
							.end(buffer);

      revalidatePath(`/organization/${orgId}/projects/${projectId}`)
    })
}
