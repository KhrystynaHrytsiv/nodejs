import joi from "joi";

export class WishValidator{
    private static title = joi.string().regex(/^\w+( \w+){0,2}$/);
    private static description = joi.string().regex(/^\w+( \w+){0,50}$/);
    private static price = joi.number().min(1);

    public static create = joi.object({
        title: this.title.required(),
        description: this.description,
        price: this.price.required()
    });
    public static update = joi.object({
        title: this.title,
        description: this.description,
        price: this.price
    });

}