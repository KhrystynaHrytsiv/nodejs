import { Router } from "express";
import { middleware } from "../middlewares/commonMiddleware";
import { UserValidator } from "../validation/userValidator";
import { authController } from "../controllers/authController";

export const authRouter = Router();
authRouter.post('/registration', middleware.validateBody(UserValidator.create), authController.registration)
authRouter.post('/login', authController.login )