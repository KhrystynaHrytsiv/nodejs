import { RoleEnum } from "../enums/roleEnum";
import { IBase } from "./baseInteface";

interface IToken extends IBase {
    _id: string;
    accessToken: string;
    refreshToken: string;
    _userId: string;
}

interface ITokenPayload {
    userId: string;
    role: RoleEnum;
}

type TokenPair = Pick<IToken, "accessToken" | "refreshToken">;
type IRefresh = Pick<IToken, "refreshToken">;
export { IRefresh, IToken, ITokenPayload, TokenPair };
