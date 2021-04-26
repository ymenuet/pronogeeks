export default geeks => geeks.sort((a, b) => {
    const userA = a.username.toLowerCase()
    const userB = b.username.toLowerCase()
    if (userA >= userB) return 1
    else return -1
})