import axios from 'axios';
import io from 'socket.io-client'
import router from '../router'
const SERVER_URL = 'http://localhost:3003'

var socket = io(SERVER_URL);

export default {
  register(context, user) {
    axios.post(`${SERVER_URL}/data/users`, user) // getting the new user
      .then((res) => {
        context.dispatch('connectUser', res.data);
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
        context.dispatch('connectUser', res.data);
      })
      .catch((error) => {
        console.log(error); // <-- console.log
        context.commit('setError');
        console.log('cannot login, please register!');
      })
  },
  connectUser(context, user) {
    context.commit('login', user);
    context.dispatch('getUsersToShow', user._id)
    router.push('matcher');
    socket.emit('identify', user._id)
    socket.on('message', msg => {
      context.dispatch('receiveMsg', msg)
    })
    socket.on('match', match => {
      console.log(match);
      context.dispatch('match', match);
      // window.prompt('you have a new match!')
    })
  },
  editProfile(context, profile) {
    // debugger;
    axios.put(`${SERVER_URL}/data/users/`, { _id: context.state._id, profile })
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
    axios.get(`${SERVER_URL}/data/users/all/${id}`)
      .then((res) => {
        console.log(res.data)
        context.commit('addUsers', res.data)
      })
  },
  like(context, { targetId, isLiked }) {
    isLiked = isLiked ? 'like' : 'not';
    context.commit('like', { targetId, isLiked });
    axios.put(`${SERVER_URL}/data/users/${context.state._id}/${targetId}/${isLiked}`)
      .then((res) => {
        console.log(res.data.message)
        if (res.data.match) context.dispatch('match', res.data.match);
      })
      .catch((error) => {
        console.log(error);
        context.commit('unlike', targetId);
        console.log('SOMETHING WENT TERRIBLY BAD')
      })
  },
  match(context, match) {
    context.commit('match', match);
    context.commit('sentMatch');
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
  receiveMsg(context, msg) {
    context.commit('addMsg', msg);
  },
  getAllMatchMsgs(context, match) {
    console.log(`getting all msgs from ${match._id} , sent id is ${context.state._id}`)
    axios.get(`${SERVER_URL}/data/chat/messages/${context.state._id}/${match._id}`)
      .then(res => {
        console.log(res);
        context.commit('addMsgHistory', { msgs: res.data, match })
      })
  }
};
