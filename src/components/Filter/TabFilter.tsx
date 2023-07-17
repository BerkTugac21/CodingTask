import { useAppDispatch, useAppSelector } from "../../hooks";
import { setFilter, filterName } from '../../reducers/filterReducer';
import { FilterCategory } from '../../constants/category'



function TabFilter() {
    const filterOptions = Object.keys(FilterCategory);

    const dispatch = useAppDispatch();

    const selectedFilterName = useAppSelector(filterName);



    return (
        <ul className="nav-container">
            {filterOptions.map((item) => {
                return (
                    <li key={item}>
                        <a
                            className={selectedFilterName === item ? 'active' : ''}
                            onClick={() => dispatch(setFilter(item))}
                        >
                            {item}
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}

export default TabFilter;