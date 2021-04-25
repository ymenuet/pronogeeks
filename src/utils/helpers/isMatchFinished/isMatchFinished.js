import matchStatuses from '../../models/matchStatuses'

export default (statusShort) => {
    return statusShort !== matchStatuses.TIME_TO_BE_DEFINED &&
        statusShort !== matchStatuses.NOT_STARTED &&
        statusShort !== matchStatuses.FIRST_HALF &&
        statusShort !== matchStatuses.HALFTIME &&
        statusShort !== matchStatuses.SECOND_HALF &&
        statusShort !== matchStatuses.EXTRA_TIME &&
        statusShort !== matchStatuses.PENALTY &&
        statusShort !== matchStatuses.BREAK_TIME_EXTRA_TIME &&
        statusShort !== matchStatuses.SUSPENDED &&
        statusShort !== matchStatuses.INTERRUPTED &&
        statusShort !== matchStatuses.POSTPONED
}