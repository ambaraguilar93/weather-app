import React, { useState } from 'react'

export const SearchForm = ({ onSearch }) => {
    const [city, setCity] = useState('');
  
    const handleInputChange = (event) => {
      setCity(event.target.value);
    };
  
    const handleSearch = () => {
      onSearch(city);
    };
  
    return (
      <div className="search-box">
        
        <input 
            
            type="text" 
            className="form-control" 
            placeholder="Ingrese una ciudad" 
            value={city} 
            onChange={handleInputChange} 
        />

        <button 
            type="button" 
            className="btn btn-primary"
            
            onClick={handleSearch}
        >Search</button>
      </div>
    );
  };