import { z } from 'zod'

export const productSchema = z.object({
    id: z.number(),
    title: z.string(),
    category: z.string(),
    price: z.number(),
    rating: z.number(),
    thumbnail: z.string().url(),
})

export const productResponseSchema = z.object({
  products: z.array(productSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
})

export type Product = z.infer<typeof productSchema>