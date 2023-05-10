import React, { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CompetitionCardInner = ({ competition }) => {
  return (
    <div className="card">
      <Link to={`/competitions/${competition.id}`}>
        <div>
          {competition.name && (
            <p>Лига: {competition.name}</p>
          )}
          {competition.area && (
            <p>Страна: {competition.area}</p>
          )}
        </div>
      </Link>
    </div>
  );
};

CompetitionCardInner.propTypes = {
  competition: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    area: PropTypes.string,
  }),
};

export const CompetitionCard = memo(CompetitionCardInner);
