export default dateToFormat => {
    const date = new Date(dateToFormat)
    let month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    let minutes = date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes()
    return `${date.getDate()}/${month}/${date.getFullYear()} à ${date.getHours()}h${minutes}`
}