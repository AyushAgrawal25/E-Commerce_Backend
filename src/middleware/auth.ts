import { NextFunction, Request, Response } from "express";
import { userAuthSessionSchema } from "../schemas/user.schema";
import { AUTHORIZATION_TOKEN, verifyToken } from "../utils/tokenUtils";

export default function auth(req: Request, res: Response, next: NextFunction) {
    try {
        const authToken = req.headers[AUTHORIZATION_TOKEN];
        if (!authToken) {
            throw 'Unauthorized';
        }

        const data = verifyToken(authToken);
        res.locals.user = userAuthSessionSchema.parse(data);
        next();
    } catch (error) {
        res.status(401).json({
            status: "Failed",
            error: error
        })
    }
}