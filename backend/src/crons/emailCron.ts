import { CronJob } from "cron";

import { emailConstants } from "../constants/emailConstants";
import { EmailEnum } from "../enums/emailEnum";
import { User } from "../models/user.modules";
import { emailService } from "../services/emailService";

const handler = async () => {
    try {
        // const { data } = await userService.getAll(query);
        const users = await User.find();
        users.map((user) =>
            emailService.sendEmail(
                user.email,
                emailConstants[EmailEnum.welcome],
                { name: user.name },
            ),
        );
    } catch (e) {
        console.error(e);
    }
};

export const emailCron = new CronJob("0 */10 * * * *", handler);
