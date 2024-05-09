import sgMail from '@sendgrid/mail'
import { iStrategyPattern } from '../Pattern/iStrategyPattern';

class sgEmailService implements iStrategyPattern{
    
    constructor(){
        this.setAPI();
    }
    async execute(): Promise<void> {
        try{
            this.enviarCorreoSendGrid();
        }catch(err){
            console.log(err);
        }
    }
    async setAPI(){
        sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
    }
    
    async enviarCorreoSendGrid():Promise<void> {
        const msg = {
        to:"mauroromero@sirius.com.ar",
        from:"maurosebaromero@hotmail.com",
        subject:"Testing sendGrind subject",
        text:"Testing sendGrind subject text",
        html: "<h1>Testing sendGrind html</h1>"
        };
    
        try {
            await sgMail.send(msg);
            console.log('Correo electrónico enviado con éxito');
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
        }
    }
}

export default new sgEmailService();