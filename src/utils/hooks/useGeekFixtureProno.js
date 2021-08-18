import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useGeekFixtureProno = (fixture, geek) => {
  const [pronogeek, setPronogeek] = useState(null);
  const [homeScore, setHomeScore] = useState(null);
  const [awayScore, setAwayScore] = useState(null);
  const [errorProno, setErrorProno] = useState(null);

  const geeksMatchweekPronogeeks = useSelector(
    ({ pronogeekReducer }) => pronogeekReducer.geeksMatchweekPronogeeks
  );

  useEffect(() => {
    let userPronogeek = {
      homeProno: '',
      awayProno: '',
    };
    const { _id, season, matchweek } = fixture;

    const geekPronogeeks = geeksMatchweekPronogeeks[`${geek._id}-${season}-${matchweek}`];
    if (geekPronogeeks) {
      if (geekPronogeeks.error) setErrorProno(geekPronogeeks.error);

      if (geekPronogeeks[_id]) userPronogeek = geekPronogeeks[_id];
    }

    setPronogeek(userPronogeek);
    setHomeScore(userPronogeek.homeProno);
    setAwayScore(userPronogeek.awayProno);
  }, [fixture, geek, geeksMatchweekPronogeeks]);

  return {
    pronogeek,
    homeScore,
    awayScore,
    errorProno,
  };
};
