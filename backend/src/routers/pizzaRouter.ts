import { Router } from "express";

import { pizzaController } from "../controllers/pizzaController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { commonMiddleware } from "../middlewares/commonMiddlewar";
import { PizzaValidator } from "../validators/pizzaValidator";

const router = Router();
router.get("/", authMiddleware.checkAccessToken, pizzaController.getAll);
router.post(
    "/",
    authMiddleware.checkAccessToken,
    commonMiddleware.validateBody(PizzaValidator.create),
    pizzaController.create,
);
export const pizzaRouter = router;
