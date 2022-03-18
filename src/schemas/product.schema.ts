import {TypeOf, z} from 'zod';
import { orderSchema } from './order.schema';

export const productSchema=z.object({
    id: z.number().nullish().optional(),
    title: z.string({
        required_error: "Title is required."
    }),
    description: z.string({
        required_error: "Description is required."
    }),
    seller: z.string({
        required_error: "Seller name is required."
    })
});

export const searchProductSchema=z.object({
    body:productSchema.pick({
        title: true
    })
});

export type SearchProductInput=z.TypeOf<typeof searchProductSchema>;