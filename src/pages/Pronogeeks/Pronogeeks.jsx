import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Fixture,
  Loader,
  MatchweekNavigation,
  PronosAdminButtons,
  RulesProno,
  InputMatchweek,
  ErrorMessage,
} from '../../components';
import {
  useSeason,
  useUserMatchweek,
  useConditionalFixturesUpdate,
  useMatchweekFixtures,
  useUserPronogeeks,
  useApiFootballNotification,
} from '../../utils/hooks';
import { resetMatchweekInput } from '../../utils/helpers';
import { QuestionIcon, SaveIcon, RankingIcon, ValidateIcon } from '../../components/Icons';
import { saveAllPronogeeks } from '../../state/actions/pronogeekActions';
import './pronogeeks.css';

const Pronogeeks = ({ loading }) => {
  const { matchweekNumber, seasonID } = useParams();
  const history = useHistory();

  const [showRules, setShowRules] = useState(false);
  const [showLeaguePronos, setShowLeaguePronos] = useState(false);
  const [matchweekFromInput, setMatchweekFromInput] = useState(matchweekNumber);

  const { season, errorSeason } = useSeason(seasonID);

  const { matchweekPoints, matchweekBonus, matchweekCorrects, newSeason } = useUserMatchweek({
    seasonID,
    matchweekNumber,
    history,
  });

  const { fixtures, gamesFinished } = useMatchweekFixtures(season, matchweekNumber);

  const { modifiedTotal, savingAll, saveAllSuccess, errorProno } = useUserPronogeeks(
    seasonID,
    matchweekNumber
  );

  const { lastScoresUpdated, lastOddsUpdated } = useConditionalFixturesUpdate({
    seasonID,
    matchweekNumber,
    fixtures,
    newSeason,
  });

  useApiFootballNotification();

  const dispatch = useDispatch();

  const changeMatchweek = (matchweek) => {
    history.push(`/pronogeeks/${seasonID}/matchweek/${matchweek}`);
  };

  const previousPage = () => {
    changeMatchweek(parseInt(matchweekNumber) - 1);
  };

  const nextPage = () => {
    changeMatchweek(parseInt(matchweekNumber) + 1);
  };

  if (errorSeason)
    return (
      <div className="pronogeeks-bg">
        <ErrorMessage>{errorSeason}</ErrorMessage>
      </div>
    );

  if (!fixtures || !season || loading || newSeason)
    return (
      <div className="pronogeeks-bg">
        <Loader color="rgb(4, 78, 199)" />
      </div>
    );

  return (
    <div
      className="pronogeeks-bg matchweek-page offset-for-btn"
      aria-hidden="true"
      onClick={(e) =>
        resetMatchweekInput(e, matchweekFromInput, matchweekNumber, setMatchweekFromInput)
      }
    >
      <div className="go-to-ranking">
        <Link
          className="btn my-btn go-to-ranking-btn"
          to={`/ranking/season/${seasonID}/${matchweekNumber}`}
        >
          <RankingIcon size="40px" />
          &nbsp;
          <span>
            {season.provRankingOpen
              ? 'Faire classement prévisionnel'
              : `Classement ${season.leagueName}`}
          </span>
        </Link>

        <div className="go-to-ranking-info">
          <p>
            {season.provRankingOpen
              ? 'Faire mon classement prévisionnel'
              : `Voir le classement de ${season.leagueName}`}
            .
          </p>
        </div>
      </div>

      <div className="save-all">
        <button
          onClick={() => dispatch(saveAllPronogeeks(seasonID, matchweekNumber, fixtures))}
          className={`btn my-btn save-all-btn ${saveAllSuccess ? 'all-saved' : ''}`}
          disabled={savingAll}
          type="button"
        >
          {modifiedTotal > 0 && (
            <small className="pronos-to-save large-screen-icon">{modifiedTotal}</small>
          )}
          {savingAll && (
            <Loader tip="" fontSize="2.2rem" container={false} className="saving-all-loader" />
          )}
          {saveAllSuccess && <ValidateIcon size="40px" />}
          {!savingAll && !saveAllSuccess && <SaveIcon size="40px" />}
          &nbsp;
          <span>
            {modifiedTotal > 0 && <small className="pronos-to-save">{modifiedTotal}</small>}
            {savingAll && 'Enregistrement...'}
            {saveAllSuccess && 'Enregistré'}
            {!savingAll && !saveAllSuccess && 'Enregistrer tout'}
          </span>
        </button>

        <div className="save-all-info">
          <p>Enregistrer tous les pronos de la journée.</p>
        </div>
      </div>

      <PronosAdminButtons seasonID={seasonID} matchweekNumber={matchweekNumber} />

      <h2>
        <QuestionIcon onClick={() => setShowRules(!showRules)} />
        {season.leagueName} saison {season.year} :<br />
        journée{' '}
        <InputMatchweek
          matchweekInit={matchweekNumber}
          matchweekFromInput={matchweekFromInput}
          setMatchweekFromInput={setMatchweekFromInput}
          changeMatchweek={changeMatchweek}
          lastMatchweek={38}
          backgroundColor="rgb(4, 78, 199)"
          fontSize="2rem"
        />
      </h2>

      <ul
        onClick={() => setShowRules(false)}
        aria-hidden="true"
        className="list-group list-group-flush list-fixtures col-10 offset-1 col-md-8 offset-md-2 col-xl-6 offset-xl-3"
      >
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
            <Fixture
              fixture={fixture}
              showLeaguePronos={showLeaguePronos}
              setShowLeaguePronos={setShowLeaguePronos}
              errorProno={errorProno}
              savingAll={savingAll}
            />
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

      <PronosAdminButtons seasonID={seasonID} matchweekNumber={matchweekNumber} />

      {showRules && (
        <div className="rules-box">
          <RulesProno
            setShowRules={setShowRules}
            lastScoresUpdated={lastScoresUpdated}
            lastOddsUpdated={lastOddsUpdated}
            season={season}
          />
        </div>
      )}
    </div>
  );
};

Pronogeeks.defaultProps = {
  loading: false,
};

Pronogeeks.propTypes = {
  loading: PropTypes.bool,
};

export default Pronogeeks;
