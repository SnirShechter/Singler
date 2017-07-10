import axios from 'axios';

const SERVER_URL = 'http://localhost:3003';
export default {
  register(context, user) {
    axios.post(`${SERVER_URL}/data/users`, user) // getting the new user
      .then((res) => {
        context.commit('login', res.data)
      })
      .catch((error) => {
        console.log(error);
        console.log('SOMETHING WENT TERRIBLY BAD')
      })
  },
  login(context, { uName, password }) {
    console.log(password);
    axios.post(`${SERVER_URL}/login`, { uName, password })
      .then((res) => {
        console.log(res.data); // <-- console.log
        context.commit('login', res.data)
      })
      .catch((error) => {
        console.log(error); // <-- console.log
        console.log('SOMETHING WENT TERRIBLY BAD')
      })
  },
  editProfile(context, profile) {
    axios.put(`${SERVER_URL}/users/` + state._id, profile)
      .then((res) => {
        context.commit('editProfile', profile)
      })
      .catch((error) => {
        console.log(error);
        console.log('SOMETHING WENT TERRIBLY BAD')
      })
  },
  getUsersToShow(context) {
    axios.get(`${SERVER_URL}/data/users/all/${context.state._id}`)
      .then((res) => {
        console.log(res.data);
        context.commit('addUsers', res.data)
      })
  },
  like(context, { targetId, isLiked }) {
    console.log(context.state)
    console.log(isLiked);
    isLiked = isLiked ? 'like' : 'not';
    console.log(isLiked);
    context.commit('like', { targetId, isLiked });
    axios.put(`${SERVER_URL}/data/users/${context.state._id}/${targetId}/${isLiked}`)
      .then((res) => {
        console.log('LIKED, res: ' + res);
        if (res.data.isMatch) {
          context.dispatch('match', targetId, this.$store.getters.nextUser.profile);
        }
      })
      .catch((error) => {
        console.log(error);
        context.commit('unlike', targetId);
        console.log('SOMETHING WENT TERRIBLY BAD')
      })
  },
  match(context, targetId, targetProfile) {
    var match = { targetId, targetProfile, msgs: [] };
    context.commit('match', match);
    this.$message('You have a new match!!!');
  },
  unmatch(context, matchId) {
    axios.delete('/matches/' + matchId)
      .then((res) => {
        console.log(res.data);
        context.commit('unmatch', matchId);
      })
  }
};
