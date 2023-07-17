import { render, fireEvent, screen } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFilter, filterName } from '../../reducers/filterReducer';
import { FilterCategory } from '../../constants/category';
import TabFilter from './TabFilter';


jest.mock('../../hooks');

describe('TabFilter', () => {
    const mockUseAppDispatch = useAppDispatch as jest.Mock;
    const mockUseAppSelector = useAppSelector as jest.Mock;

    beforeEach(() => {
        mockUseAppDispatch.mockClear();
        mockUseAppSelector.mockClear();
    });

    test('renders correctly with initial state', () => {
        // Arrange
        mockUseAppSelector.mockReturnValue('Artist');

        // Act
        render(<TabFilter />);

        // Assert
        expect(screen.getByText('Artist')).toHaveClass('active');
        expect(screen.getAllByRole('listitem')).toHaveLength(
            Object.keys(FilterCategory).length
        );
    });

    test('updates selected filter name on click', () => {
        // Arrange
        const mockDispatch = jest.fn();
        mockUseAppDispatch.mockReturnValue(mockDispatch);
        mockUseAppSelector.mockReturnValue('Artist');
        render(<TabFilter />);
        const filterOption = screen.getByText('Album');
      
        // Act
        fireEvent.click(filterOption);
      
        // Assert
        expect(mockUseAppSelector).toHaveBeenCalledTimes(1); // Check initial call
        expect(mockUseAppSelector.mock.calls[0][0]).toBe(filterName); // Check initial call argument
        expect(mockDispatch).toHaveBeenCalledWith(setFilter('Album'));
      });      
});