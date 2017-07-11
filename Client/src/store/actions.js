import axios from 'axios';
import io from 'socket.io-client'
import router from '../router'

var socket = io('http://localhost:3003');

const SERVER_URL = 'http://localhost:3003';
export default {
  register(context, user) {
    axios.post(`${SERVER_URL}/data/users`, user) // getting the new user
      .then((res) => {
        context.commit('login', res.data)
      })
      .then(() => {
        router.push('matcher');
        context.dispatch('getUsersToShow', context.state._id);
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
        console.log(res.data)
        socket.emit('identify', res.data._id)
        socket.on('message', msg => {
          console.log(msg);
        })
      })
      .then(() => {
        context.dispatch('getUsersToShow', context.state._id)
      }
      )
      .catch((error) => {
        console.log(error); // <-- console.log
        console.log('SOMETHING WENT TERRIBLY BAD')
      })
  },
  editProfile(context, profile) {
    axios.put(`${SERVER_URL}/users/` + context.state._id, profile)
      .then((res) => {
        context.commit('editProfile', profile)
      })
      .catch((error) => {
        console.log(error);
        console.log('SOMETHING WENT TERRIBLY BAD')
      })
  },
  editFilterMatch(context, filterMatch) {
    axios.put(`${SERVER_URL}/users/` + context.state._id, filterMatch)
      .then((res) => {
        context.commit('editFilterMatch', filterMatch)
      })
      .catch((error) => {
        console.log(error);
        console.log('SOMETHING WENT TERRIBLY BAD')
      })
  },
  getUsersToShow(context, id) {
    console.log('getting users to show with id ' + id)
    axios.get(`${SERVER_URL}/data/users/all/${id}`)
      .then((res) => {
        console.log(res.data);
        context.commit('addUsers', res.data)
      })
  },
  like(context, { targetId, isLiked }) {
    isLiked = isLiked ? 'like' : 'not';
    console.log(isLiked);
    context.commit('like', { targetId, isLiked });
    axios.put(`${SERVER_URL}/data/users/${context.state._id}/${targetId}/${isLiked}`)
      .then((res) => {
        console.log(res.data.message)
        console.log('LIKED, res: ' + res);
        if (res.data.isMatch) {
          context.dispatch('match', targetId, context.getters.nextUser.profile);
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
    console.log('You have a new match!!!');
  },
  unmatch(context, matchId) {
    axios.delete('/matches/' + matchId)
      .then((res) => {
        console.log(res.data);
        context.commit('unmatch', matchId);
      })
  },
  sendMsg(context, msg) {
    context.commit('addMsg', msg);
    console.log('Msg sent!')
    socket.send(msg, (res) => {
      console.log('Msg returned!')
      console.log(res.data)
      if (msg.txt !== res.data.txt) {
        console.log('Error, server did not receive the message')
        context.commit('errorMsg', msg);
      }
    });
  },
  getAllMatchMsgs(context, targetId) {
    axios.get(`${SERVER_URL}/data/chat/users/${context.state._id}/${targetId}`)
      .then(res => console.log(res))
  }
};
