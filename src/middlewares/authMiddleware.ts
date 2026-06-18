import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "../enums/statusCodes";
import { apiErrors } from "../errors/apiErrors";
import { IRefresh } from "../interfaces/IToken";
import { tokenService } from "../services/tokenService";

class AuthMiddleware {
    public async checkAccessToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const authorizationHeader = req.headers.authorization; //отримую токер з хедера
            if (!authorizationHeader) {
                throw new apiErrors(
                    "No token provided",
                    StatusCodes.UNAUTHORIZED,
                );
            }
            const accessToken = authorizationHeader.split(" ")[1]; //забираю самк значення токена
            if (!accessToken) {
                throw new apiErrors(
                    "No token provided",
                    StatusCodes.UNAUTHORIZED,
                );
            }
            const tokenPayload = tokenService.verifyToken(
                accessToken,
                "access",
            ); //перевірка коректності  токена
            const isTokenExist = await tokenService.isTokenExist(
                accessToken,
                "accessToken",
            ); // чи існує токен в дб
            if (!isTokenExist) {
                throw new apiErrors("Invalid token", StatusCodes.UNAUTHORIZED);
            }
            req.res!.locals.tokenPayload = tokenPayload; //зберегти дані користувача в пейлоуд
            // res.locals.tokenPayload = tokenPayload; //це те саме що і рядок вище
            next();
        } catch (e) {
            next(e);
        }
    }
    public async checkRefreshToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { refreshToken } = req.body as IRefresh;
            if (!refreshToken) {
                throw new apiErrors(
                    "No refresh token provided",
                    StatusCodes.FORBIDDEN,
                );
            }

            const tokenPayload = tokenService.verifyToken(
                refreshToken,
                "refresh",
            );
            const isTokenExist = await tokenService.isTokenExist(
                refreshToken,
                "refreshToken",
            );
            if (!isTokenExist) {
                throw new apiErrors("Invalid token", StatusCodes.FORBIDDEN);
            }
            req.res!.locals.tokenPayload = tokenPayload;
            // res.locals.tokenPayload = tokenPayload; //це те саме що і рядок вище
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
