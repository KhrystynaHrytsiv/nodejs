import { Router } from "express";
import { wishController } from "../controllers/wishController";
import { middleware } from "../middlewares/commonMiddleware";
import { WishValidator } from "../validation/wishValidator";
import { authMiddleware } from "../middlewares/authMiddleware";

export const wishesRouter = Router();

wishesRouter.get('/', wishController.getAll)
wishesRouter.get('/:id', middleware.isIdValid('id'), wishController.getById)
wishesRouter.post('/', authMiddleware.checkAccessToken, middleware.validateBody(WishValidator.create), wishController.create)
wishesRouter.put('/:id',
    authMiddleware.checkAccessToken, middleware.isIdValid('id'), middleware.validateBody(WishValidator.update),
    wishController.update)
wishesRouter.delete('/:id', authMiddleware.checkAccessToken, middleware.isIdValid('id'), wishController.delete)