import { model, Schema } from "mongoose";
import { IToken } from "../interfaces/IToken";

const tokenSchema = new Schema({
    accessToken: {type:String, required:true},
    refreshToken: {type:String, required:true}
},
    {timestamps: true, versionKey:false}
);
export const Token = model<IToken>("tokens", tokenSchema)
