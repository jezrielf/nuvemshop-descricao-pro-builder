
import * as z from 'zod';

export const videoFormSchema = z.object({
  videoUrl: z.string().url({ message: "URL inválida" }),
  title: z.string(),
  description: z.string().optional(),
  autoplay: z.boolean().default(true)
});
