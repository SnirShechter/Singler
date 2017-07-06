
// snir : ITS NOT WORKING, JUST A SKETCH
export default {
    Login(state, data) {
        state.user = data.user;
        state.matches = data.matches;
        state.usersToShow = data.users;
    },
    editProfile(state, profile) {
        state.user.profile = profile;
    },
    like(state, {targetId,isLiked}) {
        state.user.likes[targetId] = {targetId:isLiked};
    },
    match(state, match) { 
        state.matches[match._id] = match;
    },
    unmatch(state, matchId) {
        delete state.matches[matchId];
    },
    addMsg(state, { matchId, msg }) {
        state.matches[matchId].msgs.push(msg);
    }
}

