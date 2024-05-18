import { Request, Response } from "express";
import emailRepository from "../#Repositories/emailRepository";
import userRepository from "../#Repositories/userRepository";
import { UserModel } from "../Models/userModel";

export async function GetStats(req: Request, res:Response) {
    try{
        // Conseguir todos los users find.all
        const userModels: UserModel[] = await userRepository.retrieveAll();

        if(!userModels || userModels.length == 0){
            res.status(404).json({message: "❌ ERROR, Users dont exist or found"})
        }

        //por cada user, llamar al repo y conseguir cuantos emails llamaron
        //no use userModels.ForEach porque no soporta asyncronidad

        let data: {name: string, amount: number}[] = [];

        for(const user of userModels){
            const emailsSent: number = await emailRepository.retrieveCountEmails(user.id);

            if(emailsSent > 0){
                data.push({
                    name: user.username,
                    amount: emailsSent
                });

            }else{
                continue;
            }
        }

        res.status(200).send(data);
    }catch(error){
        res.status(500).json({message: "Error on stats controller"})
    }
}