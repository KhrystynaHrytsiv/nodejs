import { StatusCodes } from "../enums/statusCodes";
import { apiErrors } from "../errors/apiErrors";
import { IUser, IUserCreateDTO } from "../interfaces/IUser";
import { userRepository } from "../repositories/user.repository";

class UserService {
    public getAll(): Promise<IUser[]> {
        return userRepository.getAll();
    }
    public create(user: IUserCreateDTO): Promise<IUser> {
        return userRepository.create(user);
    }
    public async getById(userId: string): Promise<IUser> {
        const user = await userRepository.getById(userId);
        if (!user) {
            throw new apiErrors("User not found", StatusCodes.NOT_FOUND);
        }
        return user;
    }
    public async update(
        id: string,
        user: Partial<IUser>,
    ): Promise<IUser | null> {
        const data = await userRepository.getById(id);
        if (!data) {
            throw new apiErrors("User not found", StatusCodes.NOT_FOUND);
        }
        return await userRepository.update(id, user);
    }
    public async delete(userId: string): Promise<void> {
        const data = await userRepository.getById(userId);
        if (!data) {
            throw new apiErrors("User not found", StatusCodes.NOT_FOUND);
        }
        await userRepository.delete(userId);
    }
    public async isEmailUniq(email: string): Promise<void> {
        const user = await userRepository.getByEmail(email);
        if (user) {
            throw new apiErrors(
                "user is already exists",
                StatusCodes.BAD_REQUEST,
            );
        }
    }
    public async getByEmail(email: string): Promise<IUser | null> {
        const user = await userRepository.getByEmail(email);
        if (!user) {
            throw new apiErrors("User not found", StatusCodes.NOT_FOUND);
        }
        return user;
    }
    public async isActive(id: string): Promise<boolean> {
        const user = await this.getById(id);
        return user.isActive;
    }
    public async blockUser(id: string): Promise<IUser> {
        const user = await userRepository.blockUser(id);
        if (!user) {
            throw new apiErrors("User not found", StatusCodes.NOT_FOUND);
        }
        return user;
    }
    public async unBlockUser(id: string): Promise<IUser> {
        const user = await userRepository.unBlockUser(id);
        if (!user) {
            throw new apiErrors("User not found", StatusCodes.NOT_FOUND);
        }
        return user;
    }
}

export const userService = new UserService();
