import React from 'react';
import { ErrorMessage, GeekFixture, Loader, MatchweekNavigation } from '../../components';
import {
  useSeason,
  useMatchweekFixtures,
  useGeekInfo,
  useGeekMatchweekPronos,
  useGeekMatchweekPoints,
} from '../../utils/hooks';
import './pronogeeks.css';

const GeekMatchweek = ({
  match: {
    params: { matchweekNumber, seasonID, geekID },
  },
  history,
  loading,
}) => {
  const { season, errorSeason } = useSeason(seasonID);

  const { fixtures, matchweekStarted, gamesFinished } = useMatchweekFixtures(
    season,
    matchweekNumber
  );

  const { geek, errorGeek } = useGeekInfo(geekID);

  const { matchweekPoints, matchweekBonus, matchweekCorrects, noPronogeeks } =
    useGeekMatchweekPoints(geek, seasonID, matchweekNumber);

  useGeekMatchweekPronos(geekID, seasonID, matchweekNumber);

  const previousPage = () => {
    history.push(
      `/geek/${geekID}/pronogeeks/${seasonID}/matchweek/${parseInt(matchweekNumber) - 1}`
    );
  };

  const nextPage = () => {
    history.push(
      `/geek/${geekID}/pronogeeks/${seasonID}/matchweek/${parseInt(matchweekNumber) + 1}`
    );
  };

  return loading || !season || !fixtures || !geek ? (
    <div className="pronogeeks-bg">
      {errorSeason || errorGeek ? (
        <ErrorMessage>{errorSeason || errorGeek}</ErrorMessage>
      ) : (
        <Loader color="rgb(4, 78, 199)" />
      )}
    </div>
  ) : (
    <div className="pronogeeks-bg matchweek-page">
      <h2>
        {season.leagueName} saison {season.year} :<br />
        Pronos de {geek.username} J{matchweekNumber}
      </h2>

      {!matchweekStarted || noPronogeeks ? (
        <>
          <ul className="list-group list-group-flush list-fixtures col-10 offset-1 col-md-8 offset-md-2 col-xl-6 offset-xl-3">
            <MatchweekNavigation
              matchweekNumber={matchweekNumber}
              previousPage={previousPage}
              nextPage={nextPage}
              noPronos
            />
          </ul>

          <h4 className="not-accessible">Les pronos de {geek.username} ne sont pas accessibles.</h4>
        </>
      ) : (
        <ul className="list-group list-group-flush list-fixtures col-10 offset-1 col-md-8 offset-md-2 col-xl-6 offset-xl-3">
          <MatchweekNavigation
            matchweekNumber={matchweekNumber}
            matchweekPoints={matchweekPoints}
            matchweekCorrects={matchweekCorrects}
            gamesFinished={gamesFinished}
            matchweekBonus={matchweekBonus}
            previousPage={previousPage}
            nextPage={nextPage}
            myClassName="score-top"
          />

          <div className="list-fixtures-header">
            <div className="header-title">Domicile</div>
            <div>|</div>
            <div className="header-title">Extérieur</div>
          </div>

          {fixtures.map((fixture) => (
            <li className="list-group-item" key={fixture._id} style={{ background: 'none' }}>
              <GeekFixture fixture={fixture} geek={geek} />
            </li>
          ))}

          <MatchweekNavigation
            matchweekNumber={matchweekNumber}
            matchweekPoints={matchweekPoints}
            matchweekCorrects={matchweekCorrects}
            gamesFinished={gamesFinished}
            matchweekBonus={matchweekBonus}
            previousPage={previousPage}
            nextPage={nextPage}
            myClassName="score-bottom"
          />
        </ul>
      )}
    </div>
  );
};

export default GeekMatchweek;
