import axios from 'axios';

// snir : ITS NOT WORKING, JUST A SKETCH
export default {
  register(context, user) {
    axios.post('http://localhost:3003/data/users', user)
      .then((res) => {
        console.log(res.data);
        context.commit('Login', res.data)
      })
      .catch((error) => {
        console.log(error);
        console.log('SOMETHING WENT TERRIBLY BAD')
      })
  },
  login(context, { uName, password }) {
    axios.post('/login', { uName, password })
      .then((res) => {
        console.log(res.data); // <-- console.log
        context.commit('Login', res.data)
      })
      .catch((error) => {
        console.log(error); // <-- console.log
        console.log('SOMETHING WENT TERRIBLY BAD')
      })
  },
  editProfile(context, profile) {
    axios.put('/users/' + state.user._id, profile)
      .then((res) => {
        console.log(res.data); // <-- console.log
        context.commit('editProfile', profile)
      })
      .catch((error) => {
        console.log(error); // <-- console.log
        console.log('SOMETHING WENT TERRIBLY BAD')
      })
  },
  like(context, { targetId, isLiked }) {
    axios.put('http://localhost:3003/data/users', {
      myId: context.user._id,
      targetId,
      isLiked
    })
      .then((res) => {
        context.commit('like', { targetId, isLiked });
        if (res.data.date) {
          context.dispatch('match', data.match);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log('SOMETHING WENT TERRIBLY BAD')
      })
  },
  match(context, data) {
    context.commit('match', data);
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
