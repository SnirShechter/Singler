import singlerService from '../services/singler.service'
// snir : ITS NOT WORKING, JUST A SKETCH
export default {
    login(state, data) {
        console.log(data);
        state._id = data._id;
        state.uName = data.uName;
        state.profile = data.profile;
        state.likes = data.likes;
        state.matches = data.matches;
        state.filtermap = data.filtermap;
    },
    addUsers(state,users) {
        state.usersToShow.push.apply(this,users);
    },
    editProfile(state, profile) {
        state.profile = profile;
    },
    like(state, { targetId, isLiked }) {
        state.likes[targetId] = { targetId: isLiked };
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

