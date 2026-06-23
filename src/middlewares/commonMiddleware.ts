import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";
import { apiError } from "../error/apiError";
import { StatusCodes } from "../enums/statusCodes";
import { ObjectSchema, ValidationError } from "joi";


class CommonMiddleware{
    public isIdValid (key:string){
        return (req:Request, res:Response, next:NextFunction) =>{
            const id = req.params[key];
            try{
                if(!isObjectIdOrHexString(id)){
                    throw new apiError(`${key} is invalid`, StatusCodes.BAD_REQUEST)
                }
                next()
            }catch (e) {
                next(e)
            }
        }
    }

    public validateBody (validator:ObjectSchema){
        return async (req:Request, res:Response, next:NextFunction) =>{
            try {
                req.body = await validator.validateAsync(req.body);
                next()
            }catch (err) {
                const e = err as ValidationError;
                next(new apiError(e.details[0].message, StatusCodes.BAD_REQUEST))
            }
        }
    }
}

export const middleware = new CommonMiddleware();