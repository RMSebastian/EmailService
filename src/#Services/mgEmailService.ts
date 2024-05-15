import FormData from 'form-data';
import Mailgun from "mailgun.js";
import { iStrategyPattern } from '../Patterns/iStrategyPattern';
import { emailObject } from '../Objects/emailObject';

class mgEmailService implements iStrategyPattern<emailObject>{
    private mailgun: any | undefined;
    constructor(){
        this.setAPI();
    }
    async execute(email: emailObject): Promise<void> {
        try{
            this.enviarCorreoMailGun(email);
        }catch(err){
            console.log("dsad" + err);
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
    
    async enviarCorreoMailGun(email : emailObject) {
        try {
            

            
            // const response = await this.mailgun.messages.create(process.env.MAILGUN_DOMAIN_KEY as string, {
            //     from: 'maurosebaromero@hotmail.com', //Needs to be this email the sender
            //     to: email.receiver as string,
            //     subject: `${email.headline as string} - ${email.sender as string}`,
            //     text: email.content as string,
            // });
            // console.log('ID del mensaje:', response.id);
            // console.log('Estado del mensaje:', response.message);
            throw new Error('403');
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
        }
    }

    
}

export default new mgEmailService();