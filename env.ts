import { z } from "zod";

const envSchema = z.object({
	NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
	CLERK_SECRET_KEY: z.string(),
	NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string(),
	NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string(),
	NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string(),
	NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string(),
	DATABASE_URL: z.string(),
	UPLOADTHING_SECRET: z.string(),
	UPLOADTHING_APP_ID: z.string(),
	NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string(),
	CLOUDINARY_API_SECRET: z.string(),
	NEXT_PUBLIC_CLOUDINARY_API_KEY: z.string(),
	NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: z.string(),
});

envSchema.parse(process.env);

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envSchema> {}
	}
}
