import dotenv from "dotenv";

dotenv.config()

interface IConfig {
    port:string,
    mongoUri:string,
    accessSecret:string,
    refreshSecret:string,
    accessLifeTime:any,
    refreshLifeTime:any,
}

export const config: IConfig = {
    port: process.env.PORT!,
    mongoUri: process.env.MONGO_URI!,
    accessSecret: process.env.JWT_ACCESS_SECRET!,
    refreshSecret: process.env.JWT_REFRESH_SECRET!,
    accessLifeTime: process.env.JWT_ACCESS_TIMELIFE!,
    refreshLifeTime: process.env.JWT_REFRESH_TIMELIFE!
}