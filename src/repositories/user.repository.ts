import {IUser, IUserDTO} from "../interfaces/IUser";
import {User} from "../models/user.modules";

class UserRepository {
    public getAll(): Promise<IUser[]> {
        return User.find()
    }

    public create(user: IUserDTO): Promise<IUser> {
        return User.create(user)
    }

    public getById(userId:string) :Promise<IUser | null> {
        return User.findById(userId)
    }
}
export const userRepository = new UserRepository();
