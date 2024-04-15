import { combineReducers, configureStore } from '@reduxjs/toolkit';
import CalculatorReducer from './CalculatorReducer/CalculatorReducer';

const rootReducer = combineReducers({
    CalculatorReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    })
}
 
type RootState = ReturnType<typeof rootReducer>;
type AppStore = ReturnType<typeof setupStore>;
type AppDispatch = AppStore["dispatch"];

export type {
    RootState,
    AppStore,
    AppDispatch
}