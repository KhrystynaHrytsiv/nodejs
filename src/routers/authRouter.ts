import { Router } from "express";

import { authController } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { commonMiddleware } from "../middlewares/commonMiddlewar";
import { AuthValidator } from "../validators/authValidator";
import { RecoveryValidator } from "../validators/recoveryValidator";
import { UserValidator } from "../validators/userValidator";

const router = Router();
router.post(
    "/signUp",
    commonMiddleware.validateBody(UserValidator.create),
    authController.signUp,
);
router.post("/signIn", authController.signIn);
router.post(
    "/refresh",
    commonMiddleware.validateBody(AuthValidator.refreshToken),
    authMiddleware.checkRefreshToken,
    authController.refresh,
);
router.get("/me", authMiddleware.checkAccessToken, authController.me);
router.patch("/activate/:token", authController.activate);
router.post(
    "/recovery",
    commonMiddleware.validateBody(RecoveryValidator.emailValidation),
    authController.recoveryRequest,
);
router.post(
    "/recovery/:token",
    commonMiddleware.validateBody(AuthValidator.passwordValidate),
    authController.recoverPassword,
);

export const authRouter = router;
