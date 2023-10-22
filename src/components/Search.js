import React, { useState } from "react";
import PostList from "../components/PostList";
import axios from "axios";
import hacker from "../components/images/hacker.png";
import "../App.css";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setResults(response.data.hits);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);

    // Automatically update the results as you type
    try {
      axios
        .get(`http://hn.algolia.com/api/v1/search?query=${e.target.value}`)
        .then((response) => setResults(response.data.hits));
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  return (
    <div className="p-5 text-center ">
      <div className="w-full md:flex">
        <img
          src={hacker}
          className="w-24 h-24 m-0 mb-2 md:mb-0 md:w-40 md:h-40"
          alt=""
        />
        <div className="md:w-1/2 flex flex-col items-center md:items-start">
          <div className="w-full flex">
            <input
              className="p-2 bg-gray-700 text-white rounded border-none w-full mb-2 md:mb-0 text-xl placeholder-gray-500 h-12 mt-12"
              type="text"
              placeholder="Search Hacker News"
              value={query}
              onChange={handleChange}
            />
          </div>
          <div className="w-full mt-4  ">
            {results.map((post) => (
              <div
                key={post.objectID}
                className="text-start text-yellow-500 italic hover:text-xl  p-2"
              >
                <PostList results={[post]} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
