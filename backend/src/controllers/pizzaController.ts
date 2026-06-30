import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "../enums/statusCodes";
import { pizzaService } from "../services/pizzaService";

class PizzaController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const pizzas = await pizzaService.getAll();
            res.status(StatusCodes.OK).json(pizzas);
        } catch (e) {
            next(e);
        }
    }
    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const pizza = req.body;
            const data = await pizzaService.create(pizza);
            res.status(StatusCodes.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }
}
export const pizzaController = new PizzaController();
