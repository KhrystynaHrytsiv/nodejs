import { EmailEnum } from "../enums/emailEnum";

type EmailDataType = {
    subject: string;
    template: string;
};
type IEmailConstants<T extends Record<string, string>> = {
    [K in keyof T]: EmailDataType;
};
export const emailConstants: IEmailConstants<typeof EmailEnum> = {
    [EmailEnum.welcome]: {
        subject: "Welcome",
        template: "welcome",
    },
    [EmailEnum.activate]: {
        subject: "Activate account",
        template: "activate",
    },
    [EmailEnum.recovery]: {
        subject: "forgot password",
        template: "recovery",
    },
};

export type { EmailDataType, IEmailConstants };
