export default (goalsHome, goalsAway) => {
  if (goalsHome > goalsAway) return 'Home';
  if (goalsHome < goalsAway) return 'Away';
  return 'Draw';
};
