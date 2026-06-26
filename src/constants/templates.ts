import { EmailEnum } from "../enums/emailEnum";

type EmailData = {
    subject: string;
    template: string;
};
type IEmailConstants<T extends Record<string, string>> = {
    [K in keyof T]: EmailData;
};
export const emailConstant: IEmailConstants<typeof EmailEnum> = {
    [EmailEnum.welcome]: {
        subject: "Welcome",
        template: "welcome",
    },
    [EmailEnum.activate]: {
        subject: "Activation",
        template: "activate",
    },
    [EmailEnum.recovery]: {
        subject: "Forgot password",
        template: "recovery",
    },
    [EmailEnum.successful]: {
        subject: "Success",
        template: "successful",
    },
};

export type { EmailData };
