import { IEmailRepository } from "../#Repositories/Interfaces/IEmailRepository";
import { EmailModel } from "../Models/emailModel";
import { IEmailSender } from "./Interfaces/IEmailSender";
import { IEmailService } from "./Interfaces/IEmailService";
import * as constantData from "../Utils/constantData";
export class EmailService implements IEmailService{
    private emailRepository: IEmailRepository;
    private emailSenders: IEmailSender<EmailModel>[];
    private email: EmailModel;
    
    constructor(email: EmailModel,emailRepository: IEmailRepository,emailSenders: IEmailSender<EmailModel>[] ){
        this.emailRepository = emailRepository;
        this.emailSenders = emailSenders;
        this.email = email
    }
    async sendEmail() {
        try{
            const emailCount : number = await this.emailRepository.retrieveCountEmails(Number(this.email?.senderId));
            
            //Utils clase constants exportar constantes amountPerDay = 15;
            if(emailCount > constantData.emailAmountPerUser){
                throw new Error("Enough messages for you pal");
            }
            
            let flag: boolean = false;
            
            for (const emailFunction of this.emailSenders) {
                try {
                    await emailFunction.execute(this.email)
        
                    flag = !flag;
        
                    break;
                } catch (error: any) {
                    
                    continue;
                }
            }
            if(flag){

                await this.emailRepository.create(this.email); 
                
            }else{

                throw new Error("Non-EmailService currently on service")          
            }
        }catch(error){
            throw error;
        }
    }

}