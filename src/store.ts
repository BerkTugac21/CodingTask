import { configureStore, ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import inputReducer from './reducers/searchReducer';
import scrollReducer from './reducers/scrollReducer';
import filterReducer from './reducers/filterReducer';
import musicAPIReducer from './reducers/musicAPIReducer';

const store = configureStore({
    reducer: {
        input: inputReducer,
        filter: filterReducer,
        scroll: scrollReducer,
        content: musicAPIReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


export default store;
