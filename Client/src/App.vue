<template>
  <div id="app">
    <navbar v-show="isNavShown"></navbar>
    <transition name="fade" mode="out-in">
      <router-view @disableNav="disableNav" @enableNav="enableNav"></router-view>
    </transition>
    <footer v-show="isNavShown">Coffeerights belong to
      <span class="theme">Snit</span>™</footer>
  </div>
</template>

<script>
import navbar from './components/General/Navbar'
import Vue from 'vue'

export default {
  name: 'app',
  created() {
    Vue.prototype.$createElement = this.$createElement;
    var login = JSON.parse(localStorage.getItem('login'))
    if (login) {
      login.password = login.token;
      this.$router.replace('/loader')
      this.$store.dispatch('login', login)
        .then(() => {
          setTimeout(() => { if (!this.$store.state._id) this.$store.dispatch('login', login) }, 3000)
        })
    }
  },
  data() {
    return {
      isNavShown: true
    }
  },
  methods: {
    enableNav() {
      this.isNavShown = true;
    },
    disableNav() {
      this.isNavShown = false;
    }
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

.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */

{
  transform: translateX(10px);
  opacity: 0;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active in <2.1.8 */

{
  opacity: 0
}

.bounce-enter-active {
  animation: bounce-in .5s;
}

.bounce-leave-active {
  animation: bounce-in .5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

@import './scss/style';
</style>
