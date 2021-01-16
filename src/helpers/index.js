import {
    notification
} from 'antd'

export const isConnected = user => {
    return user ? Object.keys(user).length : null
}

export const openNotification = (type, title, message) => {
    notification[type]({
        message: title,
        description: message,
        placement: 'bottomRight',
        className: 'notification-box'
    })
}

export const errorNotification = (error) => {
    openNotification('error', error)
}

export const dateTransform = (date) => {
    date = new Date(date)
    let weekDay = date.getDay()
    let month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    let minutes = date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes()
    switch (weekDay) {
        case 0:
            weekDay = 'dimanche'
            break
        case 1:
            weekDay = 'lundi'
            break;
        case 2:
            weekDay = 'mardi'
            break;
        case 3:
            weekDay = 'mercredi'
            break
        case 4:
            weekDay = 'jeudi'
            break;
        case 5:
            weekDay = 'vendredi'
            break;
        case 6:
            weekDay = 'samedi'
            break;
        default:
            weekDay = ''
    }
    return {
        fullDate: `${weekDay} ${date.getDate()}/${month}/${date.getFullYear()}`,
        fullTime: `${date.getHours()}h${minutes}`
    }
}

export const dateFormatterForRulesPanel = date => {
    date = new Date(date)
    let month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    let minutes = date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes()
    return `${date.getDate()}/${month}/${date.getFullYear()} à ${date.getHours()}h${minutes}`
}

export const statusTranform = (statusShort, minutes) => {
    if (statusShort !== 'TBD' &&
        statusShort !== 'NS' &&
        statusShort !== '1H' &&
        statusShort !== 'HT' &&
        statusShort !== '2H' &&
        statusShort !== 'ET' &&
        statusShort !== 'P' &&
        statusShort !== 'BT' &&
        statusShort !== 'SUSP' &&
        statusShort !== 'INT' &&
        statusShort !== 'PST') {
        return 'Match terminé'
    } else if (statusShort === 'HT') {
        return 'Mi-temps'
    } else if (statusShort === 'PST') {
        return 'Match reporté'
    } else if (statusShort === 'SUSP') {
        return `Match suspendu (${minutes}')`
    } else if (statusShort === 'INT') {
        return `Match interrompu (${minutes}')`
    } else return `${minutes}'`
}

export const matchFinished = (statusShort) => {
    return statusShort !== 'TBD' &&
        statusShort !== 'NS' &&
        statusShort !== '1H' &&
        statusShort !== 'HT' &&
        statusShort !== '2H' &&
        statusShort !== 'ET' &&
        statusShort !== 'P' &&
        statusShort !== 'BT' &&
        statusShort !== 'SUSP' &&
        statusShort !== 'INT' &&
        statusShort !== 'PST'
}

export const getGeeksProno = (user, fixture, setHomeScore, setAwayScore, setMatchStarted = null, setPronogeek = null, setFixture = null) => {
    const seasonID = fixture.season
    const matchweekNumber = fixture.matchweek
    if (setMatchStarted && new Date(fixture.date) - Date.now() < 0) setMatchStarted(true)
    if (setFixture) setFixture(fixture)
    let season = user.seasons.filter(season => season.season._id || season.season === seasonID)
    if (season.length > 0) season = season[0]
    let pronogeek = {
        homeProno: '',
        awayProno: ''
    };
    let pronogeekFound = [];
    let matchweekIndex = 0;
    if (season.matchweeks.length > 0) {
        season.matchweeks.map((matchweek, i) => {
            if (matchweek.number.toString() === matchweekNumber.toString()) matchweekIndex = i
            return matchweek
        })
        if (season.matchweeks[matchweekIndex].pronogeeks.length > 0) pronogeekFound = season.matchweeks[matchweekIndex].pronogeeks.filter(pronogeek => pronogeek.fixture === fixture._id)
    }
    if (pronogeekFound.length > 0) pronogeek = pronogeekFound[0]
    if (setPronogeek) setPronogeek(pronogeek)
    setHomeScore(pronogeek.homeProno)
    setAwayScore(pronogeek.awayProno)
}

export const resetMatchweek = (e, matchweekInput, matchweekRef, setMatchweekInput) => {
    const clickOutsideInput = e.target.className ? typeof e.target.className === 'string' ? !e.target.className.includes('cancel-target') : true : true
    if (clickOutsideInput && matchweekInput !== matchweekRef) setMatchweekInput(matchweekRef)
}

export const rankGeeks = (players, seasonID, matchweekNumber = null) => {

    return players.sort((a, b) => {

        const creationUserA = a.createdAt
        const creationUserB = b.createdAt

        const sortGeeks = (results1, results2, matchweek = false) => {
            if (results2.totalPoints !== results1.totalPoints) return results2.totalPoints - results1.totalPoints
            else if (results2.numberCorrects !== results1.numberCorrects) return results2.numberCorrects - results1.numberCorrects
            else if (results2.numberExacts !== results1.numberExacts) return results2.numberExacts - results1.numberExacts
            else if (!matchweek && results2.bonusFavTeam !== results1.bonusFavTeam) return results2.bonusFavTeam - results1.bonusFavTeam
            else if (matchweek && results2.bonusFavTeam !== results1.bonusFavTeam) return results1.bonusFavTeam ? -1 : 1
            else if (creationUserA >= creationUserB) return 1
            else return -1
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

export const getUserSeasonFromProfile = (user, seasonID) => {
    const seasonFiltered = user.seasons.filter(season => season.season._id.toString() === seasonID.toString())
    if (seasonFiltered.length > 0) return seasonFiltered[0]
    else return null
}

export const getUserMatchweekFromProfile = (userSeason, matchweekNumber) => {
    const matchweekFiltered = userSeason.matchweeks.filter(matchweek => matchweek.number.toString() === matchweekNumber.toString())
    if (matchweekFiltered.length > 0) return matchweekFiltered[0]
    else return null
}