import { UserModel } from "../../Models/userModel";

export interface IUserRepository{
    create(model: UserModel): Promise<UserModel>;
    retrieveByName(modelName: string): Promise<UserModel | null>;
    retrieveAll(): Promise<UserModel[]>;
}