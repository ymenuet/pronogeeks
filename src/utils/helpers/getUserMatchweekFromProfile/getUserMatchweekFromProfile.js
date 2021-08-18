export default (userSeason, matchweekNumber) =>
  userSeason?.matchweeks?.find(
    (matchweek) => matchweek.number.toString() === matchweekNumber.toString()
  );
