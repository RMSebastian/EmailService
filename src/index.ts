import express from "express";
import { sequelize } from "./Databases/database";
import authRouter from "./Routes/UserRoute";
import emailRouter from "./Routes/emailRoute";
import statsRouter from "./Routes/statsRoute";


const app = express();
const port = 6000;

app.use(express.json());

app.listen(port,() =>{
    console.log("Hosting");
});

sequelize.sync();

app.use("/api", authRouter);
app.use("/api", emailRouter);
app.use("/api", statsRouter);