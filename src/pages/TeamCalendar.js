import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Pagination } from "../components/Pagination";
import { paginate } from "../utils/Helpers";
import DateFilter from "../components/DateFilter";
import Preloader from "../components/PreLoader";
import Table from "../components/tables/MatchesTable";
import ApiFootballData from "../utils/ApiFootballData";
import { convertToUTCdate, convertToOneFormat } from "../utils/datesHandlers";
import errorImage from "../assets/images/error.png";
import { maxRange } from "../utils/datesHandlers";
const defaultPage = 1;
const perPage = 10;

const TeamCalendar = () => {
  const { id } = useParams();
  const [breadCrumbs, setBreadCrumbs] = useState([]);
  const [paginatedMatches, setPaginatedMatches] = useState([]);
  const [resultMatches, setResultMatches] = useState([]);
  const [error, setError] = useState("");
  const [errorDates, setErrorDates] = useState("");
  const [totalRecords, setTotalRecords] = useState(null);
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dateTo, setDateTo] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dates, setDates] = useState({});

  useEffect(getMatches, [id]);

  function getMatches() {
    ApiFootballData.teams("matches", { team_id: id })
      .then((response) => {
        setResultMatches(response.matches);
        setPaginatedMatches(response.matches.slice(0, perPage));
        setTotalRecords(response.matches.length);
        setDates({
          defaultFrom: response?.matches[0].utcDate,
          defaultTo: response?.matches[response.matches.length - 1].utcDate,
        });
      })
      .catch((error) => {
        setError("Нет информации о доступных матчах");
        console.log(error);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }

  /* Pagination Logic */

  const handlePageChange = (page) => {
    setPaginatedMatches(paginate(resultMatches, page, perPage));
    setCurrentPage(page);
  };

  /* Breadcrumbs */

  useEffect(getBreadCrumbs, [id]);

  function getBreadCrumbs() {
    ApiFootballData.teams("breadcrumbs", { id: id })
      .then((response) => {
        setBreadCrumbs([
          { name: "Команды", url: "/teams" },
          { name: response.name, url: false },
        ]);
      })
      .catch(() => {
        console.log(error);
      });
  }

  /* Date Filter Handler */

  const clearFilters = () => {
    setErrorDates("");
    setDateFrom(convertToUTCdate(dates.defaultFrom));
    setDateTo(convertToUTCdate(dates.defaultTo));
  };

  const handleDateFilterSubmit = (date) => {
    setErrorDates("");

    if (!date.dateFrom && date.dateTo) {
      console.log("empty from");
      setErrorDates("Определите точную дату начала периода");
    } else if (date.dateFrom && !date.dateTo) {
      console.log("empty to");
      setErrorDates("Определите точную дату конца периода");
    } else {
      switch (true) {
        case isNaN(Date.parse(date.dateFrom)) || isNaN(Date.parse(date.dateTo)):
          setErrorDates("Проверьте правильность данных");
          break;
        case maxRange(date.dateFrom, date.dateTo) > 750:
          setErrorDates("Указанный период не должен превышать 750 дней");
          break;
        case convertToOneFormat(date.dateFrom) >
          convertToOneFormat(date.dateTo):
          setErrorDates("Конец периода не может быть раньше начала периода");
          break;
        default:
          setDateFrom(date.dateFrom);
          setDateTo(date.dateTo);
          break;
      }
    }
  };

  useEffect(handleDateFilter, [dateFrom, dateTo]);

  function handleDateFilter() {
    if (dateTo && dateFrom) {
      ApiFootballData.teams("dates", {
        team_id: id,
        dateFrom: dateFrom,
        dateTo: dateTo,
      })
        .then((response) => {
          const filteredMatches = response.matches;
          setCurrentPage(defaultPage);
          setResultMatches(filteredMatches);
          setPaginatedMatches(paginate(filteredMatches, defaultPage, perPage));
          setTotalRecords(filteredMatches.length);
        })
        .catch((error) => {
          setError("Ошибка. Повторите попытку позже.");
          console.log(error);
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
        <DateFilter
          onDateFilterSubmit={handleDateFilterSubmit}
          validationError={errorDates}
          onClearFilters={clearFilters}
          dates={dates}
        />
        <Breadcrumbs breadCrumbs={breadCrumbs} />
        <h1 className="pt-1 pb-1">Календарь Команды</h1>
        {paginatedMatches.length > 0 ? (
          <Table matches={paginatedMatches} />
        ) : (
          <div className="text-center pb-2">
            Матчей на заданные даты не найдено.
          </div>
        )}
        {paginatedMatches.length > 0 && (
          <Pagination
            perPage={perPage}
            currentPage={currentPage}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    );
  }
};

export default TeamCalendar;
