export default (goalsHome, goalsAway) => goalsHome > goalsAway ? 'Home' :
    goalsHome < goalsAway ? 'Away' :
    'Draw'