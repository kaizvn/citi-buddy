import { z } from 'zod'

export const metadataSchema = z.object({
  unit: z.string().optional(),
  name: z.string(),
})
