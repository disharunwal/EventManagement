
import React, { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = () => {
    onSearch({ searchTerm, location, date });
  };

  return (
    <div className="search-bar">
      <TextField
        label="Search Events"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <TextField
        label="Location"
        variant="outlined"
        size="small"
        select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="filter-input"
      >
        <MenuItem value="">All Locations</MenuItem>
        <MenuItem value="Location1">Location 1</MenuItem>
        <MenuItem value="Location2">Location 2</MenuItem>
        <MenuItem value="Location3">Location 3</MenuItem>
      </TextField>
      <TextField
        label="Date"
        variant="outlined"
        size="small"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="filter-input"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSearch}
        className="search-button"
      >
        <SearchIcon /> Search
      </Button>
    </div>
  );
};

export default SearchBar;
