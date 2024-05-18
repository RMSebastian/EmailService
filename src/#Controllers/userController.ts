import { Request, Response } from "express";
import { UserModel } from "../Models/userModel";
import userRepository from "../#Repositories/userRepository";
import jwt from "jsonwebtoken";

export async function singIn(req: Request, res: Response){ 
    try{
        
        const signUser: UserModel = new UserModel();

        signUser.username = req.body.username;
        signUser.password = req.body.password;

        const searchedUser: UserModel | null = await userRepository.retrieveByName(signUser.username)
    
        if(!searchedUser || searchedUser.password != signUser.password){
            return res.status(400).json({ error: "Usuario o contraseña incorrecta" });
        }

        const tokenPayload: {id: string, username: string, role: string} = {
            id: String(searchedUser.id),
            username: searchedUser.username,
            role: searchedUser.role  
        };

        const token: string = jwt.sign(tokenPayload,process.env.SECRET_JWT as string,{expiresIn: "1h"})

        res.status(200).json({ message: "Usuario ingreso exitosamente", token: token });

    }catch(err){
        console.error("Error en signIn:", err);
        res.status(500).json({ error: "Error en signIn" });
    }
}

export async function signUp(req: Request, res: Response){
    try{

        const newUser: UserModel = new UserModel();
        
        newUser.username = req.body.username;
        newUser.password = req.body.password;
        newUser.role = req.body.role;

        const searchedUser: UserModel | null = await userRepository.retrieveByName(newUser.username)
    
        if(searchedUser)return res.status(400).json({ error: "Usuario ya existe" });
    
        const userCreated: UserModel = await userRepository.create(newUser);

        const tokenPayload: {id: string, username: string, role: string} = {
            id: String(userCreated.id),
            username: userCreated.username,
            role: userCreated.role  
        };

        const token: string = jwt.sign(tokenPayload,process.env.SECRET_JWT as string,{expiresIn: "1h"})

        res.status(200).json({ message: "Usuario creado exitosamente", token: token });

    }catch(err){

        console.error("Error en signUp:", err);
        res.status(500).json({ error: "Error en signUp" });
    }

    


}