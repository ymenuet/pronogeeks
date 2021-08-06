import { getUserSeasonFromProfile } from '..';

export default (user, seasonID) => {
  const userSeason = getUserSeasonFromProfile(user, seasonID);
  if (userSeason) return userSeason.favTeam;
  return null;
};
