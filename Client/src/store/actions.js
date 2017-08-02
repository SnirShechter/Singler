import Vue from 'vue'
import axios from 'axios';
import io from 'socket.io-client'
import router from '../router'

var SERVER_URL =  process.env.NODE_ENV !== 'development'? '': 'http://localhost:3003';
var socket = io(SERVER_URL);

export default {
  register(context, user) {
    axios.post(`${SERVER_URL}/data/users`, user) // getting the new user
      .then((res) => {
        res.data.password = user.password;
        context.dispatch('connectUser', res.data);
      })
      .catch((error) => {
        console.log(error);
        console.log('Cannot connect to server, are you online?')
      })
  },
  login(context, { uName, password, token }) {
    axios.post(`${SERVER_URL}/login`, { uName, password })
      .then((res) => {
        res.data.password = password;
        context.dispatch('connectUser', res.data);
      })
      .catch((error) => {
        console.log(error);
        Vue.prototype.$message.error('Login unsuccessful')
      })
  },
  logout() {
    localStorage.removeItem('login');
    router.push('/')
    location.reload();
  },
  connectUser(context, user) {
    context.commit('login', user);
    context.dispatch('getUsersToShow', user._id)
    socket.emit('identify', user._id)
    socket.on('message', msg => {
      context.dispatch('receiveMsg', msg)
    })
    socket.on('match', match => {
      context.dispatch('match', match);
    })
    router.push('matcher');
  },
  editProfile(context, profile) {
    axios.put(`${SERVER_URL}/data/users/`, { _id: context.state._id, profile })
      .then((res) => {
        context.commit('editProfile', profile)
      })
      .catch((error) => {
        console.log(error);
        console.log('Cannot connect to server, are you online?')
      })
  },
  editFilterMatch(context, filterMatch) {
    axios.put(`${SERVER_URL}/data/users/filtermap/` + context.state._id, filterMatch)
      .then((res) => {
        context.commit('editFilterMatch', filterMatch)
      })
      .catch((error) => {
        console.log(error);
        console.log('Cannot connect to server, are you online?')
      })
  },
  getUsersToShow(context, id) {
    axios.get(`${SERVER_URL}/data/users/all/${id}`)
      .then((res) => {
        context.commit('addUsers', res.data)
      })
  },
  like(context, { targetId, isLiked }) {
    isLiked = isLiked ? 'like' : 'not';
    context.commit('like', { targetId, isLiked });
    axios.put(`${SERVER_URL}/data/users/${context.state._id}/${targetId}/${isLiked}`)
      .then((res) => {
        if (res.data.match) context.dispatch('match', res.data.match);
      })
      .catch((error) => {
        console.log(error);
        context.commit('unlike', targetId);
        console.log('Cannot connect to server, are you online?')
      })
  },
  match(context, match) {
    context.commit('match', match);
    Vue.prototype.$msgbox({
      customClass: 'matchMsg',
      title: 'You have a new match',
      confirmButtonText: 'Ok',
      message: Vue.prototype.$createElement('div', null,
        [Vue.prototype.$createElement('div',
          {
            class: { 'background-img': true, 'match-img': true },
            style: { 'background-image': `url(${match.imgUrl})` }
          }, ``),
        Vue.prototype.$createElement('br', null, ''),
        `${match.fName} likes you!`]),
    })
  },
  unmatch(context, matchId) {
    axios.delete('/matches/' + matchId)
      .then((res) => {
        context.commit('unmatch', matchId);
      })
  },
  sendMsg(context, msg) {
    context.commit('addMsg', msg);
    socket.send(msg, (res) => {
      if (msg.txt !== res.data.txt) {
        console.log('Cannot connect to server, are you online?')
        context.commit('errorMsg', msg);
      }
    });
  },
  receiveMsg(context, msg) {
    context.commit('addMsg', msg);
  },
  getAllMatchMsgs(context, match) {
    axios.get(`${SERVER_URL}/data/chat/messages/${context.state._id}/${match._id}`)
      .then(res => {
        context.commit('addMsgHistory', { msgs: res.data, match })
      })
  },
  resetUnlikes(context) {
    console.log(`deleting unlikes of ${context.state._id}`)
    axios.put(`${SERVER_URL}/delete/unlikes/${context.state._id}`) // getting the new user
      .then((res) => {
        context.dispatch('getUsersToShow', context.state._id)
        context.commit('resetUnlikes', res.data);
      })
      .catch((error) => {
        console.log(error)
        console.log('Cannot connect to server, are you online?')
      })
  }
};
