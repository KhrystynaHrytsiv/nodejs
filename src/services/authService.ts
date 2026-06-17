import { StatusCodes } from "../enums/statusCodes";
import { apiErrors } from "../errors/apiErrors";
import { TokenPair } from "../interfaces/IToken";
import { IUser, IUserCreateDTO } from "../interfaces/IUser";
import { tokenRepository } from "../repositories/tokenRepository";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./passwordService";
import { tokenService } from "./tokenService";
import { userService } from "./userService";

class AuthService {
    public async signUp(
        user: IUserCreateDTO,
    ): Promise<{ user: IUser; tokens: TokenPair }> {
        // метод реєстрації користувача
        await userService.isEmailUniq(user.email); // перевірка, що користувача з таким email ще не існує
        const password = await passwordService.hashPassword(user.password); // хешування пароля
        const newUser = await userRepository.create({ ...user, password }); // створення користувача в базі даних із захешованим паролем
        const tokens = tokenService.generateTokens({
            userId: newUser._id,
            role: newUser.role,
        }); // генерація access та refresh токенів
        await tokenRepository.create({ ...tokens, _userId: newUser._id }); // збереження токенів (або refresh token) у бд
        return { user: newUser, tokens };
    }

    public async signIn(dto: any): Promise<{ user: IUser; tokens: TokenPair }> {
        const user = await userRepository.getByEmail(dto.email);
        if (!user) {
            throw new apiErrors(
                "Email or password invalid",
                StatusCodes.UNAUTHORIZED,
            );
        }

        const isValidPassword = passwordService.comparePassword(
            dto.password,
            user.password,
        );
        if (!isValidPassword) {
            throw new apiErrors(
                "Invalid email or password",
                StatusCodes.UNAUTHORIZED,
            );
        }
        const tokens = tokenService.generateTokens({
            userId: user._id,
            role: user.role,
        });
        await tokenRepository.create({ ...tokens, _userId: user._id });
        return { user, tokens };
    }
}
export const authService = new AuthService();
