import {Router,  Request, Response } from "express";
import { UserModel } from "../Models/userModel";
import userRepository from "../#Repositories/userRepository";
import SchemaValidator from "../Schemas/schemaValidator";
import { createUserSchema, updateUserSchema } from "../Schemas/UserSchema";
import { IUserService } from "../#Services/Interfaces/IUserService";
import { UserService } from "../#Services/userService";

const userRouter: Router = Router();

userRouter.post("/signup",SchemaValidator(createUserSchema),async (req: Request, res: Response)=>{
    try{

        const newUser: UserModel = new UserModel();
        
        newUser.SetUsername(req.body.username);
        newUser.password = req.body.password;
        newUser.role = req.body.role;

        const userService: IUserService = new UserService(newUser,userRepository)

        const token: string = await userService.signUp();

        res.status(200).json({ message: "Usuario creado exitosamente", token: token });

    }catch(error){

        console.error("Error en signUp:", error);
        res.status(500).json({ message: "Error en signUp", error: error });
    }
});

userRouter.post("/signin",SchemaValidator(updateUserSchema),async (req: Request, res: Response) => { 
    try{
        
        const signUser: UserModel = new UserModel();

        signUser.SetUsername(req.body.username);
        signUser.password = req.body.password;

        const userService: IUserService = new UserService(signUser,userRepository)

        const token: string = await userService.signIn();
    
        res.status(200).json({ message: "Usuario ingreso exitosamente", token: token });

    }catch(err){
        console.error("Error en signIn:", err);
        res.status(500).json({ error: "Error en signIn" });
    }
})

export default userRouter;