import { Request, Response, Router } from "express";
import { validateToken } from "../Middlewares/authToken";
import {StatsService } from "../#Services/statsService";
import { validateRole } from "../Middlewares/authRole";
import userRepository from "../#Repositories/userRepository";
import emailRepository from "../#Repositories/emailRepository";

const statsRouter: Router = Router();

statsRouter.get("/stats",[validateToken, validateRole],async (req: Request, res: Response)=>{
try{

    const statsService: StatsService = new StatsService(userRepository, emailRepository)

    const data: {name: string, amount: number}[] = await statsService.GetStats();

    res.status(200).send(data);
}catch(error){
    res.status(500).json({message: "Error on stats service", error: error})
}
});

export default statsRouter;