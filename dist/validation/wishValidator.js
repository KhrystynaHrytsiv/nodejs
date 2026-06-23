"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishValidator = void 0;
const joi_1 = __importDefault(require("joi"));
class WishValidator {
    static title = joi_1.default.string().regex(/^\w+( \w+){0,2}$/);
    static description = joi_1.default.string().regex(/^\w+( \w+){0,50}$/);
    static price = joi_1.default.number().min(1);
    static create = joi_1.default.object({
        title: this.title.required(),
        description: this.description,
        price: this.price.required()
    });
    static update = joi_1.default.object({
        title: this.title,
        description: this.description,
        price: this.price
    });
}
exports.WishValidator = WishValidator;
