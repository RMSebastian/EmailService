import { Router ,Request, Response } from "express";
import { validateToken } from "../Middlewares/authToken";
import SchemaValidator from "../Schemas/schemaValidator";
import { createEmailSchema } from "../Schemas/EmailSchema";
import { RetrievePayload } from "../Middlewares/payloadRetriever";
import { EmailModel } from "../Models/emailModel";
import { EmailService } from "../#Services/emailService";
import emailRepository from "../#Repositories/emailRepository";
import { IEmailService } from "../#Services/Interfaces/IEmailService";
import mailgunEmailService from "../#Services/mailgunEmailService";
import sendgridEmailService from "../#Services/sendgridEmailService";

const emailRouter: Router = Router();
/**
 * @openapi
 * /email:
 *   post:
 *     summary: Envía un correo electrónico
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sender:
 *                 type: string
 *                 description: Quien envia el correo
 *               receiver:
 *                  type: string
 *                  description: Direccion de correo destinatario
 *               headline:
 *                 type: string
 *                 description: Asunto del correo electrónico
 *               content:
 *                 type: string
 *                 description: Cuerpo del correo electrónico
 *     responses:
 *       200:
 *         description: Correo electrónico enviado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje indicando que el correo electrónico se envió correctamente
 *                   example: Correo electrónico enviado exitosamente
 *       400:
 *         description: Solicitud incorrecta. El cuerpo de la solicitud es inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error que describe el problema con la solicitud
 *                   example: Se proporcionó una dirección de correo electrónico inválida
 *       500:
 *         description: Error interno del servidor. Algo salió mal en el lado del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error que indica un error inesperado en el lado del servidor
 *                   example: Error interno del servidor
 */
emailRouter.post("/email", [validateToken,SchemaValidator(createEmailSchema)], async (req: Request, res: Response)=>{
    
    const accessToken: string | undefined =req.header("authorization");
    
    if (!accessToken) {
        return res.status(401).json({ message: "Access denied. Token doesnt exist" });
    }

    const token: string = accessToken.split(" ")[1];
    
    const decodedToken: {username: string, id:string, role: string} | null = await RetrievePayload(token);

    if(!decodedToken || !decodedToken.username || !decodedToken.id || !decodedToken.role){
        return res.status(401).json({ message: "Access denied. Token doesnt contain all the data" });
    }
    const newEmail: EmailModel = new EmailModel();

    newEmail.senderId = Number(decodedToken.id);
    newEmail.headline =req.body.headline as string;
    newEmail.content =req.body.content as string;
    newEmail.SetSender(decodedToken.username);
    newEmail.SetReceiver(req.body.receiver);

    try{
        const emailService: IEmailService = new EmailService(newEmail,emailRepository,[mailgunEmailService, sendgridEmailService]);

        await emailService.sendEmail();

        res.status(200).json({ message: "Email successfully sent"});
    }catch(error){
        res.status(500).json({message: "Email Service Failure", error: error});
    }
    
});

export default emailRouter;