import {IUser, IUserDTO} from "../interfaces/IUser";
import {userRepository} from "../repositories/user.repository";

class UserService{
    public getAll():Promise<IUser[]>{
        return userRepository.getAll()
    }
    public create (user:IUserDTO): Promise<IUser>{
        return userRepository.create(user)
    }
    public getById(userId:string):Promise<IUser | null>{
        return userRepository.getById(userId)
    }
    // public async getById(userId: string): Promise<IUser> {
    //     const user = await userRepository.getById(userId);
    //     if (!user) {
    //         throw new Error('User not found');
    //     }
    //     return user;
    // }
    public update (id:string, user:IUserDTO):Promise<IUser | null>{
        return userRepository.update(id, user)
    }
    public delete(userId:string):Promise<IUser | null>{
        return userRepository.delete(userId)
    }
}
export const userService = new UserService();