import express from "express";
import { sequelize } from "./Databases/database";
import authRouter from "./#Controllers/userController";
import emailRouter from "./#Controllers/emailController";
import statsRouter from "./#Controllers/statsController";
import { setupSwagger } from "./Utils/swagger";
import * as constantData from "./Utils/constantData"

const app = express();
const port = constantData.port;

app.use(express.json());

//setupSwagger(app);

sequelize.sync();

app.use("/api", authRouter);
app.use("/api", emailRouter);
app.use("/api", statsRouter);

app.listen(port,() =>{
    console.log(`Hosting http://localhost:${constantData.port}/api`);
});
