import PropTypes from 'prop-types';

export default PropTypes.shape({
  name: PropTypes.string,
  code: PropTypes.string,
  stadium: PropTypes.string,
  country: PropTypes.string,
  logo: PropTypes.string,
  season: PropTypes.string,
  rank: PropTypes.number,
  points: PropTypes.number,
  goalsDiff: PropTypes.number,
  matchsPlayed: PropTypes.number,
  win: PropTypes.number,
  draw: PropTypes.number,
  lose: PropTypes.number,
  goalsFor: PropTypes.number,
  goalsAgainst: PropTypes.number,
});
