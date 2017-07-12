<template>
  <div id="app">
    <navbar></navbar>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <footer>Coffeerights belong to
      <span class="theme">Snit</span>™</footer>
  </div>
</template>

<script>
import navbar from './components/General/Navbar'

export default {
  name: 'app',
  created() {
    var login = JSON.parse(localStorage.getItem('login'))
    if (login) {
      this.$router.push('/loader')
      this.$store.dispatch('login', login)
    }
  },
  data() {
    return {
      newMatch: this.$store.state.isNewMatch
    }
  },
  watch: {
    newMatch() {
      if (newMatch) {
        this.$message({
          message: 'Congrats, this is a success message.',
          type: 'success'
        })
      };
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
