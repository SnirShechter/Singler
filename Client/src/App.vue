<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
    <footer>Cofeerights belong to <span class="theme">Snit</span>™</footer>
  </div>
</template>

<script>
import navbar from './components/General/Navbar'

export default {
  name: 'app',
  components: {
    navbar
  }
}
</script>

<style lang="scss">
@import './scss/style';
</style>
