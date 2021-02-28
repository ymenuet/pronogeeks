import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handleStateWithId } from '../stateHandlers'

import { getSeason } from '../../actions/seasonActions'

export const useSeason = seasonID => {
    const [season, setSeason] = useState(null)
    const [errorSeason, setErrorSeason] = useState(false)

    const detailedSeasons = useSelector(({ seasonReducer }) => seasonReducer.detailedSeasons)

    const dispatch = useDispatch()

    useEffect(() => {
        handleStateWithId({
            id: seasonID,
            reducerData: detailedSeasons,
            action: (id) => dispatch(getSeason(id)),
            setResult: setSeason,
            setError: setErrorSeason
        })
    }, [seasonID, detailedSeasons, dispatch])

    return { season, errorSeason }
}