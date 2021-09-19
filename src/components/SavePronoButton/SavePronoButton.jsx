import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { SaveIcon, ValidateIcon, ViewPronoIcon } from '../Icons';
import { Loader } from '..';
import { useUser, useSaveOneProno } from '../../utils/hooks';
import { openNotification, hasMatchStarted } from '../../utils/helpers';
import './savePronoButton.css';
import { FixtureModel, PronogeekModel } from '../../utils/models';

import { savePronogeek } from '../../state/actions/pronogeekActions';

const SavePronoButton = ({
  pronogeek,
  fixture,
  modified,
  matchStarted,
  homeScore,
  awayScore,
  savingAll,
  seeLeaguePronos,
}) => {
  const { user } = useUser();

  const { saving, saveSuccess, setSaveSuccess } = useSaveOneProno(pronogeek, fixture);

  const dispatch = useDispatch();

  const disabled =
    matchStarted ||
    savingAll ||
    (!homeScore && parseInt(homeScore) !== 0) ||
    (!awayScore && parseInt(awayScore) !== 0);

  const saveProno = () => {
    setSaveSuccess(false);

    // Error message if someone takes out the "disabled" property of a passed game to change their pronostics
    if (hasMatchStarted(fixture))
      return openNotification(
        'error',
        'Erreur',
        'Ce match est déjà commencé ou fini. Tu ne peux plus changer ton prono.'
      );

    // Warning message if one of the inputs doesn't have a number
    if ((!homeScore && parseInt(homeScore) !== 0) || (!awayScore && parseInt(awayScore) !== 0))
      return openNotification(
        'warning',
        'Attention',
        `Tu n'as pas défini de score pour le match ${fixture.homeTeam.name} - ${fixture.awayTeam.name}. Prono non enregistré.`
      );

    dispatch(savePronogeek(homeScore, awayScore, fixture));
  };

  if (!matchStarted && saveSuccess)
    return (
      <>
        <small className="legend-save-btn">Prono enregistré</small>
        <button
          className="btn my-btn save-prono saved-prono"
          disabled={disabled}
          onClick={saveProno}
          type="button"
        >
          <ValidateIcon />
        </button>
      </>
    );

  if (!matchStarted)
    return (
      <>
        <small className="legend-save-btn">
          {saving ? 'Enregistrement...' : 'Enregistrer prono'}
        </small>
        <button
          className={`btn my-btn save-prono ${modified ? 'pending-save' : ''}`}
          disabled={disabled || saving}
          onClick={saveProno}
          type="button"
        >
          {!saving && <SaveIcon />}
          {saving && <Loader fontSize="1.5rem" tip="" container={false} />}
        </button>
      </>
    );

  if (matchStarted && !user.geekLeagues.length)
    return (
      <>
        <button className="btn my-btn save-prono" type="button" disabled>
          <SaveIcon />
        </button>
      </>
    );

  return (
    <>
      <small className="legend-save-btn">Voir pronos</small>
      <button className="btn my-btn save-prono" onClick={seeLeaguePronos} type="button">
        <ViewPronoIcon />
      </button>
    </>
  );
};

SavePronoButton.defaultProps = {
  modified: false,
  matchStarted: true,
  homeScore: undefined,
  awayScore: undefined,
  savingAll: false,
};

SavePronoButton.propTypes = {
  pronogeek: PronogeekModel.isRequired,
  fixture: FixtureModel.isRequired,
  modified: PropTypes.bool,
  matchStarted: PropTypes.bool,
  homeScore: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  awayScore: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  savingAll: PropTypes.bool,
  seeLeaguePronos: PropTypes.func.isRequired,
};

export default SavePronoButton;
