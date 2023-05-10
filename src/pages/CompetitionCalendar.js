import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "../components/tables/MatchesTable";
import { Breadcrumbs } from "../components/Breadcrumbs";
import DateFilter from "../components/DateFilter";
import { Pagination } from "../components/Pagination";
import Preloader from "../components/PreLoader";
import ApiFootballData from "../utils/ApiFootballData";
import errorImage from "../assets/images/error.png";
import { paginate } from "../utils/Helpers";
 const defaultPage = 1;
//Страница возвращает ошибку поскольку платный ресурс.

const perPage = 10;

const CompetitionCalendar = () => {
  const { id } = useParams();
  const [breadCrumbs, setBreadCrumbs] = useState([]);
  const [displayedMatches, setDisplayedMatches] = useState([]);
  const [resultMatches, setResultMatches] = useState([]);
  const [error, setError] = useState("");
  const [totalRecords, setTotalRecords] = useState(null);
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dateTo, setDateTo] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dates, setDates] = useState([]);

  useEffect(getMatches, [id]);

  function getMatches() {
    ApiFootballData.competitions("matches", { competition_id: id })
      .then((response) => {
        setDisplayedMatches(response.matches.slice(0, perPage));
        setTotalRecords(response.matches.length);
        setDates([
          response?.matches[0].utcDate,
          response?.matches[response.matches.length - 1].utcDate,
        ]);
        setResultMatches(response.matches);
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
    setDisplayedMatches(paginate(resultMatches, page, perPage));
    setCurrentPage(page);
  };

  /* Breadcrumbs */

  useEffect(getBreadCrumbs, [id]);

  function getBreadCrumbs() {
    ApiFootballData.teams("breadcrumbs", { id: id })
      .then((response) => {
        setBreadCrumbs([
          { name: "Соревнования", url: "/competitions" },
          { name: response.name, url: false },
        ]);
      })
      .catch(() => {
        console.log(error);
      });
  }
  /* Date Filter Handler */

  const handleDateFilterSubmit = (date) => {
    setDateFrom(date.dateFrom);
    setDateTo(date.dateTo);
  };

  useEffect(handleDateFilter, [dateFrom, dateTo]);

  function handleDateFilter() {
    if (dateFrom && dateTo) {
      ApiFootballData.teams("dates", {
        team_id: id,
        dateFrom: dateFrom,
        dateTo: dateTo,
      })
        .then((response) => {
          setCurrentPage(1);
          setDisplayedMatches(response?.matches.slice(0, perPage));
          setTotalRecords(response?.matches.length);
        })
        .catch((err) => {
          console.log(err.response);
        })
        .finally(() => {
          setIsLoaded(true);
        });
    }
  }

  if (error) {
    return (
      <div className="error text-center">
        <img src={errorImage} alt="error" className="responsive error-image" />
        <div className="error-message">
          <h3>Упсс..ошибка</h3>
          <h4> {error} </h4>
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
      <div>
        <DateFilter onDateFilterSubmit={handleDateFilterSubmit} dates={dates} />
        <Breadcrumbs breadCrumbs={breadCrumbs} />
        <h1 className="pt-1 pb-1">Календарь Лиги</h1>
        {displayedMatches.length > 0 ? (
          <Table matches={displayedMatches} />
        ) : (
          <div className="container text-center">
            Матчей на заданные даты не найдено.
          </div>
        )}
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

export default CompetitionCalendar;
