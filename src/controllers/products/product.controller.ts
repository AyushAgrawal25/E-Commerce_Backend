import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { SearchProductInput } from "../../schemas/product.schema";
import { UserAuthSession, UserModel } from "../../schemas/user.schema";
import { Locals } from "../interfaces/locals.interface";

const prisma=new PrismaClient();

export async function searchProducts(req: Request<{}, {}, SearchProductInput['body']>, res: Response<{}, Locals<UserAuthSession> >) {
    try {
        const products=await prisma.product.findMany({
            where:{
                title:{
                    contains: req.body.title
                }
            }
        })

        res.status(200).json({
            status:"Success",
            data: products
        });
    } catch (error) {
        res.status(500).json({
            status:"Failed",
            error: error
        })
    }
}