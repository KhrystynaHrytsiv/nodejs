import { QueryFilter } from "mongoose";

import { IPizza } from "../interfaces/IPizza";
import { IPizzaQuery } from "../interfaces/IQuery";
import { Pizza } from "../models/pizzaModel";

class PizzaRepository {
    public getAll(query: IPizzaQuery): Promise<[IPizza[], number]> {
        const skip = query.pageSize * (query.page - 1);
        const filterObject: QueryFilter<IPizza> = {};

        if (query.name) {
            filterObject.name = { $regex: query.name, $options: "i" };
        }
        if (query.price) {
            filterObject.price = query.price;
        }
        if (query.size) {
            filterObject.size = query.size;
        }

        return Promise.all([
            Pizza.find(filterObject)
                .limit(query.pageSize)
                .skip(skip)
                .sort(query.order),
            Pizza.find(filterObject).countDocuments(),
        ]);
    }
    public create(pizza: Partial<IPizza>): Promise<IPizza> {
        return Pizza.create(pizza);
    }
}
export const pizzaRepository = new PizzaRepository();
