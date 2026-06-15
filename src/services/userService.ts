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
}
export const userService = new UserService();