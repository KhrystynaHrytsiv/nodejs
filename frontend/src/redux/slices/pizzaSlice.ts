import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPizza } from "../../interfaces/IPizza";
import { pizzaService } from "../../services/pizzaService";

interface IInitial{
    pizzas:IPizza[],
    trigger:boolean
}

let initialState:IInitial ={
    pizzas:[],
    trigger:null

};
const getAll = createAsyncThunk <IPizza[]>(
    'pizzaSlice/getAll',
    async (_, {rejectWithValue}) =>{
        try{
           const {data} = await pizzaService.getAll();
           return data
        }catch (e) {
            return rejectWithValue(e)
        }
    }
)
const create = createAsyncThunk<IPizza, {pizza:IPizza}>(
    "pizzaSlice/create",
    async ({pizza}, {rejectWithValue}) =>{
        try{
            const {data} = await pizzaService.create(pizza);
            return data
        }catch (e) {
            return rejectWithValue(e)
        }
    }
)
const pizzaSlice = createSlice({
    name: "pizzaSlice",
    initialState,
    reducers:{},
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) =>{
                state.pizzas = action.payload
            })
            .addCase(create.fulfilled, state=>{
                state.trigger = !state.trigger
            })
});

const {reducer:pizzaReducer, actions} = pizzaSlice;
const pizzasActions = {...actions, getAll, create};
export {pizzaReducer, pizzasActions}