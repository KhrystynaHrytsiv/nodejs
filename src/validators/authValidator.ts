import joi from "joi";

import { regexEnum } from "../enums/regexEnum";

export class AuthValidator {
    private static refresh = joi.string().trim();
    private static email = joi.string().email().trim();
    private static password = joi.string().regex(regexEnum.password);

    public static refreshToken = joi.object({
        refreshToken: this.refresh.required(),
    });
    public static emailValidate = joi.object({
        email: this.email.required(),
    });
    public static passwordValidate = joi.object({
        password: this.password.required(),
    });
}
