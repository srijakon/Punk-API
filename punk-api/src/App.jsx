import "./App.css";
import React from "react";
import SearchBar from "./Components/SearchBar";
import Card from "./Components/Card";
import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [beers, updateBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isClassic, setIsClassic] = useState("false");

  const getBeers = () => {
    fetch("https://api.punkapi.com/v2/beers")
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => setCount(jsonResponse.length));
  };
  const handleBlur = (event) => {
    const userInput = event.target.value;
    setSearchTerm(userInput);
  };
  const handleClick = (event) => {
    setIsClassic(!isClassic);
  };

  useEffect(() => {
    fetch("https://api.punkapi.com/v2/beers?beer_name=" + searchTerm)
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => setCount(jsonResponse.length));
  }, [searchTerm]);

  useEffect(() => {
    getBeers();
  });

  useEffect(() => {
    const api_Url = "https://api.punkapi.com/v2/beers";
    fetch(api_Url)
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => updateBeers(jsonResponse));
  }, []);

  useEffect(() => {
    fetch(
      "https://api.punkapi.com/v2/beers?brewed_before=01-11-2008" + isClassic
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (response) => setIsClassic(response.filter((year) => year < 2008)),
        [isClassic]
      );
  }, []);

  return (
    <div className="App">
      <h1>There are {count} beers at brewdog</h1>
      <input type="text" placeholder="Search here" onBlur={handleBlur} />
      <SearchBar />
      <Card beer={beers} />
      <button onClick={handleClick}>Find is Classic</button>
    </div>
  );
}

export default App;
