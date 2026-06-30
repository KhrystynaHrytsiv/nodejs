import { Router } from "express";

import { authRouter } from "./authRouter";
import { pizzaRouter } from "./pizzaRouter";
import { userRouter } from "./userRouter";

const router = Router();
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/pizzas", pizzaRouter);

export const apiRouter = router;
