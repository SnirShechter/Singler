<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
    <footer>Coffeerights belong to
      <span class="theme">Snit</span>™</footer>
  </div>
</template>

<script>
import navbar from './components/General/Navbar'
import io from 'socket.io-client'

export default {
  name: 'app',
  created() {
    var socket = io('http://localhost:3003');
    socket.on('match', function (data) {
      console.log('MATCHHHH');
    });
    socket.emit('connection');
  },
  components: {
    navbar
  }
}
</script>

<style lang="scss">
footer {
  margin-top: 10px;
}

@import './scss/style';
</style>
