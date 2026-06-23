"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiError = void 0;
class apiError extends Error {
    status;
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
exports.apiError = apiError;
