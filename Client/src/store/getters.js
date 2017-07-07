// snir : ITS NOT WORKING, JUST A SKETCH
export default {
    myAge(state, getters) {
        var ageInMilliseconds = Date.now() - state.user.profile.birthdate;
        var age = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365);
        return age.toFixed(1);
    },
    nextUser(state, getters) {
        return state.usersToShow[0];
    },
    nextUserAge(state, getters) {
        var ageInMilliseconds = (Date.now() - getters.nextUser.profile.birthdate);
        var age = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365);
        return age.toFixed(1);
    },
    getMatches(state, getters) {
        return state.matches;
    }
    
}