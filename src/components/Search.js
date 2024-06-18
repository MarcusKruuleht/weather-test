import React, { useState } from 'react';
import './Search.css'; // Import CSS file

function Search({ onSelectItem }) {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const onSelect = (city) => {
    onSelectItem(city);
    setSearchResults([]);
  };

  const inputChangeHandler = (event) => {
    setQuery(event.target.value);
  };

  const buttonClickHandler = () => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`)
      .then((result) => result.json())
      .then((cities) => {
        setSearchResults(
          cities.map((city) => ({
            name: city.name,
            country: city.country,
            lat: city.lat,
            lon: city.lon,
          }))
        );
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  };

  return (
    <div className="search-container">
      <div className="input-container">
        <input
          type="text"
          value={query}
          onChange={inputChangeHandler}
          placeholder="Enter location"
          data-testid="search-input"
        />
        <button data-testid="search-button" onClick={buttonClickHandler}>
          Search
        </button>
      </div>
      {searchResults.length > 0 && (
        <div data-testid="search-results" className="search-results">
          {searchResults.map((city) => (
            <div
              className="search-result"
              key={`${city.lat}-${city.lon}`}
              onClick={() => onSelect(city)}
            >
              <span className="cityname">{city.name}</span>
              <span className="city-location">
                {city.lat}, {city.lon}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;