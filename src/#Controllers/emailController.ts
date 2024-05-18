import { Request, Response } from "express";
import mgEmailService from "../#Services/mgEmailService";
import sgEmailService from "../#Services/sgEmailService";
import { EmailModel } from "../Models/emailModel";
import emailRepository from "../#Repositories/emailRepository";
import { RetrievePayload } from "../Middlewares/payloadRetriever";

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
    
    const emailCount : number = await emailRepository.retrieveCountEmails(Number(decodedToken?.id));
    
    if(emailCount > 15){
        res.status(401).json({message: "Enough messages for you pal"});
        return;
    }
    
    const functions: ((email: EmailModel) => Promise<void>)[]= [
        (email: EmailModel) => mgEmailService.execute(email),
        (email: EmailModel) => sgEmailService.execute(email),
    ];

    let flag: boolean = false;
    
    for (const emailFunction of functions) {
        try {
            await emailFunction(newEmail);

            flag = !flag;

            break;
        } catch (error: any) {

            console.error("Continuando con el siguiente servicio: ", error)
            continue;
        }
    }
    if(!flag){
        res.status(500).json({message: "No fue posible enviar el email con ningun servicio"})
    }else{
        await emailRepository.create(newEmail).catch((error) =>{
            console.log("Error Trying to save an email: ", error);
        });

        res.status(200).json({ message: "Email enviado exitosamente"});
    }
    
}