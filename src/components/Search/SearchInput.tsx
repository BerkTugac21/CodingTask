import React, { FormEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from '../../store';

import { filterName } from '../../reducers/filterReducer';
import { fetchSearch } from '../../reducers/musicAPIReducer';
import {
    searchInputText,
    setIsSearched,
    setSearchInput
} from '../../reducers/searchReducer';
import { visibleItemsNumber } from '../../reducers/scrollReducer';
import { FilterCategory } from '../../constants/category'



function SearchInput() {

    const dispatch = useAppDispatch();

    const input = useAppSelector(searchInputText);
    const selectedFilterName = useAppSelector(filterName);
    const limit = useAppSelector(visibleItemsNumber);

    const contents = useAppSelector((state: RootState) => state.content.contents);

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(fetchSearch({
            term: input,
            entity: FilterCategory[selectedFilterName as keyof typeof FilterCategory],
            limit
        }));
        dispatch(setIsSearched(true));
    };


    useEffect(() => {
        if (contents.length !== 0) {
            if (limit > 10) {
                dispatch(fetchSearch({
                    term: input,
                    entity: FilterCategory[selectedFilterName as keyof typeof FilterCategory],
                    limit
                }));
            }

            if (limit === 200) {
                alert("Unable to load more. Limit reached (200)!")
            }
        }
    }, [limit]);




    return (
        <form onSubmit={handleSearch}>
            <input
                type="search"
                value={input}
                onChange={(e) => dispatch(setSearchInput(e.target.value))}
                placeholder="Music Store Search..."
            />
            <button
                type="submit"
                disabled={!input}
            >
                Search
            </button>
        </form>
    );
}


export default SearchInput;
