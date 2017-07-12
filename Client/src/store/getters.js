import singlerService from '../services/singler.service'

// snir : ITS NOT WORKING, JUST A SKETCH
export default {
    myAge(state, getters) {
        var ageInMilliseconds = Date.now() - new Date(state.profile.birthdate);
        var age = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365);
        return age.toFixed(1);
    },
    myGender(state, getters) {
        return state.profile.isMale ? 'Male' : 'Female';
    },
    nextUser(state, getters) {
        // console.log(state.usersToShow)
        if (!state.usersToShow[0]) return 'Nothing to show!'
        return state.usersToShow[0];
    },
    nextUserAge(state, getters) {
        if (!state.usersToShow[0]) return 'Nothing to show!'
        var ageInMilliseconds = (Date.now() - new Date(getters.nextUser.birthdate).getTime());
        // console.log(ageInMilliseconds);
        var age = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365);
        // console.log(age);
        return age.toFixed(1);
    },
    getMatches(state, getters) {
        return state.matches;
    },
    getMatch(state, getters) {
        return matchId => singlerService.findMatchById(state.matches, matchId)
    }
}
