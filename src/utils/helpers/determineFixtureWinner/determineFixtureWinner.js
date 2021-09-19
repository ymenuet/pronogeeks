import fixtureWinners from '../../constants/fixtureWinners';

export default (goalsHome, goalsAway) => {
  if (goalsHome > goalsAway) return fixtureWinners.HOME;
  if (goalsHome < goalsAway) return fixtureWinners.AWAY;
  return fixtureWinners.DRAW;
};
