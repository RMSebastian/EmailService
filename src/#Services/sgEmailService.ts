import sgMail from '@sendgrid/mail'
import { iStrategyPattern } from '../Patterns/iStrategyPattern';
import { emailObject } from '../Objects/emailObject';

class sgEmailService implements iStrategyPattern<emailObject>{
    private sendgrid: any | undefined;
    constructor(){
        this.setAPI();
    }
    async execute(email: emailObject): Promise<void> {
        try{
            this.enviarCorreoSendGrid(email);
        }catch(err){
            console.log(err);
        }
    }
    async setAPI(){
        this.sendgrid = sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
    }
    
    async enviarCorreoSendGrid(email: emailObject):Promise<void> {
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
            // console.log('Correo electrónico enviado con éxito');
            console.log("Correcto");
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
        }
    }
}

export default new sgEmailService();