import { templatesConstants } from "../constants/templates";
import { StatusCodes } from "../enums/statusCodes";
import { apiErrors } from "../errors/apiErrors";
import { IAuth } from "../interfaces/IAuth";
import { TokenPair } from "../interfaces/IToken";
import { IUser, IUserCreateDTO } from "../interfaces/IUser";
import { tokenRepository } from "../repositories/tokenRepository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./emailService";
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
        await emailService.sendEmail(
            newUser.email,
            "welcome",
            templatesConstants.welcome,
            { name: newUser.name },
        );
        return { user: newUser, tokens };
    }

    public async signIn(
        dto: IAuth,
    ): Promise<{ user: IUser; tokens: TokenPair }> {
        const user = await userRepository.getByEmail(dto.email); //пошук користувача за емейлом
        if (!user) {
            throw new apiErrors(
                "Email or password invalid",
                StatusCodes.UNAUTHORIZED,
            );
        } //перевірка наявності користувача в дб

        const isValidPassword = await passwordService.comparePassword(
            dto.password,
            user.password,
        ); // перевірка відповідності введеного пароля хешу, що зберігається в БД
        if (!user.isActive) {
            throw new apiErrors("Account is not active", StatusCodes.FORBIDDEN);
        }
        if (!isValidPassword) {
            throw new apiErrors(
                "Invalid email or password",
                StatusCodes.UNAUTHORIZED,
            );
        }
        const tokens = tokenService.generateTokens({
            userId: user._id,
            role: user.role,
        }); // генерація токенів
        await tokenRepository.create({ ...tokens, _userId: user._id }); // збереження токенів для користувача в базі даних
        return { user, tokens };
    }
}
export const authService = new AuthService();
