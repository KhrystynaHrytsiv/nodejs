import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "../enums/statusCodes";
import { apiErrors } from "../errors/apiErrors";
import { ITokenPayload } from "../interfaces/IToken";
import { IUserQuery, IUserUpdateDTO } from "../interfaces/IUser";
import { userService } from "../services/userService";

class UserController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query as any as IUserQuery;
            const data = await userService.getAll(query);
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

    public async uploadAvatar(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = res.locals.tokenPayload as ITokenPayload;
            const updateUser = await userService.update(userId, {
                avatar: req.file!.path,
            });
            res.status(StatusCodes.OK).json(updateUser);
        } catch (e) {
            next(e);
        }
    }
}
export const userController = new UserController();
