import { Request, Response, Router } from "express";
import { usersRouter } from "./users/users.routes";

const router:Router = Router();

router.use('/users', usersRouter)

export default router;