"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const mongoose_1 = require("mongoose");
const apiError_1 = require("../error/apiError");
const statusCodes_1 = require("../enums/statusCodes");
class CommonMiddleware {
    isIdValid(key) {
        return (req, res, next) => {
            const id = req.params[key];
            try {
                if (!(0, mongoose_1.isObjectIdOrHexString)(id)) {
                    throw new apiError_1.apiError(`${key} is invalid`, statusCodes_1.StatusCodes.BAD_REQUEST);
                }
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
    validateBody(validator) {
        return async (req, res, next) => {
            try {
                req.body = await validator.validateAsync(req.body);
                next();
            }
            catch (err) {
                const e = err;
                next(new apiError_1.apiError(e.details[0].message, statusCodes_1.StatusCodes.BAD_REQUEST));
            }
        };
    }
}
exports.middleware = new CommonMiddleware();
