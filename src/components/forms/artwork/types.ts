import { z } from "zod";

export const artworkFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(2, "Category is required"),
  image: z.any().optional(),
  inspiration: z.string().optional(),
});

export type ArtworkFormValues = z.infer<typeof artworkFormSchema>;