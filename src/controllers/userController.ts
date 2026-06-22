import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "../enums/statusCodes";
import { apiErrors } from "../errors/apiErrors";
import { ITokenPayload } from "../interfaces/IToken";
import { IUserUpdateDTO } from "../interfaces/IUser";
import { userService } from "../services/userService";

class UserController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await userService.getAll();
            res.status(StatusCodes.OK).json(data);
            next();
        } catch (e) {
            next(e);
        }
    }
    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const data = await userService.getById(id);
            res.status(StatusCodes.OK).json(data);
        } catch (e) {
            next(e);
        }
    }
    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const user = req.body as IUserUpdateDTO;
            const data = await userService.update(id, user);
            res.status(StatusCodes.OK).json(data);
        } catch (e) {
            next(e);
        }
    }
    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            await userService.delete(id);
            res.status(StatusCodes.NO_CONTENT).end();
        } catch (e) {
            next(e);
        }
    }

    public async blockUser(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const { userId: myId } = res.locals.tokenPayload as ITokenPayload;
            if (id === myId) {
                throw new apiErrors("Not permitted", StatusCodes.FORBIDDEN);
            }
            const data = await userService.blockUser(id);
            res.status(StatusCodes.OK).json(data);
        } catch (e) {
            next(e);
        }
    }
    public async unBlockUser(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const { userId: myId } = res.locals.tokenPayload as ITokenPayload;
            if (id === myId) {
                throw new apiErrors("Not permitted", StatusCodes.FORBIDDEN);
            }
            const data = await userService.unBlockUser(id);
            res.status(StatusCodes.OK).json(data);
        } catch (e) {
            next(e);
        }
    }
}
export const userController = new UserController();
