import { IPizza } from "../interfaces/IPizza";
import { IPizzaQuery } from "../interfaces/IQuery";
import { IResPagination } from "../interfaces/IResPagination";
import { pizzaRepository } from "../repositories/pizzaRepository";

class PizzaService {
    public async getAll(query: IPizzaQuery): Promise<IResPagination<IPizza>> {
        const [data, totalItems] = await pizzaRepository.getAll(query);
        const totalPages = Math.ceil(totalItems / query.pageSize);
        return {
            totalItems,
            totalPages,
            prevPage: !!(query.page - 1),
            nextPage: query.page < totalPages,
            data,
        };
    }
    public create(pizza: Partial<IPizza>): Promise<IPizza> {
        return pizzaRepository.create(pizza);
    }
}
export const pizzaService = new PizzaService();
