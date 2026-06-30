import { IAuth } from "../interfaces/IAuth";
import { IUser } from "../interfaces/IUser";
import { apiService } from "./apiService";
import { urls } from "../constants/urls";
import { IToken } from "../interfaces/IToken";
import { IRes } from "../interfaces/IRes";
import { data } from "react-router-dom";

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

    async refresh ():Promise<void>{
        const refreshToken = this.getRefreshToken();
        if(refreshToken){
            const {data:tokens} = await apiService.post<IToken>(urls.auth.refresh, {refreshToken});
            this.setTokens(tokens)
        }
    },
    setTokens({tokens:{accessToken, refreshToken}}:IToken):void {
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
    },
    deleteTokens ():void{
        localStorage.removeItem(_access)
        localStorage.removeItem(_refresh)
    },
}
export {authService}