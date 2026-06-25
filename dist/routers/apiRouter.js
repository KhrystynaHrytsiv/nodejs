"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const wishesRouter_1 = require("./wishesRouter");
const authRouter_1 = require("./authRouter");
exports.apiRouter = (0, express_1.Router)();
exports.apiRouter.use('/wishes', wishesRouter_1.wishesRouter);
exports.apiRouter.use('/auth', authRouter_1.authRouter);
