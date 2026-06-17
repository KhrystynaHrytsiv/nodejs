import { Router } from "express";

import { authRouter } from "./authRouter";
import { userRouter } from "./userRouter";

const router = Router();
router.use("/users", userRouter);
router.use("/auth", authRouter);

export const apiRouter = router;
