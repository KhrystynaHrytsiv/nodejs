"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishService = void 0;
const wishRepository_1 = require("../repository/wishRepository");
const apiError_1 = require("../error/apiError");
const statusCodes_1 = require("../enums/statusCodes");
class WishService {
    async getAll() {
        return await wishRepository_1.wishRepository.getAll();
    }
    async getById(id) {
        const wish = await wishRepository_1.wishRepository.getById(id);
        if (!wish) {
            throw new apiError_1.apiError("Wish not found", statusCodes_1.StatusCodes.NOT_FOUND);
        }
        return wish;
    }
    async create(wish) {
        return await wishRepository_1.wishRepository.create(wish);
    }
    async update(id, wish) {
        const updateWish = await wishRepository_1.wishRepository.update(id, wish);
        if (!updateWish) {
            throw new apiError_1.apiError("Wish not found", statusCodes_1.StatusCodes.NOT_FOUND);
        }
        return updateWish;
    }
    async delete(id) {
        const wish = await wishRepository_1.wishRepository.delete(id);
        if (!wish) {
            throw new apiError_1.apiError("Wish not found", statusCodes_1.StatusCodes.NOT_FOUND);
        }
        return wish;
    }
}
exports.wishService = new WishService();
