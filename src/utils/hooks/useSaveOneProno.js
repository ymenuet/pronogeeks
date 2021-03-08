import {
    useState,
    useEffect
} from 'react'
import {
    useDispatch
} from 'react-redux'
import {
    openNotification
} from '../functions'

import {
    resetSaveAndErrorState
} from '../../actions/pronogeekActions'

export const useSaveOneProno = (pronogeek, fixture) => {
    const [saving, setSaving] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (pronogeek && fixture) {
            if (pronogeek.saving) setSaving(true)

            if (pronogeek.saved) {
                dispatch(resetSaveAndErrorState(fixture))
                setSaving(false)
                setSaveSuccess(true)
                setTimeout(() => setSaveSuccess(false), 4000)
                openNotification('success', 'Enregistré', `Pronogeek enregistré pour ${fixture.homeTeam.name} - ${fixture.awayTeam.name}`)
            }

            if (pronogeek.error) {
                dispatch(resetSaveAndErrorState(fixture))
                setSaving(false)
                openNotification('error', 'Erreur', `Une erreur a eu lieu lors de l'enregistrement du match ${fixture.homeTeam.name} - ${fixture.awayTeam.name}. Réessaye plus tard.`)
            }
        }

    }, [pronogeek, fixture, dispatch])

    return {
        saving,
        saveSuccess,
        setSaveSuccess
    }
}