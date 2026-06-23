import { NextFunction, Request, Response } from "express";
import { IUser } from "../interfaces/IUser";
import { authService } from "../services/authService";
import { StatusCodes } from "../enums/statusCodes";

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
}
export const authController = new AuthController();