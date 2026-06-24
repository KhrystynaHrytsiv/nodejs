interface IToken {
    accessToken: string;
    refreshToken: string;
    userId: string;
}

interface ITokenPayload {
    userId: string;
    email:string;
}

type TokenPair = Pick<IToken, "accessToken" | "refreshToken">
type IRefresh = Pick<IToken,  "refreshToken">
export {IToken, ITokenPayload, TokenPair, IRefresh}