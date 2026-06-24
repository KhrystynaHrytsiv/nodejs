import { Router } from "express";
import { middleware } from "../middlewares/commonMiddleware";
import { UserValidator } from "../validation/userValidator";
import { authController } from "../controllers/authController";
import { RefreshValidation } from "../validation/refreshValidation";
import { authMiddleware } from "../middlewares/authMiddleware";

export const authRouter = Router();
authRouter.post('/registration', middleware.validateBody(UserValidator.create), authController.registration)
authRouter.post('/login', authController.login )
authRouter.post('/refresh',
    middleware.validateBody(RefreshValidation.refreshToken),
    authMiddleware.checkRefreshToken,
    authController.refresh
)