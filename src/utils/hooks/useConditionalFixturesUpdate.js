import {
    useState,
    useEffect
} from 'react'
import {
    useSelector,
    useDispatch
} from 'react-redux'
import {
    matchFinished
} from '../functions'
import {
    useUser
} from '.'
import {
    MILLISECONDS_IN_30_MINUTES,
    MILLISECONDS_IN_1_DAY,
    MILLISECONDS_IN_1_WEEK
} from '../constants'

import {
    updateFixturesStatus,
    updateOdds
} from '../../actions/apiFootballActions'

export const useConditionalFixturesUpdate = ({
    seasonID,
    matchweekNumber,
    fixtures,
    newSeason
}) => {

    const [lastScoresUpdated, setLastScoresUpdated] = useState(null)
    const [lastOddsUpdated, setLastOddsUpdated] = useState(null)
    const [scoresUpdatedOnce, setScoresUpdatedOnce] = useState(false)
    const [oddsUpdatedOnce, setOddsUpdatedOnce] = useState(false)

    const {
        user,
        isUserConnected
    } = useUser()

    const loadingApi = useSelector(({
        apiFootballReducer
    }) => apiFootballReducer.loading)

    const dispatch = useDispatch()

    useEffect(() => {

        if (isUserConnected && !newSeason && fixtures) {
            const fixtureDates = fixtures.map(fixture => new Date(fixture.date).getTime())
            const minDate = Math.min(...fixtureDates)
            const maxDate = Math.max(...fixtureDates)
            const fixturesInLessThanOneWeek = (minDate - Date.now()) < MILLISECONDS_IN_1_WEEK

            const fixtureUpdates = fixtures.map(fixture => new Date(fixture.lastScoreUpdate).getTime())
            const lastUpdate = Math.max(...fixtureUpdates)
            setLastScoresUpdated(lastUpdate)

            const fixtureOddsUpdates = fixtures.map(fixture => new Date(fixture.lastOddsUpdate).getTime())
            const lastOddsUpdate = Math.max(...fixtureOddsUpdates)
            setLastOddsUpdated(lastOddsUpdate)

            if ((user.role === 'SUPER GEEK' || user.role === 'GEEK ADMIN') && fixturesInLessThanOneWeek && !loadingApi) {

                // Update fixtures results from API-football data if last update happened more than 30minutes ago, first game of matchweek is in less than 1 week and last game of matchweek was over for less than 2 days.
                const matchweekNotFinished = !!fixtures.filter(({
                    statusShort
                }) => !matchFinished(statusShort)).length
                const fixturesUpdatedMoreThanThirtyMinutesAgo = Date.now() > lastUpdate + MILLISECONDS_IN_30_MINUTES

                if (
                    fixturesUpdatedMoreThanThirtyMinutesAgo &&
                    matchweekNotFinished &&
                    !scoresUpdatedOnce
                ) {
                    setScoresUpdatedOnce(true)
                    dispatch(updateFixturesStatus(seasonID, matchweekNumber))
                }

                // Update fixtures odds from API-football data if last update happened more than a day ago, first game of matchweek is in less than 1 week and last game of matchweek hasn't started yet
                const allFixturesStarted = Date.now() > maxDate - MILLISECONDS_IN_30_MINUTES
                const oddsUpdatedMoreThanOneDayAgo = Date.now() > lastOddsUpdate + MILLISECONDS_IN_1_DAY

                if (!allFixturesStarted &&
                    oddsUpdatedMoreThanOneDayAgo &&
                    !oddsUpdatedOnce
                ) {
                    setOddsUpdatedOnce(true)
                    dispatch(updateOdds(seasonID, matchweekNumber))
                }

            }

        }

    }, [fixtures, loadingApi, matchweekNumber, seasonID, user, isUserConnected, newSeason, scoresUpdatedOnce, oddsUpdatedOnce, dispatch])

    return {
        lastScoresUpdated,
        lastOddsUpdated
    }
}