// - Список команд
import React, { useEffect, useState } from "react";
import Preloader from "../components/PreLoader";
import Search from "../components/Search";
import { Pagination } from "../components/Pagination";
import { TeamCard } from "../components/cards/TeamCard";
import { paginate, filterPosts } from "../utils/Helpers";
import ApiFootballData from "../utils/ApiFootballData";
const perPage = 10;
const defaultPage = 1;

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [paginatedTeams, setPaginatedTeams] = useState([]);
  const [resultTeams, setResultTeams] = useState([]);
  const [totalRecords, setTotalRecords] = useState(teams.length);

  useEffect(getTeams, []);

  function getTeams() {
    ApiFootballData.teams("list")
      .then((response) => {
        let teamsPosts = response?.teams.map((item) => {
          const { id, name, crestUrl } = item;
          return (item = { id, name, crestUrl});
        });

        setTeams(teamsPosts);
        setResultTeams(teamsPosts);
        setPaginatedTeams(
          paginate(resultTeams, currentPage, perPage)
        );
        setTotalRecords(teamsPosts.length);
      })
      .catch((error) => {
        setError("Повторите попытку позже.");
        console.log(error);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }

  /* Search Logic */
  const onSearchSubmit = (str) => {
    setError(null);

    let searchResults = filterPosts(teams, str);

    if (!str) {
      searchResults = teams.map((item) =>
        Object.values(item).join(",").split(",")
      );
      setError(null);
    }

    if (!searchResults.length) {
      setError("No teams found");
    }

    const resultItems = searchResults.map((item) => ({
      id: item[0],
      name: item[1],
      crestUrl: item[2],
    }));
    
    setCurrentPage(1);
    setResultTeams(resultItems);
    setPaginatedTeams(paginate(resultItems, defaultPage, perPage));
    setTotalRecords(resultItems.length);
  };

  /* Pagination Logic */

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setPaginatedTeams(paginate(resultTeams, page, perPage));
  };

  if (error) {
    return (
      <div className="pt-3">
        <h1>Teams</h1>
        <Search onSearchSubmit={onSearchSubmit} />
        <div className="text-center">
          <h4>{error} </h4>
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
        <h1>Команды</h1>
        <Search onSearchSubmit={onSearchSubmit} />
        <div className="team-cards">
          {paginatedTeams &&
            paginatedTeams.map((team) => (
              <TeamCard team={team} key={team.id} />
            ))}
        </div>
        <Pagination
           perPage={perPage}
           currentPage={currentPage}
           totalRecords= {totalRecords}
           onPageChange={handlePageChange}
        />
      </div>
    );
  }
};

export default Teams;
