import {
    useEffect,
    useState
} from 'react'
import {
    useSelector
} from 'react-redux'

export const useUserFixtureProno = fixture => {
    const [pronogeek, setPronogeek] = useState(null)
    const [homeScore, setHomeScore] = useState(null)
    const [awayScore, setAwayScore] = useState(null)
    const [modified, setModified] = useState(false)

    const userPronogeeks = useSelector(({
        pronogeekReducer: {
            userPronogeeks
        }
    }) => userPronogeeks)

    useEffect(() => {
        let pronogeek = {
            homeProno: '',
            awayProno: ''
        }

        if (fixture) {
            const {
                _id,
                season,
                matchweek
            } = fixture

            const userMatchweekPronogeeks = userPronogeeks[`${season}-${matchweek}`]

            if (userMatchweekPronogeeks && userMatchweekPronogeeks[_id]) pronogeek = userMatchweekPronogeeks[_id]
        }

        setPronogeek(pronogeek)
        setHomeScore(parseInt(pronogeek.homeProno) >= 0 ? pronogeek.homeProno : '')
        setAwayScore(parseInt(pronogeek.awayProno) >= 0 ? pronogeek.awayProno : '')
        setModified(pronogeek.modified ? true : false)

    }, [fixture, userPronogeeks])

    return {
        pronogeek,
        homeScore,
        awayScore,
        modified
    }
}