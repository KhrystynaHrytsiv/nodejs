import { NextFunction, Request, Response } from "express";
import { IUser } from "../interfaces/IUser";
import { authService } from "../services/authService";
import { StatusCodes } from "../enums/statusCodes";
import { ITokenPayload } from "../interfaces/IToken";
import { tokenService } from "../services/tokenService";
import { tokenRepository } from "../repository/tokenRepository";

class AuthController{
    public async registration (req:Request, res:Response, next:NextFunction){
        try{
           const body = req.body as IUser;
           const user = await authService.registration(body);
           res.status(StatusCodes.OK).json(user)
        }catch (e) {
            next(e)
        }
    }
    public async login (req:Request, res:Response, next:NextFunction){
        try{
            const body = req.body as IUser;
            const user = await authService.login(body);
            res.status(StatusCodes.OK).json(user)
        }catch (e) {
            next(e)
        }
    }
    public async refresh (req:Request, res:Response, next:NextFunction){
        try{
            const {email, userId} = res.locals.tokenPayload as ITokenPayload;
            const tokens = tokenService.generateTokens({email, userId});
            await tokenRepository.create({...tokens, userId:userId});
            res.status(StatusCodes.OK).json(tokens)
        }catch (e) {
            next(e)
        }
    }
}
export const authController = new AuthController();