// Список лиг/соревнований

import React, { useEffect, useState, useMemo } from "react";
import Preloader from "../components/PreLoader";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import ApiFootballData from "../utils/ApiFootballData";
import CompetitionCard from "../components/cards/CompetitionCard";

const Competitions = () => {
  const defaultPage = { pageNumber: 1, isActive: true };
  const perPage = 9;

  const [competitions, setCompetitions] = useState([]);
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [resultCompetitions, setResultCompetitions] = useState([]);
  const [displayedCompetitions, setDisplayedCompetitions] = useState([]);
  const [totalRecords, setTotalRecords] = useState(competitions.length);

  const paginationObject = {
    perPage: perPage,
    currentPage: currentPage,
    totalRecords: totalRecords,
  };

  useEffect(getCompetitions, []);

  function getCompetitions() {
    ApiFootballData.competitions("list")
      .then((response) => {
        let competitionsPosts = response?.competitions.map((item) => {
          const { id, name, area } = item;
          return (item = { id: id, name: name, area: area.name });
        });

        setCompetitions(competitionsPosts);
        setResultCompetitions(competitionsPosts);
        setDisplayedCompetitions(
          paginate(competitionsPosts, currentPage, perPage)
        );
        setTotalRecords(competitionsPosts.length);
      })
      .catch((error) => {
        setError("Повторите попытку позже.");
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }

  /* Pagination */

  const pageClickHandler = (page) => {
    setCurrentPage(page);
    setDisplayedCompetitions(pages);
  };

  const paginate = (competitions, currentPage, perPage) => {
    let from = currentPage.pageNumber * perPage - perPage;
    let to = currentPage.pageNumber * perPage;
    return competitions.slice(from, to);
  };

  const pages = useMemo(
    () => paginate(resultCompetitions, currentPage, perPage),
    [resultCompetitions, currentPage, perPage]
  );

  /* Search */

  function filterPosts(arr, str) {
    let strLowCase = str.toLowerCase();

    let stringArray = arr.map((item) => Object.values(item).join(","));

    let results = stringArray.filter((post) =>
      post.toLowerCase().includes(strLowCase)
    );

    return results.map((element) => element.split(","));
  }

  const onSearchSubmit = (str) => {
    setError(null);

    let searchResults = filterPosts(competitions, str);

    if (!str) {
      searchResults = competitions.map((item) =>
        Object.values(item).join(",").split(",")
      );
      setError(null);
    }

    if (!searchResults.length) {
      setError("No posts found");
    }

    let search_results = searchResults.map((item) => ({
      id: parseInt(item[0]),
      name: item[1],
      area: item[2],
    }));

    setResultCompetitions(search_results);
    setDisplayedCompetitions(paginate(search_results, currentPage, perPage));
    setTotalRecords(search_results.length);
  };

  if (error) {
    return (
      <div className="pt-3">
        <h1>Лиги</h1>
        <Search onSearchSubmit={onSearchSubmit} />
        <div className="text-center">
          <h4>{error} </h4>{" "}
        </div>
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div className="spinner-container">
        <Preloader />
      </div>
    );
  } else {
    return (
      <div className="pt-3">
        <h1>Лиги</h1>
        <Search onSearchSubmit={onSearchSubmit} />
        <div className="competition-cards">
          {displayedCompetitions &&
            displayedCompetitions.map((competition) => (
              <CompetitionCard competition={competition} key={competition.id} />
            ))}
        </div>
        <Pagination
          paginationObject={paginationObject}
          onPageClicked={pageClickHandler}
        />
      </div>
    );
  }
};
export default Competitions;
