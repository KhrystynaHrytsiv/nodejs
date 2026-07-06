import { IToken } from "../interfaces/IToken";
import { Token } from "../models/tokenModel";

class TokenRepository {
    public create(dto: any): Promise<IToken> {
        return Token.create(dto);
    }
    public findByParams(params: Partial<IToken>): Promise<IToken | null> {
        return Token.findOne(params);
    }
    public async deleteExpiredTokens(date: Date): Promise<number> {
        const results = await Token.deleteMany({ createdAt: { $lt: date } });
        return results.deletedCount;
    }
}

export const tokenRepository = new TokenRepository();
