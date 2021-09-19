import PropTypes from 'prop-types';

import { LIST_OF_ALL_SEASON_STATUSES } from '../constants/seasonStatuses';
import { LIST_OF_ALL_SEASON_TYPES } from '../constants/seasonTypes';
import FixtureModel from './FixtureModel';
import TeamModel from './TeamModel';

export default PropTypes.shape({
  _id: PropTypes.string,
  year: PropTypes.number,
  leagueName: PropTypes.string,
  type: PropTypes.oneOf(LIST_OF_ALL_SEASON_TYPES),
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  country: PropTypes.string,
  countryCode: PropTypes.string,
  logo: PropTypes.string,
  flag: PropTypes.string,
  provRankingOpen: PropTypes.bool,
  fixtures: PropTypes.arrayOf(PropTypes.oneOfType([FixtureModel, PropTypes.string])),
  status: PropTypes.oneOf(LIST_OF_ALL_SEASON_STATUSES),
  rankedTeams: PropTypes.arrayOf(PropTypes.oneOfType([TeamModel, PropTypes.string])),
});
