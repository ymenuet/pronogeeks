import React from 'react';
import PropTypes from 'prop-types';

import { GoBackIcon, GoNextIcon } from '../Icons';
import './matchweekNavigation.css';

const MatchweekNavigation = ({
  matchweekNumber,
  matchweekPoints,
  matchweekCorrects,
  gamesFinished,
  matchweekBonus,
  previousPage,
  nextPage,
  myClassName,
  noPronos,
}) => {
  return (
    <div className="previous-next-btns">
      {parseInt(matchweekNumber) !== 1 && (
        <div>
          <button className="btn my-btn" onClick={previousPage} type="button">
            <GoBackIcon />
          </button>
        </div>
      )}

      {!noPronos && matchweekBonus > 0 && (
        <div className={myClassName}>
          <p>
            Total J{matchweekNumber} : {matchweekPoints} pts
            <br />
            dont {matchweekBonus} pts bonus ({matchweekCorrects || 0}/{gamesFinished})
          </p>
        </div>
      )}
      {!noPronos && !matchweekBonus && (
        <div className={myClassName}>
          <p>
            Total J{matchweekNumber} : {matchweekPoints} pts ({matchweekCorrects || 0}/
            {gamesFinished})
          </p>
        </div>
      )}

      {noPronos && (
        <div className="score-top">
          <p>Total J{matchweekNumber} : ? pts (?/10)</p>
        </div>
      )}

      {parseInt(matchweekNumber) !== 38 && (
        <div>
          <button className="btn my-btn" onClick={nextPage} type="button">
            <GoNextIcon />
          </button>
        </div>
      )}
    </div>
  );
};

MatchweekNavigation.defaultProps = {
  matchweekPoints: 0,
  matchweekCorrects: 0,
  gamesFinished: 0,
  matchweekBonus: undefined,
  myClassName: '',
  noPronos: false,
};

MatchweekNavigation.propTypes = {
  matchweekNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  matchweekPoints: PropTypes.number,
  matchweekCorrects: PropTypes.number,
  gamesFinished: PropTypes.number,
  matchweekBonus: PropTypes.number,
  previousPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  myClassName: PropTypes.string,
  noPronos: PropTypes.bool,
};

export default MatchweekNavigation;
