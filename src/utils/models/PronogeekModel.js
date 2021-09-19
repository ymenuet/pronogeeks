import PropTypes from 'prop-types';

import UserModel from './UserModel';

export default PropTypes.shape({
  _id: PropTypes.string,
  geek: PropTypes.oneOfType([UserModel, PropTypes.string]),
  matchweek: PropTypes.number,
  season: PropTypes.string,
  fixture: PropTypes.string,
  homePromo: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  awayProno: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  winner: PropTypes.string,
  correct: PropTypes.bool,
  exact: PropTypes.bool,
  bonusFavTeam: PropTypes.bool,
  addedToProfile: PropTypes.bool,
  points: PropTypes.number,
});
