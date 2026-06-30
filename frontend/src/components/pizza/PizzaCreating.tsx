import { SubmitHandler, useForm } from "react-hook-form";
import { IPizza } from "../../interfaces/IPizza";
import { useAppDispatch } from "../../hook/reduxHooks";
import { pizzasActions } from "../../redux/slices/pizzaSlice";

const PizzaCreating = () => {
    const {register, handleSubmit} = useForm<IPizza>();
    const dispatch = useAppDispatch();
    const create:SubmitHandler<IPizza> = async (pizza) =>{
        await dispatch(pizzasActions.create({ pizza }))
    }

    return (
        <form onSubmit={handleSubmit(create)}>
            <input type="text" placeholder={'name'} {...register('name')} />
            <input type="number" placeholder={'price'} {...register('price')} />
            <input type="number"  placeholder={'size'} {...register('size')}/>
            <button>Create</button>
        </form>
    );
};

export { PizzaCreating };