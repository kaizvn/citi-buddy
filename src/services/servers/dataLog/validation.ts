import { z } from 'zod'

const zID = () =>
  z
    .string()
    .or(z.number())
    .transform((val) => parseInt(val as string))

export const logUploadSchema = z.object({
  utility_id: zID(),
  amount: zID(),
  logged_date: z.string(),
  city_id: zID(),
})
