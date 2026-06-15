import express from 'express';
import mongoose from "mongoose";
import dns from "node:dns";
import {config} from "./configs/config";
import {apiRouter} from "./routers/apiRouter";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/', apiRouter)


const dbConnection = async () =>{
    let dbCon = false
    while (!dbCon){
        try{
            console.log('Connecting to db...');
            await mongoose.connect(config.MONGO_URI!)
            dbCon = true
            console.log('db available');
        }catch (e) {
            console.log('DB is not available, wait 3 seconds');
            console.log('Connection error:', e);
            await new Promise(resolve => setTimeout(resolve, 3000))
        }
    }
}
const start = async () =>{
    try{
        await dbConnection();
        app.listen(config.PORT, ()=>{
            console.log(`server listen ${config.PORT} port`);
        })
    }catch (e){
        console.log(e);
    }
}
start()


