import matchStatuses from '../../models/matchStatuses';

export default (fixture) => {
  let result = true;
  if (
    fixture &&
    (new Date(fixture.date) > Date.now() || fixture.statusShort === matchStatuses.POSTPONED)
  )
    result = false;
  return result;
};
