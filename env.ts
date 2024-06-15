import {z} from 'zod';

const envSchema = z.object({
	NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
	CLERK_SECRET_KEY: z.string(),
	NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string(),
	NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string(),
	NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string(),
	NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string(),
	DATABASE_URL: z.string(),
});

envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
