import joi from "joi";

import { regexEnum } from "../enums/regexEnum";

export class UserValidator {
    private static email = joi.string().email().trim();
    private static password = joi.string().regex(regexEnum.password);
    private static name = joi.string().min(3).max(10).trim();
    private static surname = joi.string().regex(regexEnum.name);
    private static age = joi.number().min(1).max(100);

    public static create = joi.object({
        email: this.email.required(),
        password: this.password.required(),
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
    });
    public static update = joi.object({
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
    });
}
