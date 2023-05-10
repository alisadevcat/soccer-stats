import React, { useEffect, useState, useMemo, memo } from "react";
import PropTypes from "prop-types";
import { makeButtonsArray } from "../utils/Helpers";
//дефолтное значение не изменяется про ререндере

const PaginationInner = ({ perPage, currentPage, totalRecords, onPageChange }) => {
  const [activePage, setActivetPage] = useState(currentPage);
  const buttonsCount = useMemo(() => Math.floor(Math.ceil(totalRecords / perPage)), [totalRecords, perPage]); //number of buttons we need
  const paginationButtons = makeButtonsArray(buttonsCount); //set array of buttons
  
  useEffect(() => {
    onPageChange(activePage);
  }, [activePage]);

  useEffect(() => {
    setActivetPage(currentPage);
  }, [currentPage]);

  const onPageClick = (num) => {
    setActivetPage(num);
  };

  const setPrevious = () => {
    if (activePage != 1) {
      setActivetPage(activePage - 1);
    }
  };

  const setNext = () => {
    if (activePage != buttonsCount) {
      setActivetPage(activePage + 1);
    }
  };

  return (
    <div className="pagination">
      <ul className="pagination-list">
        <li className="pagination-item">
          <span>
            <button type="button" onClick={setPrevious}>
              &#60;&#60;
            </button>
          </span>
        </li>
        {paginationButtons &&
          paginationButtons.map((num) => (
            <li className="pagination-item" key={num}>
              <button
                type="button"
                className={activePage == num ? "page-active" : ""}
                onClick={() => onPageClick(num)}
              >
                {num}
              </button>
            </li>
          ))}
        <li className="pagination-item">
          <span>
            <button type="button" onClick={setNext}>
              &#62;&#62;
            </button>
          </span>
        </li>
      </ul>
    </div>
  );
};

PaginationInner.propTypes = {
  perPage: PropTypes.number,
  currentPage: PropTypes.number,
  totalRecords: PropTypes.number,
  onPageChange: PropTypes.func,
};

export const Pagination = memo(PaginationInner);
