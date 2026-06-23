"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./configs/config");
const mongoose_1 = __importDefault(require("mongoose"));
const node_dns_1 = __importDefault(require("node:dns"));
const apiRouter_1 = require("./routers/apiRouter");
node_dns_1.default.setServers(["8.8.8.8", "8.8.4.4"]);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/', apiRouter_1.apiRouter);
app.use((err, req, res, next) => {
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
            console.log("connection to db ...");
            await mongoose_1.default.connect(config_1.config.mongoUri);
            dbCon = true;
            console.log("Connection is available");
        }
        catch (e) {
            console.log(e);
            console.log("connection error: wait 3 seconds");
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }
};
const start = async () => {
    try {
        await dbConnection();
        app.listen(config_1.config.port, () => {
            console.log(`Server is process on ${config_1.config.port}`);
        });
    }
    catch (e) {
        console.log(e);
    }
};
void start();
