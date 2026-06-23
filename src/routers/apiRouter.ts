import { Router } from "express";
import { wishesRouter } from "./wishesRouter";
import { authRouter } from "./authRouter";

export const apiRouter = Router();

apiRouter.use('/wishes', wishesRouter)
apiRouter.use('/auth', authRouter)