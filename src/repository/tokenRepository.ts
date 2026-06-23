import { IToken } from "../interfaces/IToken";
import { Token } from "../models/token";

class TokenRepository{
    public create (data:any):Promise<IToken>{
        return Token.create(data)
    }
    public findByParams(params:Partial<IToken>):Promise<IToken | null>{
        return Token.findOne(params)
    }
}
export const tokenRepository = new TokenRepository();