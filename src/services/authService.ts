import { IUser } from "../interfaces/IUser";
import { TokenPair } from "../interfaces/IToken";
import { userService } from "./userService";
import { passwordService } from "./passwordService";
import { userRepository } from "../repository/userRepository";
import { tokenService } from "./tokenService";
import { tokenRepository } from "../repository/tokenRepository";
import { IAuth } from "../interfaces/IAuth";
import { apiError } from "../error/apiError";
import { StatusCodes } from "../enums/statusCodes";

class AuthService{
    public async registration (user:IUser):Promise<{user:IUser, tokens:TokenPair}>{
        await userService.isEmailUniq(user.email);
        const password = await passwordService.hashPassword(user.password);
        const newUser = await userRepository.createUser({...user, password});
        const tokenPair = tokenService.generateTokens({email: newUser.email, userId: newUser.id});
        await tokenRepository.create({...tokenPair, userId:newUser.id});
        return {user:newUser, tokens:tokenPair}
    }
    public async login (data:IAuth):Promise<{user:IUser, tokens:TokenPair}>{
        const user = await userRepository.getByEmail(data.email);
        if(!user){
            throw new apiError("Email or password invalid", StatusCodes.UNAUTHORIZED)
        }
        const isValidPassword = await passwordService.comparePassword(data.password, user.password);
        if(!isValidPassword){
            throw new apiError("Email or password invalid", StatusCodes.UNAUTHORIZED)
        }
        const tokens = tokenService.generateTokens({email:user.email, userId:user.id});
        await tokenRepository.create({...tokens, userId:user.id});
        return {user, tokens}
    }
}
export const authService = new AuthService();