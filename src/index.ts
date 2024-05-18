import express, { NextFunction, Request, Response, urlencoded } from "express";
import { sequelize } from "./Databases/database";
import authRouter from "./Routes/UserRoute";
import emailRouter from "./Routes/emailRoute";


const app = express();
const port = 6000;

app.use(express.json());
app.use(urlencoded({extended: true}));
const validate = (req: Request, res: Response, next: NextFunction) => {
    console.log("HOLA");
    return next();
};
app.get("/",validate,(req: Request, res: Response) =>{
    res.send(req.headers.authorization);
});

app.listen(port,() =>{
    console.log("Hosting");
});

sequelize.sync();

app.use("/api", authRouter);
app.use("/api", emailRouter);