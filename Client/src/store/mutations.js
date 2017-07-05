
// snir : ITS NOT WORKING, JUST A SKETCH
export default {
    editProfile(state, profileToEdit) { // not yet checked
        state.user.profile = profileToEdit;
    },
    addMsg(state, { matchId, msg }) { // not yet checked
        state.matches[matchId].msgs.push(msg);
    },
    like(state, like) {
        state.user.likes[Object.keys(like)[0]] = like[Object.keys(like)[0]];
    },
    match(state, userMatch) { // not yet checked
        state.user.userMatches[Object.keys(userMatch)[0]] = userMatch[Object.keys(userMatch)[0]];
    },
    unmatch(state, userMatch) {
        delete state.user.userMatches[Object.keys(userMatch)[0]];
    }
}

