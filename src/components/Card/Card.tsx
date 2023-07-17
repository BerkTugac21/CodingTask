import { useEffect } from "react";

import CardSkeleton from "./CardSkeleton";

import { RootState } from '../../store';
import { useAppDispatch, useAppSelector, } from "../../hooks";
import { filterName } from '../../reducers/filterReducer';
import { setContents } from '../../reducers/musicAPIReducer';
import {
    searchInputText,
    isSearchedFlag,
    setIsSearched,
    setSearchInput
} from '../../reducers/searchReducer';
import { resetVisibleItemsToDefault } from '../../reducers/scrollReducer';


import './card.scss';


function Card() {
    const dispatch = useAppDispatch();

    const selectedFilterName = useAppSelector(filterName);
    const input = useAppSelector(searchInputText);
    const isSearched = useAppSelector(isSearchedFlag);


    const contents = useAppSelector((state: RootState) => state.content.contents);
    const isLoading = useAppSelector((state: RootState) => state.content.isLoading);
    const error = useAppSelector((state: RootState) => state.content.error);



    useEffect(() => {
        dispatch(setIsSearched(false));
        dispatch(resetVisibleItemsToDefault());
    }, [dispatch, input])


    useEffect(() => {
        dispatch(setIsSearched(false));
        dispatch(setSearchInput(''));
        dispatch(resetVisibleItemsToDefault());
        dispatch(setContents([]));
    }, [dispatch, selectedFilterName])



    if (isLoading) {
        return <CardSkeleton count={contents.length} />
    }

    if (error) {
        return <h1>{error}</h1>
    }

    if (isSearched === true && contents.length === 0) {
        return <h1>No Results!</h1>
    }

    if (contents?.length > 0) {
        if (selectedFilterName === 'Artist') {
            return (
                <section className="card-grid">
                    {contents.map((item) => (
                        <div className="card">
                            <h2 className="card-title">
                                {item?.artistType?.toUpperCase()}
                            </h2>
                            <div className="card-content">
                                <p className="card-content__text"><strong>Name:</strong> {item.artistName}</p>
                                <p className="card-content__text"><strong>Genre:</strong> {item.primaryGenreName}</p>
                            </div>
                            <div className="card-footer">
                                <a href={item.artistLinkUrl}>Artist Link {">"}</a>
                            </div>
                        </div>
                    ))}
                </section >
            );
        } else if (selectedFilterName === 'Album') {
            return (
                <section className="card-grid">
                    {contents.map((item) => (
                        <div className="card">
                            <h2 className="card-title">
                                {item?.collectionType?.toUpperCase()}
                            </h2>
                            <img className="card-image" src={item.artworkUrl100} alt="Album Image" />
                            <div className="card-content">
                                <p className="card-content__text"><strong>Album:</strong> {item.collectionName}</p>
                                <p className="card-content__text"><strong>Release:</strong> <time dateTime={item.releaseDate}>{new Date(item.releaseDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</time></p>
                            </div>
                            <div className="card-footer">
                                <p>{item.collectionPrice} {item.currency}</p>
                            </div>
                        </div>
                    ))}
                </section>
            );
        } else if (selectedFilterName === 'Song') {
            return (
                <section className="card-grid">
                    {contents.map((item) => (
                        <div className="card">
                            <h2 className="card-title">
                                {item?.kind?.toUpperCase()}
                            </h2>
                            <img className="card-image" src={item.artworkUrl100} alt="Song Image" />
                            <div className="card-content">
                                <p className="card-content__text"><strong>Song:</strong> {item.trackName}</p>
                                <p className="card-content__text"><strong>Artist:</strong> {item.artistName}</p>
                            </div>
                        </div>
                    ))}
                </section>
            );
        }
    }

    return null;
}

export default Card;