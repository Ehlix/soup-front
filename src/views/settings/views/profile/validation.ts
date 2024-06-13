import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(5).max(50),
  city: z.string().min(5).max(50),
  country: z.string().min(5, { message: 'Select country' }).max(100),
  headline: z.string().min(5).max(200),
  description: z.string().min(5).max(777).optional().or(z.literal('')),
  avatar: z.string().optional(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;

export const socialSchema = z.object({
  publicEmail: z
    .string()
    .email('Enter valid email')
    .min(5)
    .max(50)
    .optional()
    .or(z.literal('')),
  website: z.string().min(5).max(50).optional().or(z.literal('')),
  twitter: z.string().min(5).max(50).optional().or(z.literal('')),
  facebook: z.string().min(5).max(50).optional().or(z.literal('')),
  instagram: z.string().min(5).max(50).optional().or(z.literal('')),
  linkedin: z.string().min(5).max(50).optional().or(z.literal('')),
});

export type SocialSchema = z.infer<typeof socialSchema>;
