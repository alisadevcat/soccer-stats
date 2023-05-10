import React from "react";
import { setDateForOutput, setTimeForOutput } from "../../utils/datesHandlers";
import PropTypes from "prop-types";

//Отображаются значения только отличные от null
 const outputScoreIfNotNull = (score1, score2) => {
  if (score1 !== null || score2 !== null) {
    return (
      <td>
        {score1} : {score2}
      </td>
    );
  }
  return (<td> - </td>);
};


const MatchesTable = ({ matches }) => {
  return (
    <table>
      <thead>
        <tr>
          <th className="colored" rowSpan="2">
            Date
          </th>
          <th className="colored" rowSpan="2">
            Time
          </th>
          <th className="colored" rowSpan="2">
            Status
          </th>
          <th className="colored" rowSpan="2">
            Away Team - Home Team
          </th>
          <th colSpan="3" scope="colgroup" className="colored">
            Scores
          </th>
        </tr>
        <tr>
          <th scope="col" className="colored">
            FullTime Score
          </th>
          <th scope="col" className="colored">
            ExtraTime Score
          </th>
          <th scope="col" className="colored">
            Penalties Score
          </th>
        </tr>
      </thead>
      <tbody>
        {matches &&
          matches.map((item) => (
            <tr key={item.id}>
              <td scope="row">{setDateForOutput(item.utcDate)}</td>
              <td scope="row">{setTimeForOutput(item.utcDate)}</td>
              <td>{item.status}</td>
              <td>
                {item.homeTeam.name} - {item.awayTeam.name}
              </td>

              {outputScoreIfNotNull(
                item.score.fullTime.homeTeam,
                item.score.fullTime.awayTeam
              )}

              {outputScoreIfNotNull(
                item.score.extraTime.homeTeam,
                item.score.extraTime.awayTeam
              )}

              {outputScoreIfNotNull(
                item.score.penalties.homeTeam,
                item.score.penalties.awayTeam
              )}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

MatchesTable.propTypes = {
  matches: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      utcDate: PropTypes.string,
      status: PropTypes.string,
      awayTeam: PropTypes.shape({
        name: PropTypes.string,
      }),
      homeTeam: PropTypes.shape({
        name: PropTypes.string,
      }),
      score: PropTypes.object,
    })
  ),
};

export default MatchesTable;