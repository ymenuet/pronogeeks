import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Loader, ErrorMessage, GeekProno } from '..';
import fixtureWinners from '../../utils/constants/fixtureWinners';
import { printFixtureStatus } from '../../utils/helpers';
import {
  useGeekLeague,
  useGeekLeagueHistory,
  useGeeksFixturePronos,
  useFixtureWinner,
} from '../../utils/hooks';
import { CloseIcon } from '../Icons';
import { preferredSeasonGeekleague } from '../../utils/classes/localStorage';
import './viewGeekLeaguePronos.css';
import { FixtureModel } from '../../utils/models';

const applyWinnerClass = (winner, row) => (winner === row ? 'right-prono exact-prono' : '');

const ViewGeekLeaguePronos = ({ fixture, setShowLeagues }) => {
  const { geekLeagueHistoryID, user } = useGeekLeagueHistory(fixture.season);
  const [geekLeagueID, setGeekLeagueID] = useState(geekLeagueHistoryID);
  useEffect(() => {
    setGeekLeagueID(geekLeagueHistoryID);
  }, [geekLeagueHistoryID]);

  const { geekLeague, errorGeekLeague } = useGeekLeague(geekLeagueID);

  const { geeksPronos, setGeeksPronos, errorPronos } = useGeeksFixturePronos(fixture, geekLeague);

  const winner = useFixtureWinner(fixture);

  const changeLeague = async (e) => {
    const newGeekLeagueID = e.target.value;
    setGeeksPronos(null);
    setGeekLeagueID(newGeekLeagueID);
    preferredSeasonGeekleague.set(newGeekLeagueID, fixture.season);
  };

  return (
    <div className="view-pronos">
      <div className="view-pronos-header row">
        {/* eslint-disable-next-line */}
        <span onClick={() => setShowLeagues(false)}>
          <CloseIcon color="rgb(4, 78, 199)" size="30px" />
        </span>

        <div className="view-pronos-choose-league col-12 col-md-4">
          <p>Choisis une ligue :&nbsp;</p>

          <div>
            <select
              defaultValue={geekLeagueHistoryID}
              onChange={changeLeague}
              value={geekLeague?._id}
            >
              {user.geekLeagues.map((oneGeekleague) => {
                if (oneGeekleague.season === fixture.season)
                  return (
                    <option key={oneGeekleague._id} value={oneGeekleague._id}>
                      {oneGeekleague.name}
                    </option>
                  );
                return null;
              })}
            </select>

            <p className="link-to-ranking-matchweek">
              <Link
                to={`/myGeekleagues/${geekLeague?._id}/season/${fixture.season}/${fixture.matchweek}`}
              >
                Classement ligue
              </Link>
            </p>
          </div>
        </div>

        <div className="view-pronos-game-info col-12 col-md-8">
          <table>
            <thead>
              <tr>
                <th>
                  <img src={fixture.homeTeam.logo} alt="logo" className="team-logo" />
                </th>
                <th className="score-fixture">
                  {fixture.goalsHomeTeam} - {fixture.goalsAwayTeam}
                </th>
                <th>
                  <img src={fixture.awayTeam.logo} alt="logo" className="team-logo" />
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="team-names">
                <td className="team-name">{fixture.homeTeam.name}</td>
                <td className="fixture-status">
                  {(fixture.timeElapsed || fixture.statusShort === 'PST') &&
                    printFixtureStatus(fixture.statusShort, fixture.timeElapsed)}
                </td>
                <td className="team-name">{fixture.awayTeam.name}</td>
              </tr>

              <tr>
                <td className={applyWinnerClass(winner, fixtureWinners.HOME)}>
                  {fixture.oddsWinHome}
                </td>
                <td className={applyWinnerClass(winner, fixtureWinners.DRAW)}>
                  {fixture.oddsDraw}
                </td>
                <td className={applyWinnerClass(winner, fixtureWinners.AWAY)}>
                  {fixture.oddsWinAway}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        className={`${
          !geeksPronos || errorGeekLeague || errorPronos ? 'align-items-center' : ''
        } view-pronos-body`}
      >
        {(errorGeekLeague || errorPronos) && (
          <ErrorMessage>{errorGeekLeague || errorPronos}</ErrorMessage>
        )}

        {!errorGeekLeague && !errorPronos && !geeksPronos && (
          <Loader size="small" tip="Chargement des pronos..." fontSize="2.4rem" container={false} />
        )}

        {!errorGeekLeague && !errorPronos && geeksPronos && (
          <ul>
            {geeksPronos.map((prono) => (
              <GeekProno key={prono._id} pronogeek={prono} fixture={fixture} winner={winner} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

ViewGeekLeaguePronos.propTypes = {
  fixture: FixtureModel.isRequired,
  setShowLeagues: PropTypes.func.isRequired,
};

export default ViewGeekLeaguePronos;
