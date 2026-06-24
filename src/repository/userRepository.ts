import { IUser } from "../interfaces/IUser";
import { User } from "../models/userModel";

class UserRepository{
    public createUser(user:IUser):Promise<IUser>{
        return User.create(user);
    }
    public getByEmail(email:string):Promise<IUser | null>{
        return User.findOne({email})
    }
}
export const userRepository = new UserRepository();