import { useAppDispatch, useAppSelector } from "../../hook/reduxHooks";
import { useEffect } from "react";
import { pizzasActions } from "../../redux/slices/pizzaSlice";
import { Pizza } from "./Pizza";

const Pizzas = () => {
    const {pizzas, trigger} = useAppSelector(state => state.pizzas);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(pizzasActions.getAll())
    }, [trigger, dispatch]);
    return (
        <div>
            {pizzas.map(pizza => <Pizza key={pizza.id} pizza={pizza}/>)}
        </div>
    );
};

export { Pizzas };