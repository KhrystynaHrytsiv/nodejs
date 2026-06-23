import { model, Schema } from "mongoose";
import { IWish } from "../interfaces/IWish";
import { User } from "./userModel";

const  wishSchema = new Schema({
    title:{type:String, required:true},
    description:{type:String},
    price:{type:Number, required:true},
    userId:{type:Schema.Types.ObjectId, required: true, ref: User}
},
    { timestamps: true, versionKey: false}
);

export const wishModel = model<IWish>("wish",wishSchema)