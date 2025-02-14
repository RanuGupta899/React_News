
import React, { useEffect, useState } from "react";
import Card from "./Card";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const Newsapp = () => {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState([]);

  const API_KEY = "a9a4238b11f946609a65792921255898";

  const getData = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`
      );
      const jsonData = await response.json();
      console.log(jsonData.articles);
      setNewsData(jsonData.articles || []); // Ensuring it's always an array
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const userInput = (event) => {
    setSearch(event.target.value);
    getData(); // Fetch news based on category
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <div className="container-fluid">
          <h1 className="navbar-brand">Trending News</h1>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
                All News
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Trending
              </a>
            </li>
          </ul>
          <form className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search News"
              value={search}
              onChange={handleInput}
            />
            <button className="btn btn-primary" onClick={getData} type="button">
              Search
            </button>
          </form>
        </div>
      </nav>

      <p className="text-center mt-3 fw-bold">Stay Updated with TrendyNews</p>

      {/* Category Buttons */}
      <div className="d-flex justify-content-center flex-wrap gap-2 my-3">
        {["sports", "politics", "entertainment", "health", "fitness"].map(
          (category) => (
            <button
              key={category}
              className="btn btn-outline-primary"
              onClick={userInput}
              value={category}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          )
        )}
      </div>

      {/* News Cards */}
      <div className="row">
        {newsData.length > 0 ? <Card data={newsData} /> : <p>No news found.</p>}
      </div>
    </div>
  );
};

export default Newsapp;
