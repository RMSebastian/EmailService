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


// app.post("/auth",(req: Request, res: Response) =>{
//         const {username, password} = req.body;

//         //Consultar si existne en el DB y validar que existen
        
//         const user = {username: username};

//         try{
//             const accessToken = generateAccessToken(user);
            
//             res.header("authorization", accessToken).json({
//                 message: "Usuario Autwnticado",
//                 token: accessToken
//             });
//         }catch(err)
//         {
//             console.log("error");
//         }

// });
// app.get("/mainPage",(validateToken), (req: Request, res:Response)=>{
//     res.send({
//         message: "HOla"
//     });
// });




//JWT testing area

/*

/auth/register => userAuth. jwt.sing Return token

cuando se creo
cuando expira

Registrar persona

logear
*/