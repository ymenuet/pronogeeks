import { ADD_MATCHWEEK } from '../../types/seasonTypes';
import { SEASON_REDUCER_KEY, SEASON_MATCHWEEKS_KEY } from '../../reducers/keys/season';
import { copyReducer, isMatchFinished } from '../../../utils/helpers';

export default ({ fixtures, seasonID, matchweekNumber, dispatch, getState }) => {
  const matchweekFixtures = fixtures
    .filter((fixture) => `${fixture.matchweek}` === `${matchweekNumber}`)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const totalGames = matchweekFixtures.length;
  const gamesFinished = matchweekFixtures.filter((fixture) =>
    isMatchFinished(fixture.statusShort)
  ).length;
  const hasStarted = new Date(matchweekFixtures[0].date).getTime() <= Date.now();

  const newMatchweeks = copyReducer(getState, SEASON_REDUCER_KEY, SEASON_MATCHWEEKS_KEY);
  newMatchweeks[`${seasonID}-${matchweekNumber}`] = {
    totalGames,
    gamesFinished,
    hasStarted,
    fixtures: matchweekFixtures,
  };

  dispatch({
    type: ADD_MATCHWEEK,
    payload: newMatchweeks,
  });
};
