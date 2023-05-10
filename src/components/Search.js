import React, { useState } from "react";
import searchIcon from "../assets/svg/search.svg";
import PropTypes from "prop-types";

const Search = ({ onSearchSubmit }) => {
  const [searchString, setSearchString] = useState("");

  const submitHandler = (event)=> {
      event.preventDefault();
      onSearchSubmit(searchString);
    };

  return (
    <div className="site-search">
      <form
        className="site-search__form"
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <input
          type="text"
          className="site-search__input"
          value={searchString}
          name="searchString"
          placeholder="Поиск.."
          onChange={(e) => setSearchString(e.target.value)}
        />
        <button type="submit" className="site-search__btn btn" value="Submit">
          <img src={searchIcon} className="site-search__icon" />
        </button>
      </form>
    </div>
  );
};

Search.propTypes = {
  onSearchSubmit: PropTypes.func,
};

export default Search;
