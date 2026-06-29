import { IPizza } from "../interfaces/IPizza";
import { pizzaRepository } from "../repositories/pizzaRepository";

class PizzaService {
    public getAll(): Promise<IPizza[]> {
        return pizzaRepository.getAll();
    }
    public create(pizza: IPizza): Promise<IPizza> {
        return pizzaRepository.create(pizza);
    }
}
export const pizzaService = new PizzaService();
