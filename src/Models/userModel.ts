import {DataTypes, Model, Sequelize} from "sequelize";
export class UserModel extends Model{
    public username!:string;
    public password!: string;
    public admin!:boolean;
}
export function InitUserModel(seq: Sequelize){
    const sequelize = seq;
    UserModel.init({
        username:{
            type: DataTypes.STRING
        },
        password:{
            type: DataTypes.STRING
        },
        admin:{
            type: DataTypes.BOOLEAN
        }
    },{
        sequelize,
       modelName: "User", 
    });
}
