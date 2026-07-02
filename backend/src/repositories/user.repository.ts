import { QueryFilter } from "mongoose";

import { IUser, IUserCreateDTO, IUserQuery } from "../interfaces/IUser";
import { User } from "../models/user.modules";

class UserRepository {
    public getAll(query: IUserQuery): Promise<IUser[]> {
        const skip = Number(query.pageSize * query.page - 1);
        const filterObject: QueryFilter<IUser> = { isDelete: false };
        if (query.search) {
            filterObject.$or = [
                { name: { $regex: query.search, $options: "i" } },
                { surname: { $regex: query.search, $options: "i" } },
            ];
        }

        return User.find(filterObject).limit(query.pageSize).skip(skip);
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
