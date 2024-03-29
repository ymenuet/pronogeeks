const shortStatuses = {
    TIME_TO_BE_DEFINED: 'TBD',
    NOT_STARTED: 'NS',
    FIRST_HALF: '1H',
    HALFTIME: 'HT',
    SECOND_HALF: '2H',
    EXTRA_TIME: 'ET',
    PENALTY: 'P',
    FINISHED: 'FT',
    FINISHED_AFTER_EXTRA_TIME: 'AET',
    FINISHED_AFTER_PENALTY: 'PEN',
    BREAK_TIME_EXTRA_TIME: 'BT',
    SUSPENDED: 'SUSP',
    INTERRUPTED: 'INT',
    POSTPONED: 'PST',
    CANCELLED: 'CANC',
    ABANDONED: 'ABD',
    TECHNICAL_LOSS: 'AWD',
    WALKOVER: 'WO',
}

const ALL_MATCH_SHORT_STATUSES = Object.values(shortStatuses)

export {
    ALL_MATCH_SHORT_STATUSES
}

export default shortStatuses