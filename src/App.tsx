import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from "./hooks";
import { hasMore, incrementVisibleItems } from './reducers/scrollReducer';
import {isSearchedFlag } from './reducers/searchReducer';

import SearchInput from './components/Search/SearchInput';
import TabFilter from './components/Filter/TabFilter';
import Card from './components/Card/Card';


import './App.scss'


function App() {
  let prevScrollTop = 0; // Variable to store the previous scroll position

  const dispatch = useAppDispatch();
  const hasMoreContent = useAppSelector(hasMore);
  const isSearchPerformed = useAppSelector(isSearchedFlag);


  const handleScroll = () => {
    const {
      scrollTop,
      scrollHeight,
      clientHeight
    } = document.documentElement;

    // Check if scrolling down
    if (scrollTop > prevScrollTop && scrollTop + clientHeight >= scrollHeight - 5 && hasMoreContent) {
      dispatch(incrementVisibleItems());
    }

    // Update the previous scroll position
    prevScrollTop = scrollTop;
  };


  useEffect(() => {
    if(isSearchPerformed){
      document.body.style.overflowY = "scroll";
      document.body.style.height = "100vh";
    }
  }, [isSearchPerformed]);


  useEffect(() => {
    const scrollHandler = () => {
      handleScroll();
    };

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);




  return (
    <>
      <header>
        <nav>
          <SearchInput />
          <TabFilter />
        </nav>
      </header>
      <main onScroll={handleScroll}>
        <Card />
      </main>
    </>
  );
}

export default App;
