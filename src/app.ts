import express, { ErrorRequestHandler, NextFunction, Request, Response, Router } from "express";
import cors from 'cors'

const initializeExpress=async()=>{
    try {
        const app=express();

        app.use(cors());
        app.use(express.json());

        const router=require('./routes/routes').default;
        
        app.use('/', router)
        app.get("/health", (req: Request, res: Response, next: NextFunction) => {
            res.status(200).json({
                'status': 'ok'
            })
        })

        const config=require('./config/default').default;
        const PORT = config.port;
        app.listen(PORT, async () => {
            console.log("This service is running on PORT : " + PORT);
        });
    } catch (error) {
        throw error;
    }
}

const main=async()=>{
    try {
        initializeExpress();
    } catch (error) {
        console.log(error)
    }
}

main();