
import { UserModel } from "../Models/userModel";

class UserRepository{
    async create(model: UserModel): Promise<UserModel> {
        try{
            const userCreated = await UserModel.create({
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
            const searchedModel = await UserModel.findOne({where: {username: modelName}})
            if(!searchedModel) return null;
            return searchedModel;
        }catch(err){
            console.error(err);
            throw new Error("📤❌ Retrieve by name Error");
        }
    }
    async retrieveByID(modelID: string): Promise<UserModel | null> {
        try{
            const searchedModel = await UserModel.findOne({where: {id: modelID}})
            if(!searchedModel) return null;
            return searchedModel;
        }catch(err){
            console.error(err);
            throw new Error("📤❌ Retrieve by id Error");
        }
    }
}

export default new UserRepository();