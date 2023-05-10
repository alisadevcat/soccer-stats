// Список лиг/соревнований
import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import Preloader from "../components/PreLoader";
import { Pagination } from "../components/Pagination";
import ApiFootballData from "../utils/ApiFootballData";
import { CompetitionCard } from "../components/cards/CompetitionCard";
import { paginate, filterPosts } from "../utils/Helpers";
export const defaultPage = 1;
const perPage = 9;

const Competitions = () => {
  const [competitions, setCompetitions] = useState([]); // initial posts - used in search also
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [resultCompetitions, setResultCompetitions] = useState([]); //all competitions found by search
  const [paginatedCompetitions, setPaginatedCompetitions] = useState([]); //competitions sliced by pages and displayed on UI
  const [totalRecords, setTotalRecords] = useState(null);

  // const setCurrentPage = (...args) => {
  //   console.log('setCurrentPageInteral', ...args);
  //   setCurrentPageInteral(...args);
  // }

  console.log(competitions);
 
  /* Get Competitions */
  useEffect(getCompetitions, []);

  function getCompetitions() {
    ApiFootballData.competitions("list")
      .then((response) => {
        let competitionsPosts = response?.competitions.map((item) => {
          const { id, name, area } = item;
          return (item = { id, name, area: area.name });
        });

        setCompetitions(competitionsPosts);
        setResultCompetitions(competitionsPosts);
        setPaginatedCompetitions(
          paginate(resultCompetitions, currentPage, perPage)
        );
        setTotalRecords(competitionsPosts.length);
      })
      .catch((error) => {
        setError("Повторите попытку позже.");
        console.log(error);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }

  /* Pagination */

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setPaginatedCompetitions(paginate(resultCompetitions, page, perPage));
  };

  /* Search */

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
      setError("No competitions found");
    }

    const resultItems = searchResults.map((item) => ({
      id: parseInt(item[0]),
      name: item[1],
      area: item[2],
    }));

    setCurrentPage(1);
    setResultCompetitions(resultItems);
    setPaginatedCompetitions(paginate(resultItems, defaultPage, perPage));
    setTotalRecords(resultItems.length);
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
          {paginatedCompetitions &&
            paginatedCompetitions.map((competition) => (
              <CompetitionCard competition={competition} key={competition.id} />
            ))}
        </div>
        <Pagination
          perPage={perPage}
          currentPage={currentPage}
          totalRecords={totalRecords}
          onPageChange={handlePageChange}
        />
      </div>
    );
  }
};
export default Competitions;
