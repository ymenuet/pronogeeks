import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './inputMatchweek.css';

const InputMatchweek = ({
  matchweekInit,
  matchweekFromInput,
  setMatchweekFromInput,
  changeMatchweek,
  lastMatchweek,
  backgroundColor,
  fontSize,
}) => {
  useEffect(() => {
    setMatchweekFromInput(matchweekInit);
  }, [matchweekInit, setMatchweekFromInput]);

  const confirmMatchweek = (e) => {
    e.preventDefault();
    if (matchweekFromInput === matchweekInit) return;
    changeMatchweek(matchweekFromInput);
  };

  const handleInput = (e) => {
    setMatchweekFromInput(e.target.value);
  };

  return matchweekFromInput || parseInt(matchweekFromInput) === 0 || matchweekFromInput === '' ? (
    <form className="input-matchweek-container cancel-target" onSubmit={confirmMatchweek}>
      <input
        className="input-matchweek cancel-target"
        value={matchweekFromInput}
        onChange={handleInput}
        type="number"
        min="1"
        max={lastMatchweek}
        style={{ backgroundColor, fontSize }}
      />
      <button className="button-input-matchweek cancel-target" type="submit">
        <span className="cancel-target" style={{ color: backgroundColor }}>
          OK
        </span>
      </button>
    </form>
  ) : null;
};

InputMatchweek.defaultProps = {
  matchweekFromInput: undefined,
  lastMatchweek: undefined,
  backgroundColor: undefined,
  fontSize: undefined,
};

InputMatchweek.propTypes = {
  matchweekInit: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  matchweekFromInput: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setMatchweekFromInput: PropTypes.func.isRequired,
  changeMatchweek: PropTypes.func.isRequired,
  lastMatchweek: PropTypes.number,
  backgroundColor: PropTypes.string,
  fontSize: PropTypes.string,
};

export default InputMatchweek;
