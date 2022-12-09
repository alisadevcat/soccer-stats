import React, { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CompetitionCardInner = ({ competition }) => {
  return (
    <div className="card competition-card">
      <Link to={`/competitions/${competition.id}`}>
        <div className="card-content">
          {competition.name && (
            <p className="card-title">Лига: {competition.name}</p>
          )}
          {competition.area && (
            <p className="card-subtitle">Страна: {competition.area}</p>
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
