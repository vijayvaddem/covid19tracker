import React, { useState, useEffect } from "react";
import { Select, MenuItem, FormControl } from "@material-ui/core";
import "./App.css";

function App() {
  const [countries, setCountries] = useState(["USA", "UK", "INDIA"]);
  const [country, setCountry] = useState(["Worldwide"]);
  useEffect(() => {
    // code inside will run once when the component loads and NOT again after
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="App">
      <div className="app__header">
        <h1>Covid 19 Tracker App</h1>
        <FormControl className="add__dropdown">
          <Select onChange={onCountryChange} variant="outlined" value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
