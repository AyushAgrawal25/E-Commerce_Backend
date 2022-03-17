import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { CreateUserInput } from "../../schemas/user.schema";

const prisma = new PrismaClient()
export const userSignUp=async(req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
    try {
        const user=await prisma.user.create({
            data:{
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
            },
            select:{
                id: true,
                email: true,
                name: true
            },
        });

        res.status(201).json({
            status:"sucess",
            message:"User Created Successfully...!",
            data: user
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "failed",
            error: error
        });
    }
}

export const userLogin=async()=>{
    
}

export const getUsers=async(req: Request, res: Response)=>{
    try {
        const users=await prisma.user.findMany({
            select:{
                id: true,
                email: true,
                name: true
            }
        });
        res.status(200).json({
            status:"success",
            data: users,
            message:"User Successfully Fetched.. !"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:"Failed",
            error:error
        })
    }
}