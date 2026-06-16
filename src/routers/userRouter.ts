import { Router } from "express";

import { userController } from "../controllers/userController";
import { commonMiddleware } from "../middlewares/commonMiddlewar";
import { UserValidator } from "../validators/userValidator";

const router = Router();

router.get("/", userController.getAll);
router.post(
    "/",
    commonMiddleware.validateBody(UserValidator.create),
    userController.create,
);
router.get("/:id", commonMiddleware.isIdValidate("id"), userController.getById);
router.put(
    "/:id",
    commonMiddleware.isIdValidate("id"),
    commonMiddleware.validateBody(UserValidator.update),
    userController.update,
);
router.delete(
    "/:id",
    commonMiddleware.isIdValidate("id"),
    userController.delete,
);
export const userRouter = router;
