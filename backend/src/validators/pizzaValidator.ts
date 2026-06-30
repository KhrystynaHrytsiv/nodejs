import joi from "joi";

import { regexEnum } from "../enums/regexEnum";

export class PizzaValidator {
    private static name = joi.string().regex(regexEnum.name).trim();
    private static price = joi.number().min(1).max(1500);
    private static size = joi.number().min(10).max(150);

    public static create = joi.object({
        name: this.name.required(),
        price: this.price.required(),
        size: this.size.required(),
    });
}
