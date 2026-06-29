import { model, Schema } from "mongoose";

import { IPizza } from "../interfaces/IPizza";

const pizzaSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: Number, required: true },
});

export const Pizza = model<IPizza>("pizza", pizzaSchema);
