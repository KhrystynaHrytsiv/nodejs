import { CronJob } from "cron";

import { config } from "../configs/config";
import { timeHelper } from "../helpers/timeHelper";
import { tokenRepository } from "../repositories/tokenRepository";

const handler = async () => {
    try {
        const lifeTime = config.JWT_REFRESH_LIFETIME;
        const { value, unit } = timeHelper.parseLifeTime(lifeTime);
        const date = timeHelper.subFromCurrentTime(value, unit);
        const count = await tokenRepository.deleteExpiredTokens(date);
        if (count) {
            console.log(`deleted ${count} expired tokens`);
        }
    } catch (err) {
        const e = err as Error;
        console.error(e.message);
    }
};

export const removeTokens = new CronJob("0 * * * * *", handler);
