import PropTypes from 'prop-types';

import { LIST_OF_ALL_USER_ROLES } from '../constants/userRoles';
import PronogeekModel from './PronogeekModel';
import SeasonModel from './SeasonModel';
import TeamModel from './TeamModel';

export const ProvRankingDetailsModel = PropTypes.shape({
  withoutBonus: PropTypes.number,
  comboBonus: PropTypes.number,
  favTeamBonus: PropTypes.number,
  total: PropTypes.number,
  addedToProfile: PropTypes.bool,
});

export const UserMatchweekModel = PropTypes.shape({
  pronogeeks: PropTypes.arrayOf(PropTypes.oneOfType([PronogeekModel, PropTypes.string])),
  number: PropTypes.number,
  points: PropTypes.number,
  numberCorrects: PropTypes.number,
  numberExacts: PropTypes.number,
  bonusFavTeam: PropTypes.bool,
  bonusPoints: PropTypes.number,
  totalPoints: PropTypes.number,
});

export const UserSeasonModel = PropTypes.shape({
  season: PropTypes.oneOfType([SeasonModel, PropTypes.string]),
  totalPoints: PropTypes.number,
  numberCorrects: PropTypes.number,
  numberExacts: PropTypes.number,
  bonusFavTeam: PropTypes.number,
  provisionalRanking: PropTypes.arrayOf(PropTypes.oneOfType([TeamModel, PropTypes.string])),
  provRankingPointDetails: ProvRankingDetailsModel,
  provRankingTotalPoints: PropTypes.number,
  pointsWithoutProvRanking: PropTypes.number,
  favTeam: PropTypes.oneOfType([TeamModel, PropTypes.string]),
  matchweeks: PropTypes.arrayOf(UserMatchweekModel),
});

export default PropTypes.shape({
  _id: PropTypes.string,
  username: PropTypes.string,
  confirmed: PropTypes.bool,
  role: PropTypes.oneOf(LIST_OF_ALL_USER_ROLES),
  photo: PropTypes.string,
  renewToken: PropTypes.string,
  // TODO: Make local GeekLeagueModel
  geekLeagues: PropTypes.arrayOf(PropTypes.shape({})),
  friends: PropTypes.arrayOf(PropTypes.string),
  seasons: PropTypes.arrayOf(UserSeasonModel),
});
