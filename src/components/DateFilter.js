import React, { useState } from "react";
import searchIcon from "../assets/svg/search.svg";
import PropTypes from "prop-types";

const DateFilter = ({ onDateFilterSubmit, onClearFilters, validationError, dates }) => {
  const { defaultFrom, defaultTo } = dates;
  const [userInput, setUserInput] = useState({ dateFrom: "", dateTo: "" });

  const handleClearFilters = () => {
   setUserInput({ dateFrom: defaultFrom, dateTo: defaultTo });
    onClearFilters();
  };

  const handleSubmit = () => {
    onDateFilterSubmit(userInput);
  };

  const dateFromChangeHandler = (event) => {
    setUserInput((prevState) => {
      return {
        ...prevState,
        dateFrom: event.target.value,
      };
    });
  };

  const dateToChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, dateTo: event.target.value };
    });
  };

  return (
    <div className="mt-1 mb-1">
      <div className="dates-filter">
        <span>Матчи</span>
        <div className="dates-filter__from">
          <span className="pr-1">с</span>
          <input
            type="date"
            name="From"
            placeholder="Select date start"
            onChange={dateFromChangeHandler}
            max={userInput.dateTo}
            value={userInput.dateFrom}
          />
        </div>
        <div className="dates-filter__to">
          <span className="pr-1">до</span>
          <input
            type="date"
            placeholder="Select date end"
            name="To"
            onChange={dateToChangeHandler}
            min={userInput.dateFrom}
            value={userInput.dateTo}
          />
        </div>
        <div>
          <button className="dates-filter__btn" onClick={handleSubmit}>
            <img src={searchIcon} className="site-search__icon" />
          </button>
        </div>
      </div>
      <span className="link" onClick={handleClearFilters}>
        Сбросить фильтр
      </span>
      {validationError && <div className="text-red">{validationError}</div>}
    </div>
  );
};

DateFilter.propTypes = {
  dates: PropTypes.shape({
    defaultFrom: PropTypes.string,
    defaultTo: PropTypes.string,
  }),
  onDateFilterSubmit: PropTypes.func,
  onClearFilters: PropTypes.func,
  validationError: PropTypes.string,
};

export default DateFilter;
