import { Router } from "express";
import {
  generateData,
  generatePets,
  generateUsers,
} from "../controllers/mocks.controller.js";

const router = Router();

router.get("/mockingpets", generatePets);

router.get("/mockingusers", generateUsers);

router.post("/generateData/:users/:pets", generateData);

export default router;
