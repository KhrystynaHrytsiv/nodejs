import { wishModel } from "../models/wishModel";
import { IWish, IWishUpdate } from "../interfaces/IWish";

class WishRepository{
    public getAll ():Promise<IWish[]>{
        return wishModel.find()
    }
    public getById(id:string):Promise<IWish | null>{
        return wishModel.findById(id)
    }
    public create (wish:IWishUpdate):Promise<IWish>{
        return wishModel.create(wish)
    }
    public update (id:string, wish:IWishUpdate):Promise<IWish | null>{
        return wishModel.findByIdAndUpdate(id, wish, {returnDocument: "after"})
    }
    public delete (id:string):Promise<IWish | null>{
        return wishModel.findByIdAndDelete(id)
    }
}
export const wishRepository = new WishRepository();