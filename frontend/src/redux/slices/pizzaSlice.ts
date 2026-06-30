import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPizza } from "../../interfaces/IPizza";
import { pizzaService } from "../../services/pizzaService";

interface IInitial{
    pizzas:IPizza[]
}

let initialState:IInitial ={
    pizzas:[],
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
const pizzaSlice = createSlice({
    name: "pizzaSlice",
    initialState,
    reducers:{},
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) =>{
                state.pizzas = action.payload
            })
});

const {reducer:pizzaReducer, actions} = pizzaSlice;
const pizzasActions = {...actions, getAll};
export {pizzaReducer, pizzasActions}