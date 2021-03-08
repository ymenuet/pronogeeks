import {
    useState,
    useEffect
} from 'react'

export const useMatchStarted = fixture => {
    const [matchStarted, setMatchStarted] = useState(true)

    useEffect(() => {
        if (
            fixture &&
            (new Date(fixture.date) > Date.now() ||
                fixture.statusShort === 'PST')
        ) setMatchStarted(false)

    }, [fixture])

    return matchStarted
}