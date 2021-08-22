import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Loader, InputMatchweek, RankGeeks, ErrorMessage } from '../../components';
import { resetMatchweekInput } from '../../utils/helpers';
import {
  useSeason,
  useMatchweekFixtures,
  useGeekLeague,
  useLastStartedMatchweek,
  useSoonerMatchweek,
} from '../../utils/hooks';
import { GoBackIcon, GoNextIcon } from '../../components/Icons';
import './detailGeekleague.css';

const GeekLeagueMatchweek = ({ loading }) => {
  const { geekLeagueID, seasonID, matchweekNumber } = useParams();

  const [matchweekFromInput, setMatchweekFromInput] = useState(matchweekNumber);

  const { season, errorSeason } = useSeason(seasonID);

  const { geekLeague, errorGeekLeague } = useGeekLeague(geekLeagueID);

  const lastMatchweek = useLastStartedMatchweek(season);

  const { matchweek, setMatchweek } = useSoonerMatchweek(matchweekNumber, lastMatchweek, season);

  const { totalGames, gamesFinished } = useMatchweekFixtures(season, matchweek);

  const previousMatchweek = () => {
    setMatchweek(matchweek - 1);
  };

  const nextMatchweek = () => {
    setMatchweek(matchweek + 1);
  };

  const changeMatchweek = (newMatchweek) => {
    setMatchweek(parseInt(newMatchweek));
  };

  return (
    <div
      className="geekleague-bg geekleague-details"
      aria-hidden="true"
      onClick={(e) => resetMatchweekInput(e, matchweekFromInput, matchweek, setMatchweekFromInput)}
    >
      {(errorGeekLeague || errorSeason) && (
        <ErrorMessage>{errorGeekLeague || errorSeason}</ErrorMessage>
      )}

      {!errorGeekLeague &&
        !errorSeason &&
        (loading || !geekLeague || !matchweek || !season || !lastMatchweek) && <Loader />}

      {!errorGeekLeague &&
        !errorSeason &&
        !loading &&
        geekLeague &&
        !!matchweek &&
        season &&
        lastMatchweek && (
          <div className="container">
            <div className="row">
              <div className="ranking-geekleague-matchweek-container col-10 offset-1 col-lg-6 offset-lg-3">
                <Link to={`/myGeekleagues/${geekLeagueID}`} className="return-button">
                  <GoBackIcon size="18px" />
                  &nbsp;Retour classement saison
                </Link>

                <h2>Classement {geekLeague.name}</h2>

                <div className="ranking-geekleague-matchweek">
                  <div>
                    <div className="previous-next-btns geekleague-btns">
                      {matchweek > 1 && (
                        <div>
                          <button className="btn my-btn" onClick={previousMatchweek} type="button">
                            <GoBackIcon />
                          </button>
                        </div>
                      )}

                      <h4>
                        J
                        <InputMatchweek
                          matchweekInit={matchweek}
                          matchweekFromInput={matchweekFromInput}
                          setMatchweekFromInput={setMatchweekFromInput}
                          changeMatchweek={changeMatchweek}
                          lastMatchweek={lastMatchweek}
                          backgroundColor="rgb(156, 0, 99)"
                        />{' '}
                        {season.leagueName} {season.year}
                        <br />
                        {gamesFinished === null || totalGames === null ? (
                          <small>
                            Match joués :&nbsp;&nbsp;
                            <Loader
                              size="small"
                              tip={null}
                              fontSize="1.2rem"
                              container={false}
                              style={{ display: 'inline' }}
                            />
                          </small>
                        ) : (
                          <small className="margin-small">
                            {gamesFinished === totalGames
                              ? 'Journée terminée'
                              : `Matchs joués : ${gamesFinished}/${totalGames}`}
                          </small>
                        )}
                      </h4>

                      {matchweek < lastMatchweek && (
                        <div>
                          <button className="btn my-btn" onClick={nextMatchweek} type="button">
                            <GoNextIcon />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <RankGeeks players={geekLeague.geeks} seasonID={seasonID} matchweek={matchweek} />
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

GeekLeagueMatchweek.defaultProps = {
  loading: false,
};

GeekLeagueMatchweek.propTypes = {
  loading: PropTypes.bool,
};

export default GeekLeagueMatchweek;
