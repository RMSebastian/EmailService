import emailRepository from "../#Repositories/emailRepository";
import mgEmailService from "../#Services/mailgunEmailService";
import sgEmailService from "../#Services/sendgridEmailService";
import { EmailModel } from "../Models/emailModel";

export async function EmailService(emailModel: EmailModel) {
    try{
        const emailCount : number = await emailRepository.retrieveCountEmails(Number(emailModel?.id));
    
        if(emailCount > 15){
            throw new Error("Enough messages for you pal");
        }
        
        const functions: ((email: EmailModel) => Promise<void>)[]= [
            (email: EmailModel) => mgEmailService.execute(email),
            (email: EmailModel) => sgEmailService.execute(email),
        ];
    
        let flag: boolean = false;
        
        for (const emailFunction of functions) {
            try {
                await emailFunction(emailModel);
    
                flag = !flag;
    
                break;
            } catch (error: any) {
    
                console.error("Continuando con el siguiente servicio: ", error)
                continue;
            }
        }
        if(!flag){
            throw new Error("Non-EmailService currently on service")
        }else{
            await emailRepository.create(emailModel).catch((error) =>{
                console.log("Error Trying to save an email: ", error);
            });            
        }
    }catch(error){
        throw error;
    }
    
    
}