import { Request, Response } from "express";

import { StatusCodes } from "../enums/statusCodes";
import { IUserDTO } from "../interfaces/IUser";
import { userService } from "../services/userService";

class UserController {
    public async getAll(req: Request, res: Response) {
        const data = await userService.getAll();
        res.status(StatusCodes.OK).json(data);
    }
    public async create(req: Request, res: Response) {
        const user = req.body as IUserDTO;
        const data = await userService.create(user);
        res.status(StatusCodes.CREATED).json(data);
    }
    public async getById(req: Request, res: Response) {
        const id = req.params.id as string;
        const data = await userService.getById(id);
        res.status(StatusCodes.OK).json(data);
    }
    public async update(req: Request, res: Response) {
        const id = req.params.id as string;
        const user = req.body;
        const data = await userService.update(id, user);
        res.status(StatusCodes.OK).json(data);
    }
    public async delete(req: Request, res: Response) {
        const id = req.params.id as string;
        await userService.delete(id);
        res.status(StatusCodes.NO_CONTENT).end();
    }
}
export const userController = new UserController();
