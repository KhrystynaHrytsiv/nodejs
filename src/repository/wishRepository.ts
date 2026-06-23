import { wishModel } from "../models/wishModel";
import { IWish } from "../interfaces/IWish";

class WishRepository{
    public getAll ():Promise<IWish[]>{
        return wishModel.find()
    }
    public getById(id:string):Promise<IWish | null>{
        return wishModel.findById(id)
    }
}
export const wishRepository = new WishRepository();