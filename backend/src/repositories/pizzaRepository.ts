import { IPizza } from "../interfaces/IPizza";
import { Pizza } from "../models/pizzaModel";

class PizzaRepository {
    public getAll(): Promise<IPizza[]> {
        return Pizza.find();
    }
    public create(pizza: IPizza): Promise<IPizza> {
        return Pizza.create(pizza);
    }
}
export const pizzaRepository = new PizzaRepository();
