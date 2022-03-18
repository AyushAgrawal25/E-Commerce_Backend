import { OrderStatus, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CancelOrderInput, PlaceOrderInput } from "../../schemas/order.schema";
import { UserAuthSession } from "../../schemas/user.schema";
import { Locals } from "../interfaces/locals.interface";

const prisma=new PrismaClient();
export async function placeOrder(req: Request<{}, {}, PlaceOrderInput['body']>, res: Response<{}, Locals<UserAuthSession>>) {
    try {
        const order=await prisma.order.create({
            data:{
                productId: req.body.productId,
                userId: res.locals.user.id,
                status: OrderStatus.Placed
            },
            select:{
                id: true,
                createdAt: true,
                product: true,
                productId: true,
                userId: true
            }
        });

        res.status(201).json({
            status:"Success",
            data: order
        })
    } catch (error) {
        res.status(200).json({
            status:"Failed",
            error:error
        });
    }
}

export async function getOrders(req: Request, res: Response<{}, Locals<UserAuthSession>>) {
    try {
        const orders=await prisma.order.findMany({
            where:{
                userId: res.locals.user.id
            },
            include:{
                product: true
            }
        })

        res.status(200).json({
            status:"Success",
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            status:"Failed",
            error:error
        })
    }
}

export async function cancelOrder(req: Request<{}, {}, CancelOrderInput['body']>, res: Response<{}, Locals<UserAuthSession>>) {
    try {
        const order=await prisma.order.findFirst({
            where:{
                id: req.body.orderId,
                status: OrderStatus.Placed
            }
        })

        if(order==null){
            res.status(404).json({
                status:"Failed",
                error:"Order Not Found"
            });
            return;
        }

        const orderUpdate=await prisma.order.update({
            data:{
                status: OrderStatus.Cancelled
            },
            where:{
                id: req.body.orderId
            },
            include:{
                product:true
            }
        }) 

        res.status(200).json({
            status:"Success",
            data: orderUpdate
        })
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            error: error
        })
    }
}