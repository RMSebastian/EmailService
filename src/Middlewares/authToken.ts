import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function validateToken(req: Request, res: Response, next: NextFunction) {
    const accessToken: string | undefined =req.header("authorization");
    if (!accessToken) {
        return res.status(401).json({ message: "Acceso denegado. Token no proporcionado." });
    }
    const token: string = accessToken.split(" ")[1];
    try{
        jwt.verify(token, process.env.SECRET_JWT as string);
        next();
    }catch(err){
        res.status(400).json({ message: "Acceso denegado. Token inválido.", token: token });
    }
}