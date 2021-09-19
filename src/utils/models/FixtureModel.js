import PropTypes from 'prop-types';

import {
  LIST_OF_ALL_FIXTURE_LONG_STATUSES,
  LIST_OF_ALL_FIXTURE_SHORT_STATUSES,
} from '../constants/fixtureStatuses';
import TeamModel from './TeamModel';

export default PropTypes.shape({
  _id: PropTypes.string,
  season: PropTypes.string,
  matchweek: PropTypes.number,
  date: PropTypes.string,
  venue: PropTypes.string,
  timeElapsed: PropTypes.number,
  homeTeam: PropTypes.oneOfType([TeamModel, PropTypes.string]),
  awayTeam: PropTypes.oneOfType([TeamModel, PropTypes.string]),
  goalsHomeTeam: PropTypes.number,
  goalsAwayTeam: PropTypes.number,
  winner: PropTypes.string,
  status: PropTypes.oneOf(LIST_OF_ALL_FIXTURE_LONG_STATUSES),
  statusShort: PropTypes.oneOf(LIST_OF_ALL_FIXTURE_SHORT_STATUSES),
  oddsWinHome: PropTypes.number,
  oddsDraw: PropTypes.number,
  oddsWinAway: PropTypes.number,
  lastScoreUpdate: PropTypes.string,
  lastOddsUpdate: PropTypes.string,
});
