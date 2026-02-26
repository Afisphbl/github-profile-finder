import React, { useEffect, useState } from "react";
import Button from "./Button";
import useDebounce from "../hooks/useDebounce";
import { useGithubUser } from "../context/GithubUser";
import { Search, Loader } from "lucide-react";
import "../styles/SearchBar.css";

function SearchBar() {
  const [query, setQuery] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const { isLoading, handleSearchGithubUser, clearGithubData } =
    useGithubUser();

  function handleQueryChange(e) {
    const value = e.target.value.trim();
    setQuery(value);

    // if (!value) clearGithubData();
  }

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      handleSearchGithubUser(debouncedQuery);
    } else {
      clearGithubData(); // Safe: clear state when input is empty
    }
  }, [debouncedQuery, handleSearchGithubUser, clearGithubData]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!debouncedQuery) return;
    handleSearchGithubUser(debouncedQuery);
  }

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <Search size={20} className="search-icon" />

          <input
            type="text"
            className="search-input"
            placeholder="Search GitHub username..."
            value={query}
            onChange={handleQueryChange}
          />
          {isLoading && (
            <Loader size={20} className="loading-icon animate-spin" />
          )}
        </div>
        <Button className="search-button">Search</Button>
      </form>
    </div>
  );
}

export default SearchBar;
