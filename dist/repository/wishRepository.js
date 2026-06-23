"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishRepository = void 0;
const wishModel_1 = require("../models/wishModel");
class WishRepository {
    getAll() {
        return wishModel_1.wishModel.find();
    }
    getById(id) {
        return wishModel_1.wishModel.findById(id);
    }
    create(wish) {
        return wishModel_1.wishModel.create(wish);
    }
    update(id, wish) {
        return wishModel_1.wishModel.findByIdAndUpdate(id, wish, { returnDocument: "after" });
    }
    delete(id) {
        return wishModel_1.wishModel.findByIdAndDelete(id);
    }
}
exports.wishRepository = new WishRepository();
