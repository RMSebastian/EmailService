import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import * as constantData from "./constantData";
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Email Service Documentation",
    version: "1.0.0",
    description:
      "An Email Service Documentation for a training course",
  },
  servers: [
    {
      url: `http://localhost:3000/${constantData.port}/api`,
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: any): void {
  app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
