import { Request, Response } from "express";
import mgEmailService from "../#Services/mgEmailService";
import sgEmailService from "../#Services/sgEmailService";
import { emailObject } from "../Objects/emailObject";

export async function sendEmail(req: Request, res: Response) {

    const emailBody: emailObject={
        sender: req.body.sender,
        receiver: req.body.receiver,
        headline: req.body.headline,
        content: req.body.content,
    }
    const functions = [
        (email: emailObject) => mgEmailService.execute(email),
        (email: emailObject) => sgEmailService.execute(email)
    ];

    
    for (const emailFunction of functions) {
        try {
            console.log("Enter for loop for functions");
            await emailFunction(emailBody);
            break; // Rompe el bucle en caso de éxito
        } catch (error: any) {
            if (error.message.includes("403")) {
                console.log("Se produjo un error 403, ejecutando la siguiente función...");
                continue; // Continúa con la siguiente función en caso de error 403
            } else {
                console.error("Error desconocido:", error);
                break; // Rompe el bucle si se produce un error distinto a 403
            }
        }
    }
        
}