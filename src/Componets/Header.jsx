import React, { useContext, useEffect, useState, useRef } from 'react';
import logo from './../assets/Images/logo.png';
import SideNavGenreList from './SideNavGenreList';
import { HiMoon, HiOutlineBars3CenterLeft, HiOutlineMagnifyingGlass, HiOutlineXMark, HiSun } from 'react-icons/hi2';
import { ThemeContext } from '../Context/ThemeContext';
import SearchResults from './SearchResults'; // Assuming you have named your new component SearchResults

function Header() {
  const [toggle, setToggle] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const { theme, setTheme } = useContext(ThemeContext);
  const [searchResults, setSearchResults] = useState([]);
  const searchResultsRef = useRef(null);

  useEffect(() => {
    console.log('THEME--', theme);

    // Attach event listener to detect clicks outside the search results
    document.addEventListener('click', handleClickOutside);

    return () => {
      // Remove event listener when the component is unmounted
      document.removeEventListener('click', handleClickOutside);
    };
  }, [theme]);

  const handleClickOutside = (event) => {
    if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
      // Click is outside the search results container, close it
      setSearchResults([]);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.rawg.io/api/games?key=18d8dc115d954615a6fe8522598e8a97&search=${searchInput}`);
      const data = await response.json();

      // Update state with search results
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="flex items-center p-3">
      <img src={logo} width={60} height={60} className="hidden md:block" />
      <div className="md:hidden">
        {!toggle ? (
          <HiOutlineBars3CenterLeft
            onClick={() => setToggle(!toggle)}
            className="dark:text-white text-[25px] cursor-pointer"
          />
        ) : (
          <HiOutlineXMark onClick={() => setToggle(!toggle)} className="dark:text-white text-[25px] cursor-pointer" />
        )}
        {toggle ? (
          <div className="absolute z-10 bg-white mt-3 dark:bg-[#121212]">
            <SideNavGenreList />
          </div>
        ) : null}
      </div>
      <div className="flex bg-slate-200 mx-5 w-full p-2 rounded-full items-center px-2">
        <HiOutlineMagnifyingGlass />
        <input
          type="text"
          placeholder="Search Games"
          className="bg-transparent w-full outline-none pl-2 items-center rounded-full"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {theme === 'dark' ? (
          <HiSun
            className="text-[35px] cursor-pointer bg-gray-200 text-black p-1 rounded-full "
            onClick={() => setTheme('light')}
          />
        ) : (
          <HiMoon
            className="text-[35px] cursor-pointer bg-gray-200 text-black p-1 rounded-full"
            onClick={() => setTheme('dark')}
          />
        )}
      </div>
      {searchResults.length > 0 && (
        <div className="absolute top-14 z-10 bg-white dark:bg-[#121212] p-4" ref={searchResultsRef}>
          {/* Display search results */}
          <SearchResults results={searchResults} onResultClick={(id) => getMovieDetails(id)} />
        </div>
      )}
    </div>
  );
}

export default Header;
