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
    }
    // items: state => state.items,
    // checkoutPending: state => state.loading,
    // error: state => state.error,
    // cart(state) {
    //     return state.items.filter(i => i.quantity);
    // },
    // cartTotal(_, getters) {
    //     return getters.cart.reduce((acc, item) => {
    //         return acc + (parseInt(item.quantity) * item.price);
    //     }, 0);
    // },
    // cartLength(_, getters) {
    //     return getters.cart.length;
    // }
}