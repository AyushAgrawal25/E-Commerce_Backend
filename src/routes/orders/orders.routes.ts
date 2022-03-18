import { Router } from "express";
import { cancelOrder, getOrders, placeOrder } from "../../controllers/orders/order.controller";
import auth from "../../middleware/auth";
import validateResource from "../../middleware/validateResource";
import { cancelOrderSchema, placeOrderSchema } from "../../schemas/order.schema";

export const ordersRouter:Router = Router();

ordersRouter.post('/place', [validateResource(placeOrderSchema), auth], placeOrder);
ordersRouter.get('/', auth, getOrders);
ordersRouter.delete('/cancel', [validateResource(cancelOrderSchema), auth], cancelOrder);