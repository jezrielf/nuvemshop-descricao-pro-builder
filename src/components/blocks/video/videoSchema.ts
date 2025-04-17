
import * as z from 'zod';

export const videoFormSchema = z.object({
  videoUrl: z.string().url({ message: "URL inválida" }),
  title: z.string(),
  description: z.string().optional(),
  autoplay: z.boolean().default(true),
  caption: z.string().optional(),
  aspectRatio: z.enum(['16:9', '4:3', '1:1']).default('16:9')
});
