import { Request, Response, NextFunction } from "express";
import { wishService } from "../services/wishService";
import { StatusCodes } from "../enums/statusCodes";
import { IWishUpdate } from "../interfaces/IWish";

class WishController{
    public async getAll (req: Request, res: Response, next: NextFunction){
        try{
            const wishes = await wishService.getAll();
            res.status(StatusCodes.OK).json(wishes);
        }catch (e){
            next(e)
        }
    }
    public async getById(req: Request, res: Response, next: NextFunction){
        try{
            const id = req.params.id as string;
            const wish = await wishService.getById(id);
            res.status(StatusCodes.OK).json(wish)
        }catch (e) {
            next(e)
        }
    }
    public async create (req: Request, res: Response, next: NextFunction){
        try{
            const body = req.body as IWishUpdate;
            const wish = await wishService.create(body);
            res.status(StatusCodes.CREATED).json(wish)
        }catch (e) {
            next(e)
        }
    }
    public async update (req: Request, res: Response, next: NextFunction){
        try{
            const id = req.params.id as string;
            const body = req.body as IWishUpdate;
            const wish = await wishService.update(id, body);
            res.status(StatusCodes.OK).json(wish)
        }catch (e) {
            next(e)
        }
    }
    public async delete (req: Request, res: Response, next: NextFunction){
        try{
            const id = req.params.id as string;
            await wishService.delete(id);
            res.status(StatusCodes.NO_CONTENT).end()
        }catch (e) {
            next(e)
        }
    }
}
export const wishController = new WishController();