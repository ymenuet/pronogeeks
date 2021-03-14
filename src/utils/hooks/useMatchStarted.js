import {
    useState,
    useEffect
} from 'react'
import {
    hasMatchStarted
} from '../functions'

export const useMatchStarted = fixture => {
    const [matchStarted, setMatchStarted] = useState(true)

    useEffect(() => {
        const matchStarted = hasMatchStarted(fixture)
        setMatchStarted(matchStarted)
    }, [fixture])

    return matchStarted
}