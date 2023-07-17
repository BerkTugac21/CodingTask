import { createSlice, PayloadAction  } from '@reduxjs/toolkit';


interface InputState {
    value: string;
    isSearched: boolean;
}

const initialState: InputState = {
    value: '',
    isSearched: false
};

const inputSlice = createSlice({
    name: 'input',
    initialState,
    reducers: {
        setSearchInput: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
        setIsSearched: (state, action: PayloadAction<boolean>) => {
            state.isSearched = action.payload;
        },
    },
});

export const { setSearchInput, setIsSearched } = inputSlice.actions;

export const searchInputText = (state: { input: { value: string } }) => state.input.value;
export const isSearchedFlag = (state: { input: { isSearched: boolean } }) => state.input.isSearched;


export default inputSlice.reducer;

