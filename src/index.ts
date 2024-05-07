import express, { Request, Response } from "express";
import { sequelize } from "./Database/database";

console.log("Hello World");

const app = express();
const port = 6000;

app.use(express.json());

app.route("/").get((res: Response, req: Request) =>{
    res.send("Hello World");
});

app.listen(port,() =>{
    console.log("Hosting");
});

sequelize.sync();