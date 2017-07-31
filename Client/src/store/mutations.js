import singlerService from '../services/singler.service'
export default {
    login(state, data) {
        state._id = data._id;
        state.uName = data.uName;
        state.profile = data.profile;
        state.likes = data.likes;
        state.matches = data.matches;
        state.filtermap = data.filtermap;
        localStorage.setItem('login', JSON.stringify({ uName: data.uName, token: data.password }))
    },
    addUsers(state, users) {
        state.usersToShow = users;
    },
    editProfile(state, profile) {
        state.profile = profile;
    },
    editFilterMatch(state, filterMatch) {
        state.filtermap = filterMatch;
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
        let match = state.matches.find(match => match._id === matchedUserId);
        match.msgs.push(msg);
    },
    addMsgHistory(state, { msgs, match }) {
        match.msgs = msgs;
    },
    errorMsg(state, msg) {
        const currMatch = singlerService.findMatchById(state.matches, matchId)
        currMatch.msgs.push(msg);
    },
    resetUnlikes(state, likes) {
        state.likes = likes;
    }
}

