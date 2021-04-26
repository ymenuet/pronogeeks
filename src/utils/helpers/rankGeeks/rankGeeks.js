export default (players, seasonID, matchweekNumber = null) => {

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