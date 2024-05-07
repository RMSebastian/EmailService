import {DataTypes, Model, Sequelize} from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
    process.env.POSTGRES_DATABASE as string,
    process.env.POSTGRES_USERNAME as string,
    process.env.POSTGRES_PASSWORD as string,
    {
        host: process.env.POSTGRES_HOST as string,
        port: process.env.POSTGRES_PORT as unknown as number,
        dialect:"postgres",
    }
);

sequelize.authenticate().then(() =>{
    console.log("✅  SQL SUCCESS");
}).catch(()=>{
    console.log("❌ SQL ERROR")
});

export class EmailModel extends Model{
    public id!:number;
    public sender!: string;
    public receiver!:string;
    public headline!:string;
    public content!:string;
}
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