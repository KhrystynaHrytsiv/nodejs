import { model, Schema } from "mongoose";
import { IToken } from "../interfaces/IToken";

const tokenSchema = new Schema({
    access: {type:String, required:true},
    refresh: {type:String, required:true}
},
    {timestamps: true, versionKey:false}
);
export const Token = model<IToken>("tokens", tokenSchema)
