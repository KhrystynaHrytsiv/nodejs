import path from "node:path";

import { Request } from "express";
import multer from "multer";
import { v6 } from "uuid";

import { StatusCodes } from "../enums/statusCodes";
import { apiErrors } from "../errors/apiErrors";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), "uploads"));
    },
    filename: (req, file, cb) => {
        const uniqSuffix = v6();
        const ext = path.extname(file.originalname);
        cb(null, `${uniqSuffix}${ext}`);
    },
});

const fileFilter = (req: Request, file: any, cb: multer.FileFilterCallback) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase(),
    );
    const mineType = allowedTypes.test(file.mimetype);

    if (extname && mineType) {
        return cb(null, true);
    } else {
        cb(new apiErrors("Only images are allowed", StatusCodes.BAD_REQUEST));
    }
};

export const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, //5mb
    fileFilter: fileFilter,
});
