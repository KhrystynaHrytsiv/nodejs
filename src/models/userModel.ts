import { model, Schema } from "mongoose";
import { RoleEnum } from "../enums/roleEnum";

const userSchema = new Schema({
    email:{type:String, required:true, unique: true},
    password:{type:String, required:true},
    role:{enum:RoleEnum, type:String, required:true, default: RoleEnum.user}
    },
    {timestamps: true, versionKey:false}
);

export const User = model("user", userSchema);
