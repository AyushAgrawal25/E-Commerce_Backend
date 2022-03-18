import { sign, verify } from "jsonwebtoken";
import config from './../config/default';

export function generateToken(id:number, email:string){
    const generated_at=Date.now();
    const user={
        id, email, generated_at
    };

    const accessToken=sign(user, config.ACCESS_TOKEN_SECRET);
    return accessToken;
}

export function verifyToken(authToken: string){
    try{
        const data=verify(authToken, config.ACCESS_TOKEN_SECRET);
        return data;
    }
    catch(excp){
        throw('Invalid Authorization')
    }
}

export const AUTHORIZATION_TOKEN="authorization";
