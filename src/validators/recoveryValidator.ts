import joi from "joi";

export class RecoveryValidator {
    private static emailField = joi.string().email();

    public static emailValidation = joi.object({
        email: this.emailField.required(),
    });
}
