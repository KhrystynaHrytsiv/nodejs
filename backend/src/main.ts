/*eslint-disable no-console*/
import dns from "node:dns";
import path from "node:path";

import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { config } from "./configs/config";
import { swaggerDocument, swaggerUI } from "./configs/swaggerConfig";
import { cronRunner } from "./crons";
import { apiErrors } from "./errors/apiErrors";
import { apiRouter } from "./routers/apiRouter";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ["http://localhost:3000"] }));

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/", apiRouter);
app.use("/media", express.static(path.join(process.cwd(), "uploads")));

app.use((err: apiErrors, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message ?? "Something went wrong";
    res.status(status).json({ status, message });
});
process.on("uncaughtException", (err) => {
    console.log("uncaughtException", err);
    process.exit(1);
});

const dbConnection = async () => {
    let dbCon = false;
    while (!dbCon) {
        try {
            console.log("Connecting to db...");
            await mongoose.connect(config.MONGO_URI);
            dbCon = true;
            console.log("db available");
        } catch (e) {
            console.log("DB is not available, wait 3 seconds");
            console.log("Connection error:", e);
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }
};
const start = async () => {
    try {
        await dbConnection();
        app.listen(config.PORT, async () => {
            console.log(`server listen ${config.PORT} port`);
            await cronRunner();
        });
    } catch (e) {
        console.log(e);
    }
};
start();
