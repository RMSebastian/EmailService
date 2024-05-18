import { Router } from "express";
import { validateToken } from "../Middlewares/authToken";
import { GetStats } from "../#Controllers/statsController";
import { validateRole } from "../Middlewares/authRole";

const statsRouter = Router();

statsRouter.get("/stats",[validateToken, validateRole],GetStats)

export default statsRouter;