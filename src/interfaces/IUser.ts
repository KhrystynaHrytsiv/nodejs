import { RoleEnum } from "../enums/roleEnum";

export interface IUser {
    id:string,
    email:string,
    password:string,
    role:RoleEnum
}