import { Router } from "express";
import { validateToken } from "../Middlewares/authToken";
import SchemaValidator from "../Schemas/schemaValidator";
import { createEmailSchema } from "../Schemas/EmailSchema";
import { sendEmail } from "../#Controllers/emailController";


const emailRouter: Router = Router();

emailRouter.post("/email", [validateToken,SchemaValidator(createEmailSchema)], sendEmail)

export default emailRouter;