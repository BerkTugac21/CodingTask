import React from 'react';
import { render } from '@testing-library/react';
import { useSelector as useSelectorMock, useDispatch } from 'react-redux'; // Update import to include `useDispatch`

import Card from './Card';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('Card component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading skeleton when isLoading is true', () => {
    const dispatchMock = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
    (useSelectorMock as jest.Mock).mockReturnValue(true);

    const { container } = render(<Card />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders error message when error is present', () => {
    const dispatchMock = jest.fn();
    ((useDispatch as jest.Mock) as jest.Mock).mockReturnValue(dispatchMock);
    (useSelectorMock as jest.Mock)
      .mockReturnValueOnce(false) // Mock isLoading state
      .mockReturnValueOnce('Sample error message'); // Mock error state

    const { container } = render(<Card />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders "No Results!" message when isSearched is true and contents length is 0', () => {
    const dispatchMock = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
    (useSelectorMock as jest.Mock)
      .mockReturnValueOnce(false) // Mock isLoading state
      .mockReturnValueOnce(false) // Mock isSearched state
      .mockReturnValueOnce([]); // Mock contents array

    const { container } = render(<Card />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders artist cards when selectedFilterName is "Artist"', () => {
    const dispatchMock = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
    (useSelectorMock as jest.Mock)
      .mockReturnValueOnce(false) // Mock isLoading state
      .mockReturnValueOnce(false) // Mock isSearched state
      .mockReturnValueOnce('Artist') // Mock selectedFilterName
      .mockReturnValueOnce([
        { artistName: 'Artist 1', primaryGenreName: 'Genre 1', artistLinkUrl: 'http://example.com/artist1' },
        { artistName: 'Artist 2', primaryGenreName: 'Genre 2', artistLinkUrl: 'http://example.com/artist2' },
      ]); // Mock contents array with artist data

    const { container } = render(<Card />);

    expect(container.firstChild).toMatchSnapshot();
    // Additional assertions on the rendered artist cards and their information can be added here
  });

  test('renders album cards when selectedFilterName is "Album"', () => {
    const dispatchMock = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
    (useSelectorMock as jest.Mock)
      .mockReturnValueOnce(false) // Mock isLoading state
      .mockReturnValueOnce(false) // Mock isSearched state
      .mockReturnValueOnce('Album') // Mock selectedFilterName
      .mockReturnValueOnce([
        { albumName: 'Album 1', releaseDate: '2022-01-01', albumLinkUrl: 'http://example.com/album1' },
        { albumName: 'Album 2', releaseDate: '2022-02-01', albumLinkUrl: 'http://example.com/album2' },
      ]); // Mock contents array with album data

    const { container } = render(<Card />);

    expect(container.firstChild).toMatchSnapshot();
    // Additional assertions on the rendered album cards and their information can be added here
  });

  test('renders song cards when selectedFilterName is "Song"', () => {
    const dispatchMock = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
    (useSelectorMock as jest.Mock)
      .mockReturnValueOnce(false) // Mock isLoading state
      .mockReturnValueOnce(false) // Mock isSearched state
      .mockReturnValueOnce('Song') // Mock selectedFilterName
      .mockReturnValueOnce([
        { songName: 'Song 1', duration: '3:45', songLinkUrl: 'http://example.com/song1' },
        { songName: 'Song 2', duration: '4:30', songLinkUrl: 'http://example.com/song2' },
      ]); // Mock contents array with song data

    const { container } = render(<Card />);

    expect(container.firstChild).toMatchSnapshot();
    // Additional assertions on the rendered song cards and their information can be added here
  });

  test('returns null when contents array is empty', () => {
    const dispatchMock = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
    (useSelectorMock as jest.Mock)
      .mockReturnValueOnce(false) // Mock isLoading state
      .mockReturnValueOnce(false) // Mock isSearched state
      .mockReturnValueOnce('SomeFilter') // Mock selectedFilterName
      .mockReturnValueOnce([]); // Mock empty contents array

    const { container } = render(<Card />);

    expect(container.firstChild).toBeNull();
  });
});
