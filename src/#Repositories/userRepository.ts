import { UserModel } from "../Models/userModel";

class UserRepository{
    async create(model: UserModel): Promise<void> {
        try{
            UserModel.create({
                username: model.username,
                password: model.password,
                admin: model.admin
            });
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
}

export default new UserRepository();