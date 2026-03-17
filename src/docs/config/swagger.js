import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Adoptme API Documentation",
      version: "1.0.0",
      description: "Documentación API Adoptme",
    },
  },
  apis: ["./src/docs/**/*.yaml"],
};

export const spec = swaggerJSDoc(options);
