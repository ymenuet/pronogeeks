export const getSeasonID = (season) =>
  (season.season._id ? season.season._id : season.season).toString();

export default (user, seasonID) => {
  const seasonFiltered = user.seasons.filter(
    (season) => getSeasonID(season) === seasonID.toString()
  );
  if (seasonFiltered.length > 0) return seasonFiltered[0];
  return null;
};
