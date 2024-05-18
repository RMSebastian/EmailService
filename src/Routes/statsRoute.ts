import { Router } from "express";
import { validateToken } from "../Middlewares/authToken";
import { GetStats } from "../#Controllers/statsController";
import { validateRole } from "../Middlewares/authRole";
import { Route } from "mailgun.js";

const statsRouter: Router = Router();

statsRouter.get("/stats",[validateToken, validateRole],GetStats)

export default statsRouter;