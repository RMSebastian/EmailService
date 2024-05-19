import {DataTypes, Model, Sequelize} from "sequelize";
import { validateEmail } from "../Utils/emailVerifier";

export class EmailModel extends Model{
    public id!:number;
    public senderId!:number;
    public sender!: string;
    public receiver!:string;
    public headline!:string;
    public content!:string;

    SetReceiver(receiver:string): string {
        try{
            return validateEmail(receiver);
        }catch(error){
            throw error;
        }   
    }
    SetSender(sender:string): string {
        try{
            return validateEmail(sender);
        }catch(error){
            throw error;
        }   
    }
}
export function initEmailModel(seq: Sequelize){
    const sequelize = seq;
    EmailModel.init({
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        senderId:{
            type: DataTypes.INTEGER,
        },
        sender:{
            type: DataTypes.STRING
        },
        receiver:{
            type: DataTypes.STRING
        },
        headline:{
            type: DataTypes.STRING
        },
        content:{
            type: DataTypes.STRING
        }
    },{
        sequelize,
       modelName: "Email", 
    });
}

