import { z } from 'zod';

export const signUpFormSchema = z.object({
	email: z.string().trim().email(),
	password: z
		.string()
		.trim()
		.min(8, { message: 'Must have at least 8 characters' })
		.regex(/[^a-zA-Z0-9]/, { message: 'Must contain a special character' })
		.regex(/[0-9]/, { message: 'Must include at least one number' }),
});

export type schema = z.infer<typeof signUpFormSchema>;
