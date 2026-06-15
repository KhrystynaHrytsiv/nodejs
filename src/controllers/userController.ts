import {Request, Response} from "express";
import {userService} from "../services/userService";
import {IUserDTO} from "../interfaces/IUser";
import {StatusCodes} from "../enums/statusCodes";

class UserController {
    public async getAll(req:Request, res:Response){
        const data = await userService.getAll();
        res.status(StatusCodes.OK).json(data)
    }
    public async create(req:Request, res:Response){
        const user = req.body as IUserDTO;
        const data = await userService.create(user);
        res.status(StatusCodes.CREATED).json(data)
    }
    public async getById(req:Request, res:Response) {
        const id = req.params.id as string;
        const data = await userService.getById(id);
        res.status(StatusCodes.OK).json(data)
    }
}
export const userController = new UserController();