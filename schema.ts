import { Status } from '@prisma/client';
import {z} from 'zod';

export const createProjectSchema = z.object({
	title: z.string().min(3, "Title must be at least 3 characters"),
	description: z.string().min(10, "Description must be at least 10 characters"),
	startDate: z.coerce.date({
    message: 'You must have a valid date for the start date'
  }),
	dueDate: z.coerce.date({
    message: 'You must have a valid date for the due date'
  }),
});


export const createTaskSchema = z.object({
	title: z.string().min(3, "Title must be at least 3 characters"),
	dueDate: z.coerce.date({
		message: "You must have a valid date for the due date",
	}),
	startDate: z.coerce.date({
		message: "You must have a valid date for the start date",
	}),
	projectId: z.string().uuid("You must have a valid project id"),
  cost: z.coerce.number().default(0),
});


export const updateTaskStatusSchema = z.object({
  id: z.string(),
  status: z.enum(['notStarted', 'completed', 'archived', 'onHold', 'inProgress']),
  projectId: z.string()
})
