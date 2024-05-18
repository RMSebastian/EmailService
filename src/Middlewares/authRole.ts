import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Role } from "../Enums/Roles";

export async function validateRole(req: Request, res: Response, next: NextFunction) {
    const accessToken: string | undefined = req.header("authorization");

    if(!accessToken){
        res.status(401).json({message: "❌ ERROR Validate Role , Token doesnt exist"});
    }
    const token: string = accessToken!.split(" ")[1];
    try {
        const decodedToken: {role: Role} = jwt.verify(token, process.env.SECRET_JWT as string) as { role: Role };

        if (decodedToken.role === Role.Admin) {
            next();
        } else {
            res.status(403).json({ message: "❌ ERROR Validate Role, Insufficient permissions" });
        }
    } catch (err) {
        console.error("❌ ERROR Validate Role:", err);
    }
}