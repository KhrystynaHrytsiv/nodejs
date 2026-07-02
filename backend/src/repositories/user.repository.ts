import { QueryFilter } from "mongoose";

import { IUser, IUserCreateDTO, IUserQuery } from "../interfaces/IUser";
import { User } from "../models/user.modules";

class UserRepository {
    public getAll(query: IUserQuery): Promise<any> {
        const filterObject: QueryFilter<IUser> = { isDeleted: false };
        if (query.search) {
            filterObject.$or = [
                { name: { $regex: query.search, $options: "i" } },
                { surname: { $regex: query.search, $options: "i" } },
            ];
        }

        const orderObject: Record<string, 1 | -1> = {};
        console.log(query.order, "!!!!!!!!!!!!!!!!1");
        if (query.order) {
            if (query.order.startsWith("-")) {
                orderObject[query.order.slice(1)] = -1;
            } else {
                orderObject[query.order] = 1;
            }
        }
        return User.aggregate([
            { $match: filterObject },
            { $sort: orderObject },
            {
                $group: {
                    _id: null,
                    totalItems: { $sum: 1 },
                    data: { $push: "$$ROOT" },
                },
            },
            { $project: { _id: 0 } },
        ]);
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
