import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "../enums/statusCodes";
import { IUserCreateDTO } from "../interfaces/IUser";
import { authService } from "../services/authService";

class AuthController {
    public async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body as IUserCreateDTO;
            const data = await authService.signUp(body);
            res.status(StatusCodes.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }
    public async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as any;
            const data = await authService.signIn(dto);
            res.status(StatusCodes.OK).json(data);
        } catch (e) {
            next(e);
        }
    }
}
export const authController = new AuthController();
