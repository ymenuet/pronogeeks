import React, { useState, useEffect } from 'react';
import { determineFixtureWinner } from '../../utils/helpers';
import './geekProno.css';

const GeekProno = ({ pronogeek, fixture, winner }) => {
  const [correct, setCorrect] = useState(false);
  const [exact, setExact] = useState(false);

  useEffect(() => {
    if (pronogeek) {
      const { homeProno, awayProno } = pronogeek;
      if ((homeProno || homeProno === 0) && (awayProno || awayProno === 0)) {
        const prono = determineFixtureWinner(homeProno, awayProno);
        if (winner === prono) setCorrect(true);
        const exact = fixture.goalsHomeTeam === homeProno && fixture.goalsAwayTeam === awayProno;
        if (exact) setExact(true);
      }
    }
  }, [pronogeek, fixture, winner]);

  return (
    <li
      className={`view-pronos-list-item ${correct ? 'right-prono' : 'wrong-prono'} ${
        exact ? 'exact-prono' : ''
      }`}
    >
      <div>
        <span>
          <img src={pronogeek.geek.photo} alt="Pic" />
        </span>
        <span>{pronogeek.geek.username}</span>
      </div>
      <div>
        <span>
          <img src={fixture.homeTeam.logo} alt="Home" />
        </span>
        <span>
          &nbsp;{pronogeek.homeProno} - {pronogeek.awayProno}&nbsp;
        </span>
        <span>
          <img src={fixture.awayTeam.logo} alt="Away" />
        </span>
      </div>
    </li>
  );
};

export default GeekProno;
