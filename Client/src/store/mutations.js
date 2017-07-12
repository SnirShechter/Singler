import singlerService from '../services/singler.service'
// snir : ITS NOT WORKING, JUST A SKETCH
export default {
    login(state, data) {
        // console.log(data);
        state._id = data._id;
        state.uName = data.uName;
        state.profile = data.profile;
        state.likes = data.likes;
        state.matches = data.matches;
        state.filtermap = data.filtermap;
    },
    addUsers(state, users) {
        state.usersToShow = users;
    },
    editProfile(state, profile) {
        state.profile = profile;
    },
    editFilterMatch(state, filterMatch) {
        state.filterMatch = filterMatch;
    },
    like(state, { targetId, isLiked }) {
        state.likes.push({ targetId: isLiked });
        state.usersToShow.splice(0, 1);
    },
    unlike(state, targetId) {
        let idx = state.likes.findIndex(like => (Object.keys(like) === targetId));
        state.likes.splice(idx, 1);
    },
    match(state, match) {
        state.matches.push(match);
    },
    unmatch(state, matchId) {
        delete state.matches[matchId];
    },
    addMsg(state, msg) {
        let matchedUserId = (msg.toId === state._id) ? msg.fromId : msg.toId;
        // console.log(`finding ` + matchedUserId)
        let match = state.matches.find(match => match._id === matchedUserId);
        // console.log(`pushing `, match)
        match.msgs.push(msg);
    },
    addMsgHistory(state, { msgs, match }) {
        // console.log(msgs)
        // console.log(`added msgs to ${match._id}`);
        match.msgs = msgs;
        // console.log(msgs);
        // console.log(match);
    },
    errorMsg(state, msg) {
        const currMatch = singlerService.findMatchById(state.matches, matchId)
        currMatch.msgs.push(msg);
    },
    setError(state) {
        state.numUnRegLogin++;
    },
    notifyMatch(state) {
        state.isNewMatch = false;
    }
}

