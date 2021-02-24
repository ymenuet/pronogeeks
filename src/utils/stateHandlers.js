import {
    isEmpty
} from "./functions"

export const handleStateWithoutId = ({
    reducerData,
    action,
    setResult,
    setError
}) => {
    const result = reducerData
    if (isEmpty(result)) action()
    else if (result.error) setError(result.error)
    else if (!result.loading) setResult(result)
}

export const handleStateWithId = ({
    id,
    reducerData,
    action,
    setResult,
    setError
}) => {
    const result = reducerData[id]
    if (!result) action(id)
    else if (result.error) setError(result.error)
    else if (!result.loading) setResult(result)
}

export const handleStateWith2Ids = ({
    id1,
    id2,
    reducerData,
    action,
    setResult,
    setError
}) => {
    const result = reducerData[`${id1}-${id2}`]
    if (!result) action(id1, id2)
    else if (result.error) setError(result.error)
    else if (!result.loading) setResult(result)
}

export const handleStateMatchweekFixtures = ({
    season,
    matchweekNumber,
    seasonMatchweeks,
    loadingSeason,
    getMatchweekFixtures,
    setFixtures,
    setMatchweekStarted,
    setTotalGames,
    setGamesFinished
}) => {
    if (season) {

        const matchweekDetails = seasonMatchweeks[`${season._id}-${matchweekNumber}`]

        if (!matchweekDetails && !loadingSeason) getMatchweekFixtures(season, matchweekNumber)

        else if (matchweekDetails) {
            if (setFixtures) setFixtures(matchweekDetails.fixtures)

            if (setMatchweekStarted) setMatchweekStarted(matchweekDetails.hasStarted)

            if (setTotalGames) setTotalGames(matchweekDetails.totalGames)

            if (setGamesFinished) setGamesFinished(matchweekDetails.gamesFinished)
        }
    }

}