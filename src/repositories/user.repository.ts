import { IUser, IUserCreateDTO } from "../interfaces/IUser";
import { User } from "../models/user.modules";

class UserRepository {
    public getAll(): Promise<IUser[]> {
        return User.find();
    }

    public create(user: IUserCreateDTO): Promise<IUser> {
        return User.create(user);
    }

    public getById(userId: string): Promise<IUser | null> {
        return User.findById(userId);
    }
    public update(id: string, user: Partial<IUser>): Promise<IUser | null> {
        return User.findByIdAndUpdate(id, user, { returnDocument: "after" });
    }
    public delete(userId: string): Promise<IUser | null> {
        return User.findByIdAndDelete(userId);
    }
    public getByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ email });
    }
    public blockUser(userId: string): Promise<IUser | null> {
        return User.findByIdAndUpdate(
            userId,
            { isActive: false },
            { returnDocument: "after" },
        );
    }
    public unBlockUser(userId: string): Promise<IUser | null> {
        return User.findByIdAndUpdate(
            userId,
            { isActive: true },
            { returnDocument: "after" },
        );
    }
}
export const userRepository = new UserRepository();
