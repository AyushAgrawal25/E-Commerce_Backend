import { Request, Response, Router } from "express";
import { ordersRouter } from "./orders/orders.routes";
import { productsRouter } from "./products/products.routes";
import { usersRouter } from "./users/users.routes";

const router:Router = Router();

router.use('/users', usersRouter)
router.use('/products', productsRouter)
router.use('/orders', ordersRouter)

export default router;