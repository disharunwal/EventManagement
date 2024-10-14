
import React, { useState } from 'react';
import './SearchFilters.css'; 

const SearchFilters = ({ onFilter }) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const handleFilter = () => {
    onFilter({ keyword, location, date });
  };

  return (
    <div className="search-filters">
      <input
        type="text"
        placeholder="Keyword..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
};

export default SearchFilters;
