import {
    notification
} from 'antd'

export const openNotification = (type, title, message) => {
    notification[type]({
        message: title,
        description: message,
        placement: 'bottomRight',
        className: 'notification-box'
    })
}

export const dateTransform = (date) => {
    date = new Date(date)
    let weekDay = date.getDay()
    let month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    let minutes = date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes()
    switch (weekDay) {
        case 0:
            weekDay = 'dimanche'
            break
        case 1:
            weekDay = 'lundi'
            break;
        case 2:
            weekDay = 'mardi'
            break;
        case 3:
            weekDay = 'mercredi'
            break
        case 4:
            weekDay = 'jeudi'
            break;
        case 5:
            weekDay = 'vendredi'
            break;
        case 6:
            weekDay = 'samedi'
            break;
        default:
            weekDay = ''
    }
    return {
        fullDate: `${weekDay} ${date.getDate()}/${month}/${date.getFullYear()}`,
        fullTime: `${date.getHours()}h${minutes}`
    }
}

export const dateFormatterForRulesPanel = date => {
    date = new Date(date)
    let month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    let minutes = date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes()
    return `${date.getDate()}/${month}/${date.getFullYear()} à ${date.getHours()}h${minutes}`
}

export const statusTranform = (statusShort, minutes) => {
    if (statusShort !== 'TBD' &&
        statusShort !== 'NS' &&
        statusShort !== '1H' &&
        statusShort !== 'HT' &&
        statusShort !== '2H' &&
        statusShort !== 'ET' &&
        statusShort !== 'P' &&
        statusShort !== 'BT' &&
        statusShort !== 'SUSP' &&
        statusShort !== 'INT' &&
        statusShort !== 'PST') {
        return 'Match terminé'
    } else if (statusShort === 'HT') {
        return 'Mi-temps'
    } else if (statusShort === 'PST') {
        return 'Match reporté'
    } else if (statusShort === 'SUSP') {
        return `Match suspendu (${minutes}')`
    } else if (statusShort === 'INT') {
        return `Match interrompu (${minutes}')`
    } else return `${minutes}'`
}