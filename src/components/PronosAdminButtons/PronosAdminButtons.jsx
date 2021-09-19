import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { useUser } from '../../utils/hooks';
import './pronosAdminButtons.css';

import { updateFixturesStatus, updateOdds } from '../../state/actions/apiFootballActions';

const PronosAdminButtons = ({ seasonID, matchweekNumber }) => {
  const { user } = useUser();

  const loadingApi = useSelector(({ apiFootballReducer }) => apiFootballReducer.loading);

  const dispatch = useDispatch();

  return (
    user.role === 'GEEK ADMIN' && (
      <div>
        <button
          className="btn my-btn admin-btn top"
          onClick={() => dispatch(updateFixturesStatus(seasonID, matchweekNumber))}
          disabled={loadingApi}
          type="button"
        >
          Actualiser les scores
        </button>

        <button
          className="btn my-btn admin-btn top"
          onClick={() => dispatch(updateOdds(seasonID, matchweekNumber))}
          disabled={loadingApi}
          type="button"
        >
          Actualiser les cotes
        </button>
      </div>
    )
  );
};

PronosAdminButtons.propTypes = {
  seasonID: PropTypes.string.isRequired,
  matchweekNumber: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default PronosAdminButtons;
