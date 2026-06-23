import joi from "joi";
import { RegexEnum } from "../enums/regexEnum";

export class UserValidator{
    private static email = joi.string().regex(RegexEnum.email);
    private static password = joi.string().regex(RegexEnum.password);

    public  static create = joi.object({
        email: this.email.required(),
        password: this.password.required()
    })

}