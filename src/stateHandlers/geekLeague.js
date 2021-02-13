export const readGeekLeagueState = ({
    geekLeagueID,
    geekleagues,
    getLeague,
    setGeekLeague
}) => {
    const geekleague = geekleagues[geekLeagueID]
    if (!geekleague) getLeague(geekLeagueID)
    else if (geekleague && !geekleague.loading) setGeekLeague(geekleague)
}