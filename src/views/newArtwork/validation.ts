'use client';

import { z } from 'zod';

export const newArtworkSchema = z.object({
  title: z.string().min(5).max(50),
  description: z.string().min(5).max(200).or(z.literal('')),
  thumbnail: z.string().min(1, { message: 'Thumbnail is required' }),
  files: z
    .array(z.string())
    .min(1, { message: 'Artworks is required' })
    .max(5, {
      message: 'Max artworks is 5',
    }),
  folders: z.array(z.string()).min(0).max(10),
  medium: z.array(z.string()).min(1, { message: 'Select 1-3 medium' }).max(3),
  subjects: z
    .array(z.string())
    .min(1, { message: 'Select 1-3 subjects' })
    .max(3),
});

export type NewArtworkSchema = z.infer<typeof newArtworkSchema>;
