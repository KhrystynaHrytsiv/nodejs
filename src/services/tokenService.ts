import jwt from "jsonwebtoken";
import { ITokenPayload, TokenPair } from "../interfaces/IToken";
import { config } from "../configs/config";
import { apiError } from "../error/apiError";
import { StatusCodes } from "../enums/statusCodes";
import { tokenRepository } from "../repository/tokenRepository";

class TokenService{
    public generateTokens (payload:ITokenPayload):TokenPair{
        const accessToken = jwt.sign(payload, config.accessSecret, {expiresIn: config.accessLifeTime});
        const refreshToken = jwt.sign(payload, config.refreshSecret, {expiresIn: config.refreshLifeTime});
        return {accessToken, refreshToken}
    }
    public verifyTokens(token:string, type: "access" | "refresh"):ITokenPayload{
        try{
            let secret:string;
            switch (type){
                case "access":
                    secret = config.accessSecret
                    break
                case "refresh":
                    secret = config.refreshSecret
                    break
                default:
                    throw new apiError("invalid token type", StatusCodes.BAD_REQUEST)
            }
            return jwt.verify(token, secret) as ITokenPayload
        }catch (e) {
            throw new apiError("Invalid token", StatusCodes.UNAUTHORIZED);
        }
    }
    public async isTokenExist (token:string, type: "accessToken" | "refreshToken",):Promise<boolean>{
        const iToken = await tokenRepository.findByParams({[type]:token});
        return !!iToken

    }
}
export const tokenService = new TokenService();