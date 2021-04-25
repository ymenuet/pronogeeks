import {
    ADD_MATCHWEEK
} from './reduxTypes/seasonTypes'
import {
    ADD_USER_PRONOGEEKS
} from './reduxTypes/pronogeekTypes'
import {
    SEASON_REDUCER_KEY,
    SEASON_MATCHWEEKS_KEY
} from '../utils/reducerKeys/season'
import {
    PRONOGEEK_REDUCER_KEY,
    USER_PRONOGEEKS_KEY
} from '../utils/reducerKeys/pronogeek'
import {
    copyReducer,
    openNotification,
    isMatchFinished,
} from './helpers'

export const rankGeeks = (players, seasonID, matchweekNumber = null) => {

    const geeks = JSON.parse(JSON.stringify(players))

    return geeks.sort((a, b) => {

        const creationUserA = a.createdAt
        const creationUserB = b.createdAt

        const sortGeeks = (results1, results2, matchweek = false) => {
            if (results2.totalPoints !== results1.totalPoints) return results2.totalPoints - results1.totalPoints
            else if (results2.numberCorrects !== results1.numberCorrects) return results2.numberCorrects - results1.numberCorrects
            else if (results2.numberExacts !== results1.numberExacts) return results2.numberExacts - results1.numberExacts
            else if (!matchweek && results2.bonusFavTeam !== results1.bonusFavTeam) return results2.bonusFavTeam - results1.bonusFavTeam
            else if (matchweek && results2.bonusFavTeam !== results1.bonusFavTeam) return results1.bonusFavTeam ? -1 : 1
            else if (creationUserA >= creationUserB) {
                a.tied = true
                return 1
            } else {
                b.tied = true
                return -1
            }
        }

        const seasonA = a.seasons.filter(seas => seas.season.toString() === seasonID.toString())
        const seasonB = b.seasons.filter(seas => seas.season.toString() === seasonID.toString())
        if (seasonA.length < 1) return 1
        if (seasonB.length < 1) return -1
        if (!matchweekNumber) return sortGeeks(seasonA[0], seasonB[0])

        else {
            if (!seasonA[0].matchweeks) return 1
            if (!seasonB[0].matchweeks) return -1
            const matchweekA = seasonA[0].matchweeks.filter(matchweek => matchweek.number.toString() === matchweekNumber.toString())
            const matchweekB = seasonB[0].matchweeks.filter(matchweek => matchweek.number.toString() === matchweekNumber.toString())
            if (matchweekA.length < 1) return 1
            if (matchweekB.length < 1) return -1
            return sortGeeks(matchweekA[0], matchweekB[0], true)
        }
    })
}

export const getSeasonID = (season) => (season.season._id ? season.season._id : season.season).toString()

export const getUserSeasonFromProfile = (user, seasonID) => {
    const seasonFiltered = user.seasons.filter(season => getSeasonID(season) === seasonID.toString())
    if (seasonFiltered.length > 0) return seasonFiltered[0]
    return null
}

export const getUserMatchweekFromProfile = (userSeason, matchweekNumber) => {
    let matchweekFiltered = null
    if (userSeason && userSeason.matchweeks) matchweekFiltered = userSeason.matchweeks.filter(matchweek => matchweek.number.toString() === matchweekNumber.toString())
    if (matchweekFiltered && matchweekFiltered.length > 0) matchweekFiltered = matchweekFiltered[0]
    return matchweekFiltered
}

export const getUserFavTeam = (user, seasonID) => {
    const userSeason = getUserSeasonFromProfile(user, seasonID)
    if (userSeason) return userSeason.favTeam
    return null
}

export const appendPhoto = (event, setFileName = null) => {
    let data = null
    if (event.target.files.length > 0) {
        const file = event.target.files[0]
        if (file.size > 1000000) openNotification('warning', 'Attention', 'La taille du fichier ne peux pas excéder 1Mo.')
        else if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') openNotification('warning', 'Attention', 'La photo doit être au format JPG ou PNG.')
        else {
            if (setFileName) setFileName(file.name)
            data = new FormData()
            data.append('file', file)
            data.append('upload_preset', 'pronogeeks')
        }
    }
    return data
}

export const sortByUsername = geeks => geeks.sort((a, b) => {
    const userA = a.username.toLowerCase()
    const userB = b.username.toLowerCase()
    if (userA >= userB) return 1
    else return -1
})

export const determineFixtureWinner = (goalsHome, goalsAway) => goalsHome > goalsAway ? 'Home' :
    goalsHome < goalsAway ? 'Away' :
    'Draw'

export const hasMatchStarted = fixture => {
    let result = true
    if (
        fixture &&
        (new Date(fixture.date) > Date.now() ||
            fixture.statusShort === 'PST')
    ) result = false
    return result
}

export const updateMatchweekFixtures = ({
    fixtures,
    seasonID,
    matchweekNumber,
    dispatch,
    getState,
}) => {
    const matchweekFixtures = fixtures
        .filter(fixture => `${fixture.matchweek}` === `${matchweekNumber}`)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const totalGames = matchweekFixtures.length
    const gamesFinished = matchweekFixtures.filter(fixture => isMatchFinished(fixture.statusShort)).length
    const hasStarted = new Date(matchweekFixtures[0].date).getTime() <= Date.now()

    const newMatchweeks = copyReducer(getState, SEASON_REDUCER_KEY, SEASON_MATCHWEEKS_KEY)
    newMatchweeks[`${seasonID}-${matchweekNumber}`] = {
        totalGames,
        gamesFinished,
        hasStarted,
        fixtures: matchweekFixtures
    }

    dispatch({
        type: ADD_MATCHWEEK,
        payload: newMatchweeks
    })
}

export const updateMatchweekPronogeeks = ({
    pronogeeks,
    seasonID,
    matchweekNumber,
    dispatch,
    getState
}) => {

    const newPronogeeks = copyReducer(getState, PRONOGEEK_REDUCER_KEY, USER_PRONOGEEKS_KEY)
    newPronogeeks[`${seasonID}-${matchweekNumber}`] = {}

    for (let pronogeek of pronogeeks) {
        newPronogeeks[`${seasonID}-${matchweekNumber}`][pronogeek.fixture] = pronogeek
    }

    dispatch({
        type: ADD_USER_PRONOGEEKS,
        payload: newPronogeeks
    })
}