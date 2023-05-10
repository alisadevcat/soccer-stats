import React, { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const TeamCardInner = ({ team }) => {
  return (
    <div className="card">
      <Link to={`/teams/${team.id}`}>
        <div>
          {team.name && <p className="pb-1">Команда: {team.name}</p>}
          {team.crestUrl && (
            <figure>
              <img src={team.crestUrl} alt={team.name} width="96" height="96" />
            </figure>
          )}
        </div>
      </Link>
    </div>
  );
};

TeamCardInner.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    crestUrl: PropTypes.string,
  }),
};

export const TeamCard = memo(TeamCardInner);
