import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({ country }) => {
  return (
    <div>
      <h3>{country.name}</h3>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <img src={country.flag} alt={`Flag of ${country.name}`} style={{ width: '150px' }} />
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v2/all').then(response => {
      setCountries(response.data);
    });
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Search for a country...'
      />
      {filteredCountries.map(country => (
        <Country key={country.name} country={country} />
      ))}
    </div>
  );
};

export default App;