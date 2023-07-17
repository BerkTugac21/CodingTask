import { createSlice, PayloadAction  } from '@reduxjs/toolkit';

interface ScrollState {
    value: number;
    prevScrollTop: number;
    hasMore: boolean;
}



const initialState: ScrollState = {
    value: 10,
    prevScrollTop:0,
    hasMore: true,
};

const scrollSlice = createSlice({
    name: 'scroll',
    initialState,
    reducers: {
        incrementVisibleItems: (state) => {
            if(state.value < 200){
                state.value += 10;
            }
            state.hasMore = false;
        },
        setPrevScrollTop: (state, action: PayloadAction<number>) => {
            state.prevScrollTop = action.payload;
        },
        resetVisibleItemsToDefault: (state) => {
            state.value = 10;
            state.hasMore = true;
        },
    },
});

export const { incrementVisibleItems, resetVisibleItemsToDefault, setPrevScrollTop } = scrollSlice.actions;

export const visibleItemsNumber = (state: { scroll: { value: number } }) => state.scroll.value;
export const prevScrollTop = (state: { scroll: { prevScrollTop: number } }) => state.scroll.prevScrollTop;
export const hasMore = (state: { scroll: { hasMore: boolean } }) => state.scroll.hasMore;


export default scrollSlice.reducer;
