import {Request, Response, NextFunction} from "express";
import { apiError } from "../error/apiError";
import { StatusCodes } from "../enums/statusCodes";
import { tokenService } from "../services/tokenService";
import { IRefresh } from "../interfaces/IToken";

class AuthMiddleware{
    public async checkAccessToken(req:Request, res:Response, next:NextFunction){
        try{
           const authorization = req.headers.authorization;
           if(!authorization){
               throw new apiError("no token provided", StatusCodes.UNAUTHORIZED)
           }
           const accessToken = authorization.split(" ")[1];
            if(!accessToken){
                throw new apiError("no token provided", StatusCodes.UNAUTHORIZED)
            }
            const tokenPayload = tokenService.verifyTokens(accessToken, "access");
            const isTokenExist = await tokenService.isTokenExist(accessToken, "accessToken");
            if(!isTokenExist){
                throw new apiError("invalid token", StatusCodes.UNAUTHORIZED)
            }
            res.locals.tokenPaylod = tokenPayload;
            next()
        }catch (e) {
            next(e)
        }
    }
    public async checkRefreshToken(req:Request, res:Response, next:NextFunction){
        try{
            const {refreshToken} = req.body as IRefresh;
            if (!refreshToken){
                throw new apiError("no refresh token provided", StatusCodes.UNAUTHORIZED)
            }
            const verifyTokens = tokenService.verifyTokens(refreshToken, "refresh");
            const isTokenExist = await tokenService.isTokenExist(refreshToken, "refreshToken");
            if (!isTokenExist){
                throw new apiError("invalid refresh token", StatusCodes.UNAUTHORIZED)
            }
            res.locals.tokenPayload = verifyTokens;
            next()
        } catch (e) {
            next(e)
        }
    }
}
export const authMiddleware = new AuthMiddleware();