"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishController = void 0;
const wishService_1 = require("../services/wishService");
const statusCodes_1 = require("../enums/statusCodes");
class WishController {
    async getAll(req, res, next) {
        try {
            const wishes = await wishService_1.wishService.getAll();
            res.status(statusCodes_1.StatusCodes.OK).json(wishes);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const id = req.params.id;
            const wish = await wishService_1.wishService.getById(id);
            res.status(statusCodes_1.StatusCodes.OK).json(wish);
        }
        catch (e) {
            next(e);
        }
    }
    async create(req, res, next) {
        try {
            const body = req.body;
            const wish = await wishService_1.wishService.create(body);
            res.status(statusCodes_1.StatusCodes.CREATED).json(wish);
        }
        catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            const id = req.params.id;
            const body = req.body;
            const wish = await wishService_1.wishService.update(id, body);
            res.status(statusCodes_1.StatusCodes.OK).json(wish);
        }
        catch (e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        try {
            const id = req.params.id;
            await wishService_1.wishService.delete(id);
            res.status(statusCodes_1.StatusCodes.NO_CONTENT).end();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.wishController = new WishController();
