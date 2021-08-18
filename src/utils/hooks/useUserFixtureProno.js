import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const useUserFixtureProno = (fixture) => {
  const [pronogeek, setPronogeek] = useState(null);
  const [homeScore, setHomeScore] = useState(null);
  const [awayScore, setAwayScore] = useState(null);
  const [modified, setModified] = useState(false);

  const { userPronogeeks } = useSelector(({ pronogeekReducer }) => pronogeekReducer);

  useEffect(() => {
    let userPronogeek = {
      homeProno: '',
      awayProno: '',
    };

    if (fixture) {
      const { _id, season, matchweek } = fixture;

      const userMatchweekPronogeeks = userPronogeeks[`${season}-${matchweek}`];

      if (userMatchweekPronogeeks && userMatchweekPronogeeks[_id])
        userPronogeek = userMatchweekPronogeeks[_id];
    }

    setPronogeek(userPronogeek);
    setHomeScore(parseInt(userPronogeek.homeProno) >= 0 ? userPronogeek.homeProno : '');
    setAwayScore(parseInt(userPronogeek.awayProno) >= 0 ? userPronogeek.awayProno : '');
    setModified(!!userPronogeek.modified);
  }, [fixture, userPronogeeks]);

  return {
    pronogeek,
    homeScore,
    awayScore,
    modified,
  };
};
