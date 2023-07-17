import { createSlice, PayloadAction  } from '@reduxjs/toolkit';


interface TabFilterState {
    value: string;
}

const initialState: TabFilterState = {
    value: 'Artist',
};

const tabFilterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { setFilter } = tabFilterSlice.actions;

export const filterName = (state: { filter: { value: string } }) => state.filter.value;

export default tabFilterSlice.reducer;
