"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishModel = void 0;
const mongoose_1 = require("mongoose");
const userModel_1 = require("./userModel");
const wishSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: userModel_1.User }
}, { timestamps: true, versionKey: false });
exports.wishModel = (0, mongoose_1.model)("wish", wishSchema);
