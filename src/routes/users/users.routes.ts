import { Request, Response, Router } from "express";
import { getUsers, userSignUp } from "../../controllers/users/users.controller";
import validateResource from "../../middleware/validateResource";
import { createUserSchema } from "../../schemas/user.schema";

export const usersRouter:Router = Router();

usersRouter.post('/signUp', validateResource(createUserSchema), userSignUp)
usersRouter.get('/', getUsers);