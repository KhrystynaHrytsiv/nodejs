import { Router } from "express";
import { wishController } from "../controllers/wishController";
import { middleware } from "../middlewares/commonMiddleware";
import { WishValidator } from "../validation/wishValidator";

export const wishesRouter = Router();

wishesRouter.get('/', wishController.getAll)
wishesRouter.get('/:id', middleware.isIdValid('id'), wishController.getById)
wishesRouter.post('/', middleware.validateBody(WishValidator.create), wishController.create)
wishesRouter.put('/:id', middleware.isIdValid('id'), middleware.validateBody(WishValidator.update), wishController.update)
wishesRouter.delete('/:id', middleware.isIdValid('id'), wishController.delete)