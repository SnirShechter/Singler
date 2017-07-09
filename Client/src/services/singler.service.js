function findMatchById(matches, matchId) {
    return matches.find(match => matchId === match._Id)
}


export default {
    findMatchById
}