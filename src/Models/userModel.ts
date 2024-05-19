import {DataTypes, Model, Sequelize} from "sequelize";
import { Role } from "../Enums/Roles";
import { validateEmail } from "../Utils/emailVerifier";
export class UserModel extends Model{
    public id!: number;
    public username!:string;
    public password!: string;
    public role!: Role;

    SetUsername(username:string) {
        try{
            const verified = validateEmail(username);
            this.username = verified;
        }catch(error)
        {
            throw error
        } 
    }
}
export function InitUserModel(seq: Sequelize){
    const sequelize = seq;
    UserModel.init({
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username:{
            type: DataTypes.STRING
        },
        password:{
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.ENUM(Role.Admin, Role.User),
            allowNull: false,
            defaultValue: Role.User
        }
    },{
        sequelize,
       modelName: "User", 
    });
}
