import { Request, Response, Router } from "express";
import { getUsers, userLogin, userSignUp } from "../../controllers/users/users.controller";
import validateResource from "../../middleware/validateResource";
import { createUserSchema, loginUserSchema } from "../../schemas/user.schema";

export const usersRouter:Router = Router();

usersRouter.post('/signUp', validateResource(createUserSchema), userSignUp)
usersRouter.post('/login', validateResource(loginUserSchema), userLogin)
// usersRouter.get('/', getUsers);