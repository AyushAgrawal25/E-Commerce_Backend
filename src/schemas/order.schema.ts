import { OrderStatus } from "@prisma/client";
import { z } from "zod";
import { productSchema } from "./product.schema";
import { userSchema } from "./user.schema";

export const orderSchema=z.object({
    id: z.number().nullish().optional(),
    
    productId: z.number({
        required_error: "Product Id is required."
    }),
    product: productSchema,

    userId: z.number({
        required_error: "User Id is required.",
    }),
    user: userSchema,

    createdAt: z.date({
        required_error: "Date is required."
    }),
    status: z.nativeEnum(OrderStatus)
})

export const placeOrderSchema=z.object({
    body: orderSchema.pick({
        productId: true
    })
})

export const cancelOrderSchema=z.object({
    body:z.object({
        orderId: z.number({
            required_error:"Order Id is required."
        })
    })
})

export type OrderModel=z.TypeOf<typeof orderSchema>;
export type PlaceOrderInput=z.TypeOf<typeof placeOrderSchema>;
export type CancelOrderInput=z.TypeOf<typeof cancelOrderSchema>;