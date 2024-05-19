import { IUserRepository } from "../#Repositories/Interfaces/IUserRepository";
import { IUserService } from "./Interfaces/IUserService";
import { UserModel } from "../Models/userModel";
import jwt from "jsonwebtoken";

export class UserService implements IUserService{
    private userModel: UserModel;
    private userRepository: IUserRepository;
    constructor(userModel: UserModel,userRepository: IUserRepository){
        this.userModel = userModel;
        this.userRepository = userRepository
    }

    async signUp(): Promise<string>{

        try{
            const searchedUser: UserModel | null = await this.userRepository.retrieveByName(this.userModel.username)
    
            if(searchedUser)throw new Error("❌ Error: UserService: signUp: User already exist")
        
            const userCreated: UserModel = await this.userRepository.create(this.userModel);
    
            const tokenPayload: {id: string, username: string, role: string} = {
                id: String(userCreated.id),
                username: userCreated.username,
                role: userCreated.role  
            };
    
            const token: string = jwt.sign(tokenPayload,process.env.SECRET_JWT as string,{expiresIn: "1h"})
    
            return token
        }catch(error){
            throw error;
        }

    }
    async signIn(): Promise<string>{
        try{
            const searchedUser: UserModel | null = await this.userRepository.retrieveByName(this.userModel.username)
    
            if(searchedUser == null || searchedUser.password != this.userModel.password){
                throw new Error("❌ Error: UserService: signIn: User or Password Incorrect")
            }
    
            const tokenPayload: {id: string, username: string, role: string} = {
                id: String(searchedUser.id),
                username: searchedUser.username,
                role: searchedUser.role  
            };
    
            const token: string = jwt.sign(tokenPayload,process.env.SECRET_JWT as string,{expiresIn: "1h"})
    
            return token
        }catch(error){
            throw error;
        }

    }
}