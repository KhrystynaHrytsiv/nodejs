import { IAuth } from "../interfaces/IAuth";
import { IUser } from "../interfaces/IUser";
import { apiService } from "./apiService";
import { urls } from "../constants/urls";
import { IToken } from "../interfaces/IToken";
import { IRes } from "../interfaces/IRes";

const _access = 'accessToken';
const _refresh = 'refreshToken';

const authService = {
    register (user:IAuth): IRes<IUser>{
      return apiService.post(urls.auth.register, user)
    },
    async login (user:IAuth):Promise<IUser>{
        const {data} = await apiService.post<IToken>(urls.auth.login, user);
        this.setTokens(data);
        const {data: me} = await authService.me();
        return me
    },

    setTokens({accessToken, refreshToken}:IToken):void {
        localStorage.setItem(_access, accessToken)
        localStorage.setItem(_refresh, refreshToken)
    },

    me():IRes<IUser>{
        return apiService.get(urls.auth.me)
    },
    getAccessToken():string{
        return localStorage.getItem(_access) || "";
    },
    getRefreshToken():string{
        return localStorage.getItem(_refresh) || ""
    }
}
export {authService}