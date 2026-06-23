import { IWish, IWishUpdate } from "../interfaces/IWish";
import { wishModel } from "../models/wishModel";
import { IUser } from "../interfaces/IUser";
import { User } from "../models/userModel";

class UserRepository{
    public createUser(user:IUser):Promise<IUser>{
        return User.create(user);
    }
    public createWish (wish:IWishUpdate):Promise<IWish>{
        return wishModel.create(wish)
    }
    public updateWish (id:string, wish:IWishUpdate):Promise<IWish | null>{
        return wishModel.findByIdAndUpdate(id, wish, {returnDocument: "after"})
    }
    public deleteWish (id:string):Promise<IWish | null>{
        return wishModel.findByIdAndDelete(id)
    }
    public getByEmail(email:string):Promise<IUser | null>{
        return User.findOne({email})
    }
}
export const userRepository = new UserRepository();