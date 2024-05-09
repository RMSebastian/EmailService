import FormData from 'form-data';
import Mailgun from "mailgun.js";
import { iStrategyPattern } from '../Pattern/iStrategyPattern';

class mgEmailService implements iStrategyPattern{
    private mailgun: any | undefined;
    constructor(){
        this.setAPI();
    }
    async execute(): Promise<void> {
        try{
            this.enviarCorreoMailGun();
        }catch(err){
            console.log(err);
        }
    }
    async setAPI() {
        this.mailgun = new Mailgun(FormData).client({
            username: 'api',
            key: process.env.MAILGUN_API_KEY as string,
        });
    }
    
    async enviarCorreoMailGun() {
        try {
            if (!this.mailgun) {
                throw new Error('Mailgun client is not initialized');
            }
            
            const response = await this.mailgun.messages.create(process.env.MAILGUN_DOMAIN_KEY as string, {
                from: 'maurosebaromero@hotmail.com',
                to: 'mauroromero@sirius.com.ar',
                subject: '¡Hola desde Mailgun y TypeScript!',
                text: 'Este es un correo electrónico de prueba enviado con Mailgun y TypeScript.',
                html: '<strong>Este es un correo electrónico de prueba enviado con Mailgun y TypeScript.</strong>',
            });
            console.log('ID del mensaje:', response.id);
            console.log('Estado del mensaje:', response.message);
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
        }
    }
}

export default new mgEmailService();