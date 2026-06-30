import { Pizzas } from "../components/pizza/Pizzas";
import { PizzaCreating } from "../components/pizza/PizzaCreating";

const PizzasPage = () => {
    return (
        <div>
            <PizzaCreating/>
            <hr/>
            <Pizzas/>
        </div>
    );
};

export { PizzasPage };