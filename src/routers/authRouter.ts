import { Router } from "express";

import { authController } from "../controllers/authController";
import { commonMiddleware } from "../middlewares/commonMiddlewar";
import { UserValidator } from "../validators/userValidator";

const router = Router();
router.post(
    "/signUp",
    commonMiddleware.validateBody(UserValidator.create),
    authController.signUp,
);
router.post("/signIn", authController.signIn);

export const authRouter = router;
