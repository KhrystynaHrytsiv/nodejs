import { RoleEnum } from "../enums/roleEnum";
import { IBase } from "./baseInteface";

interface IUser extends IBase {
    _id: string;
    email: string;
    password: string;
    role: RoleEnum;
    isDeleted: boolean;
    isVerified: boolean;
    isActive: boolean;
    name: string;
    surname: string;
    age: number;
    avatar: string;
}

type IUserCreateDTO = Pick<
    IUser,
    "email" | "password" | "name" | "surname" | "age"
>;
type IUserUpdateDTO = Pick<IUser, "name" | "surname" | "age">;
export { IUser, IUserCreateDTO, IUserUpdateDTO };
