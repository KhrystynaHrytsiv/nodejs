import { configureStore } from "@reduxjs/toolkit";
import { pizzaReducer } from "./slices/pizzaSlice";
import { authReducer } from "./slices/authSlice";

const store = configureStore({
    reducer:{
        pizzas: pizzaReducer,
        auth: authReducer
    }
});
export {store}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;