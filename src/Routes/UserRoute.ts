import {Router} from "express";
import { signUp, singIn } from "../#Controllers/userController";
import SchemaValidator from "../Schemas/schemaValidator";
import { createUserSchema, updateUserSchema } from "../Schemas/UserSchema";

const userRouter: Router = Router();

userRouter.post("/signup",SchemaValidator(createUserSchema),signUp);

userRouter.post("/signin",SchemaValidator(updateUserSchema),singIn)

export default userRouter;