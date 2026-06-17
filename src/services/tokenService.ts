import jwt from "jsonwebtoken";

import { config } from "../configs/config";
import { StatusCodes } from "../enums/statusCodes";
import { apiErrors } from "../errors/apiErrors";
import { ITokenPayload, TokenPair } from "../interfaces/IToken";

class TokenService {
    public generateTokens(payload: ITokenPayload): TokenPair {
        const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
            expiresIn: config.JWT_ACCESS_LIFETIME,
        });
        const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
            expiresIn: config.JWT_REFRESH_LIFETIME,
        });
        return { accessToken, refreshToken };
    }
    public verifyToken(
        token: string,
        type: "access" | "refresh",
    ): ITokenPayload {
        try {
            let secret: string;
            switch (type) {
                case "access":
                    secret = config.JWT_ACCESS_SECRET;
                    break;
                case "refresh":
                    secret = config.JWT_REFRESH_SECRET;
                    break;
                default:
                    throw new apiErrors(
                        "invalid token types",
                        StatusCodes.BAD_REQUEST,
                    );
            }
            return jwt.verify(token, secret) as ITokenPayload;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            throw new apiErrors("Invalid token", StatusCodes.UNAUTHORIZED);
        }
    }
}
export const tokenService = new TokenService();
