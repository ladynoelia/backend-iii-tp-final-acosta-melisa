import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import mocksRouter from "./routes/mocks.router.js";

import swaggerUi from "swagger-ui-express";
import { spec } from "./docs/config/swagger.js";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 8080;
dotenv.config();
const connection = mongoose.connect(process.env.MONGO_URI);

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/mocks", mocksRouter);

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(spec));
fs.writeFileSync("./src/docs/specOpenapi.json", JSON.stringify(spec, null, 5));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
