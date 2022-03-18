import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { CreateUserInput, UserLoginInput } from "../../schemas/user.schema";
import { AUTHORIZATION_TOKEN, generateToken } from "../../utils/tokenUtils";

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

export const userLogin=async(req: Request<{}, {}, UserLoginInput['body']>, res: Response)=>{
    try {
        const user=await prisma.user.findFirst({
            where:{
                email: req.body.email
            }
        });

        if(user==null){
            res.status(404).json({
                status: "Failed",
                error: 'User not found.'
            });
            return;
        }

        if(user.password!=req.body.password){
            res.status(405).json({
                status: "Failed",
                error: 'Invalid email or password.'
            });
            return;
        }

        const authToken=generateToken(user.id, user.email);
        const respData:any={
            user:{
                id: user.id,
                email:user.email,
                name: user.name
            },
        };
        respData[AUTHORIZATION_TOKEN]=authToken;
        res.status(200).json({
            status:"Success",
            ...respData,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Failed",
            error: error
        });
    }
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