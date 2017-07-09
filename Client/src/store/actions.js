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
  login(context,  {uName, password}) {
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
  getUsersToShow(){
    axios.get(`${SERVER_URL}/data/users`)
    .then((res)=>{
      context.commit('addUsers',res.body)
    })
  },
  like(context, targetId, isLiked) {
    isLiked? 'like':'not';
    console.log('liking');
    var a = axios.put(`http://localhost:3003/data/users/${context.state._id}/${targetId}/${isLiked}`)
      .then((res) => {
        console.log('liking then');
        console.log('LIKED, res: '+res);
        context.commit('like', { targetId, isLiked });
        // if (res.data.date) {
        //   context.dispatch('match', data.match);
        // }
      })
      .catch((error) => {
        console.log('liking catch');
        console.log(error);
        console.log('SOMETHING WENT TERRIBLY BAD')
      })
      console.log(a);
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
