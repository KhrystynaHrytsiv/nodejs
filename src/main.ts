import express, { NextFunction, Request, Response } from "express";
import { config } from "./configs/config";
import  mongoose from "mongoose";
import dns from "node:dns";
import { apiRouter } from "./routers/apiRouter";
import { apiError } from "./error/apiError";


dns.setServers(["8.8.8.8", "8.8.4.4"]);
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/', apiRouter);

app.use((err: apiError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message ?? "Something went wrong";
    res.status(status).json({ status, message });
});
process.on("uncaughtException", (err) => {
    console.log("uncaughtException", err);
    process.exit(1);
});


const dbConnection = async () =>{
    let dbCon = false;
    while (!dbCon){
        try {
            console.log("connection to db ...");
            await mongoose.connect(config.mongoUri);
            dbCon = true;
            console.log("Connection is available");
        } catch (e) {
            console.log(e);
            console.log("connection error: wait 3 seconds");
            await new Promise((resolve) => setTimeout(resolve, 3000))
        }
    }
}
const start = async () =>{
    try{
        await dbConnection();
        app.listen(config.port, () =>{
            console.log(`Server is process on ${config.port}`);
        })
    } catch (e) {
        console.log(e);
    }
};

 void start()
