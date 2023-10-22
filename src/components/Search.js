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

  return (
    <div className="bg-gray-800 p-5 text-center ">
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
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="bg-orange-500 text-white rounded border-none p-2 cursor-pointer text-xl w-32 mx-3 h-12 mt-12"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          <div className="w-full mt-4 flex flex-wrap">
            {results.map((post) => (
              <div key={post.objectID} className="w-1/3 p-2">
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
