import { Request, Response } from "express";
import { EmailModel } from "../Models/emailModel";
import { RetrievePayload } from "../Middlewares/payloadRetriever";
import { EmailService } from "../#Services/emailService";

export async function sendEmail(req: Request, res: Response) {
    
    const accessToken: string | undefined =req.header("authorization");
    
    if (!accessToken) {
        return res.status(401).json({ message: "Acceso denegado. Token no proporcionado." });
    }

    const token: string = accessToken.split(" ")[1];
    
    const decodedToken: {username: string, id:string, role: string} | null = await RetrievePayload(token);

    const newEmail: EmailModel = new EmailModel();

    newEmail.senderId = Number(decodedToken?.id);

    newEmail.sender =req.body.sender;
    newEmail.receiver =req.body.receiver;
    newEmail.headline =req.body.headline;
    newEmail.content =req.body.content;
    
    try{
        await EmailService(newEmail);

        res.status(200).json({ message: "Email enviado exitosamente"});
    }catch(error){
        res.status(500).json({message: "Email Service Failure", error: error});
    }
    

}