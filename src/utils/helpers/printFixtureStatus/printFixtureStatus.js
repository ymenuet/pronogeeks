import matchStatuses from '../../models/matchStatuses'
import {
    isMatchFinished
} from '..'

export default (statusShort, minutes) => {
    if (isMatchFinished(statusShort)) {
        return 'Match terminé'

    } else if (statusShort === matchStatuses.HALFTIME) {
        return 'Mi-temps'

    } else if (statusShort === matchStatuses.POSTPONED) {
        return 'Match reporté'

    } else if (statusShort === matchStatuses.SUSPENDED) {
        return `Match suspendu (${minutes}')`

    } else if (statusShort === matchStatuses.INTERRUPTED) {
        return `Match interrompu (${minutes}')`

    } else return `${minutes}'`
}