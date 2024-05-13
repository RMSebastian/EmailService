import {DataTypes, Model, Sequelize} from "sequelize";

export class EmailModel extends Model{
    public id!:number;
    public sender!: string;
    public receiver!:string;
    public headline!:string;
    public content!:string;
}
export function initEmailModel(seq: Sequelize){
    const sequelize = seq;
    EmailModel.init({
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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

