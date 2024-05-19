import emailRepository from "../#Repositories/emailRepository";
import { UserModel } from "../Models/userModel";
import { IUserRepository } from "../#Repositories/Interfaces/IUserRepository";
import { IEmailRepository } from "../#Repositories/Interfaces/IEmailRepository";
/**Stats service
 * 
 * Tiene que ser una clase
 * 
 */
export class StatsService{
    private userRepository: IUserRepository;
    private emailRepository: IEmailRepository
    constructor(userRepository: IUserRepository, emailRepository: IEmailRepository){
        this.userRepository = userRepository;
        this.emailRepository = emailRepository;
    }

    async GetStats(): Promise<{name: string, amount: number}[]>{
        try{
            const userModels: UserModel[] = await this.userRepository.retrieveAll();
    
            if(!userModels || userModels.length == 0){
                throw new Error("❌ ERROR, Users dont exist or found")
            }
    
            let data: {name: string, amount: number}[] = [];
    
            for(const user of userModels){
                const emailsSent: number = await this.emailRepository.retrieveCountEmails(user.id);
    
                if(emailsSent > 0){
                    data.push({
                        name: user.username,
                        amount: emailsSent
                    });
    
                }else{
                    continue;
                }
            }
            if(!data || data.length <= 0){
                throw new Error("❌ ERROR, Users doesnt exist")
            }else{
                return data;
            }

        }catch(error){
            throw error;
        }
    }
}