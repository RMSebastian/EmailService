import sgMail from '@sendgrid/mail'
import { iStrategyPattern } from '../Patterns/iStrategyPattern';
import { EmailModel } from '../Models/emailModel';

class sgEmailService implements iStrategyPattern<EmailModel>{
    private sendgrid: any | undefined;
    constructor(){
        this.setAPI();
    }
    async execute(email: EmailModel): Promise<void> {
        try {
            if (!this.sendgrid) {
                throw new Error('Sendgrid client is not initialized');
            }
            // const msg = {
            //     from: 'maurosebaromero@hotmail.com', //Needs to be this email the sender
            //     to: email.receiver as string,
            //     subject: `${email.headline as string} - ${email.sender as string}`,
            //     text: email.content as string,
            // };

            // await sgMail.send(msg);

            console.log("Mensaje Enviado");
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);

            throw error;
        }
    }
    async setAPI(){
        this.sendgrid = sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
        
    }
}

export default new sgEmailService();