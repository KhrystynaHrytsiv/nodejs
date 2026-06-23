import { wishRepository } from "../repository/wishRepository";
import { IWish, IWishUpdate } from "../interfaces/IWish";
import { apiError } from "../error/apiError";
import { StatusCodes } from "../enums/statusCodes";
import { userRepository } from "../repository/userRepository";

class WishService{
    public async getAll ():Promise<IWish[]>{
         return await wishRepository.getAll()
    }
    public async getById (id:string):Promise<IWish | null>{
        const wish = await wishRepository.getById(id);
        if(!wish){
            throw new apiError("Wish not found", StatusCodes.NOT_FOUND)
        }
        return wish
    }
    public async create (wish:IWishUpdate):Promise<IWish>{
        return await userRepository.createWish(wish)
    }
    public async update (id:string, wish:IWishUpdate):Promise<IWish | null>{
        const updateWish = await userRepository.updateWish(id, wish);
        if(!updateWish){
            throw new apiError("Wish not found", StatusCodes.NOT_FOUND)
        }
        return updateWish
    }
    public async delete (id:string):Promise<IWish | null>{
        const wish = await userRepository.deleteWish(id);
        if(!wish){
            throw new apiError("Wish not found", StatusCodes.NOT_FOUND)
        }
        return wish
    }
}
export const wishService = new WishService();