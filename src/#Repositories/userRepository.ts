
import { UserModel } from "../Models/userModel";
import { IUserRepository } from "./Interfaces/IUserRepository";

class SequelizeUserRepository implements IUserRepository{
    async create(model: UserModel): Promise<UserModel> {
        try{
            const userCreated: UserModel = await UserModel.create({
                username: model.username,
                password: model.password,
                role: model.role
            });

            return userCreated;
        }catch(err){
            throw new Error("📥❌ Save Error");
        }
    }
    async retrieveByName(modelName: string): Promise<UserModel | null> {
        try{
            const searchedModel: UserModel | null = await UserModel.findOne({where: {username: modelName}})
            if(!searchedModel) return null;
            return searchedModel;
        }catch(err){
            console.error(err);
            throw new Error("📤❌ Retrieve by name Error");
        }
    }
    
    async retrieveAll(): Promise<UserModel[]> {
        try{
            const searchedModel: UserModel[] = await UserModel.findAll();
            return searchedModel;
        }catch(err){
            throw new Error("📭❌ Retrieve All Error");
        }
    }
}

export default new SequelizeUserRepository();