import {z} from "zod"

//User Regsiter Validation Schema
export const registerSchema = z.object({
    name:z.string().min(3, 'Name must be al least 2 characters'),
    email:z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

// User Login Validation Schema
export const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

// User Profile Update Validation Schema
export const updateProfileSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters').optional(),
    email: z.string().email('Invalid email format').optional(),
    password: z.string().min(6, 'Password must be at least 6 characters').optional(),
});