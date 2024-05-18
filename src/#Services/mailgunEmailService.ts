import FormData from 'form-data';
import Mailgun from "mailgun.js";
import { iStrategyPattern } from '../Patterns/iStrategyPattern';
import { EmailModel } from '../Models/emailModel';

class mgEmailService implements iStrategyPattern<EmailModel>{
    private mailgun: any | undefined;
    constructor(){
        this.setAPI();
    }
    async execute(email: EmailModel): Promise<void> {
        try {
            // await this.mailgun.messages.create(process.env.MAILGUN_DOMAIN_KEY as string, {
            //     from: "maurosebaromero@hotmail.com", //Needs to be this email the sender
            //     to: email.receiver as string,
            //     subject: `${email.headline as string} - ${email.sender as string}`,
            //     text: email.content as string,
            // });

            console.log("Mensaje Enviado");
        } catch (error) {
            console.error("Error al enviar el correo electrónico de MailGun:", error);
            throw error;
        }
    }
    async setAPI() {
        try{

        }catch(err){
            console.log(err);
        }
        this.mailgun = new Mailgun(FormData).client({
            username: 'api',
            key: process.env.MAILGUN_API_KEY as string,
        });
    }    
}

export default new mgEmailService();