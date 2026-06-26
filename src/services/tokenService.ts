import jwt from "jsonwebtoken";

import { config } from "../configs/config";
import { ActionTokenType, TokenType } from "../enums/actionTokenType";
import { StatusCodes } from "../enums/statusCodes";
import { apiErrors } from "../errors/apiErrors";
import { ITokenPayload, TokenPair } from "../interfaces/IToken";
import { tokenRepository } from "../repositories/tokenRepository";

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
        type: TokenType | ActionTokenType,
    ): ITokenPayload {
        try {
            let secret: string;
            switch (type) {
                case TokenType.access:
                    secret = config.JWT_ACCESS_SECRET;
                    break;
                case TokenType.refresh:
                    secret = config.JWT_REFRESH_SECRET;
                    break;
                case ActionTokenType.activate:
                    secret = config.JWT_ACTIVATE_SECRET;
                    break;
                case ActionTokenType.recovery:
                    secret = config.JWT_RECOVERY_SECRET;
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
    public async isTokenExist(
        token: string,
        type: "accessToken" | "refreshToken",
    ): Promise<boolean> {
        const iToken = await tokenRepository.findByParams({ [type]: token });
        return !!iToken;
    }

    public generateActionToken(
        payload: ITokenPayload,
        type: ActionTokenType,
    ): string {
        let secret: string;
        let expiresIn: any;
        switch (type) {
            case ActionTokenType.activate:
                secret = config.JWT_ACTIVATE_SECRET;
                expiresIn = config.JWT_ACTIVATE_LIFETIME;
                break;
            case ActionTokenType.recovery:
                secret = config.JWT_RECOVERY_SECRET;
                expiresIn = config.JWT_RECOVERY_LIFETIME;
                break;
            default:
                throw new apiErrors(
                    "invalid token action type",
                    StatusCodes.BAD_REQUEST,
                );
        }
        return jwt.sign(payload, secret, { expiresIn });
    }
}
export const tokenService = new TokenService();
