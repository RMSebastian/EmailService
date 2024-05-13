import {Sequelize} from "sequelize";
import * as dotenv from "dotenv";
import  * as userModel  from "../Models/userModel";
import  * as emailModel  from "../Models/emailModel";

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

userModel.InitUserModel(sequelize);
emailModel.initEmailModel(sequelize);