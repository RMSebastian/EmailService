import express, { NextFunction, Request, Response, urlencoded } from "express";
import { sequelize } from "./Database/database";

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


//JWT testing area
/*

/auth/register => userAuth. jwt.sing Return token

cuando se creo
cuando expira

Registrar persona

logear
*/