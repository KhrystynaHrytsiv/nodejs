import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "../enums/statusCodes";
import { IAuth } from "../interfaces/IAuth";
import { ITokenPayload } from "../interfaces/IToken";
import { IUserCreateDTO } from "../interfaces/IUser";
import { tokenRepository } from "../repositories/tokenRepository";
import { authService } from "../services/authService";
import { tokenService } from "../services/tokenService";
import { userService } from "../services/userService";

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
            const dto = req.body as IAuth;
            const data = await authService.signIn(dto);
            res.status(StatusCodes.OK).json(data);
        } catch (e) {
            next(e);
        }
    }
    public async me(req: Request, res: Response, next: NextFunction) {
        try {
            const tokenPayload = res.locals.tokenPayload as ITokenPayload;
            const { userId } = tokenPayload;
            const user = await userService.getById(userId);
            res.status(StatusCodes.OK).json(user);
        } catch (e) {
            next(e);
        }
    }
    public async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, role } = res.locals.tokenPayload as ITokenPayload;
            const tokens = tokenService.generateTokens({ userId, role });
            await tokenRepository.create({
                ...tokens,
                _userId: userId,
            });
            res.status(StatusCodes.OK).json(tokens);
        } catch (e) {
            next(e);
        }
    }
    public async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.params.token as string;
            const user = await authService.activate(token);
            res.status(StatusCodes.OK).json(user);
        } catch (e) {
            next(e);
        }
    }
}
export const authController = new AuthController();
