import singlerService from '../services/singler.service'
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
    like(state, { targetId, isLiked }) {
        state.user.likes[targetId] = { targetId: isLiked };
        state.usersToShow.splice(0, 1);
    },
    match(state, match) {
        state.matches[match._id] = match;
    },
    unmatch(state, matchId) {
        delete state.matches[matchId];
    },
    addMsg(state, { matchId, msg }) {
        // console.log(matchId, msg)
        const currMatch = singlerService.findMatchById(state.matches, matchId)
        currMatch.msgs.push(msg);
    }
}

