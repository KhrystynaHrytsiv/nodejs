import { IRes } from "../interfaces/IRes";
import { IPizza } from "../interfaces/IPizza";
import { apiService } from "./apiService";
import { urls } from "../constants/urls";

export const pizzaService = {
    getAll:():IRes<IPizza[]> => apiService.get(urls.pizza),
    create:(pizza:Partial<IPizza>):IRes<IPizza> => apiService.post(urls.pizza, pizza)
}