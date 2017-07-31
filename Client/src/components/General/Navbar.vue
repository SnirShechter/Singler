<template>
  <section class="navbar">
    <div class="logout" v-if="this.$store.state.user">
      <el-button type="danger" @click="logout">Logout</el-button>
    </div>
    <div class="container">
      <img src="../../assets/profile.png" @click="goToPage('/myprofile')"></img>
      <img src="../../assets/heart.png" @click="goToPage('/matcher')"></img>
      <img src="../../assets/chat.png" @click="goToPage('/matches')"></img>
    </div>
  </section>
</template>

<script>
export default {
  name: 'navbar',
  mounted() {
  },
  data() {
    return {
    }
  },
  methods: {
    goToPage(location) {
      if (this.$store.state._id) {
        this.$router.push(location)
      } else {
        this.$message.error('You are not logged in!');
        this.$router.push('/')
      }
    },
    logout() {
      this.$store.dispatch('logout');
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  position: static;
  z-index: 10;
  height: 10vh;
  display: flex;
  justify-content: center;
  background-color: white;
  border-bottom: 1px solid lightgray;
  margin-bottom: 1em;
  .logout {
    position: absolute;
    left: 5px;
    top: 10vh;
    button {
      // width:10px;
      // height:10px;
      // line-height: 0;
      margin: 0;
      padding: 3px;
    } // overflow: hidden;
  }
  img {
    max-width: 5em;
    transition: 0.5s all;
    height: 90%;
    margin: 9px;
    &:hover {
      cursor: pointer;
    }
  }
  .container {
    max-width: 800px;
    width: 800px;
    margin: 10px;
    justify-content: space-between;
    display: flex;
    img:hover {
      animation: 0.5s forwards rescale; // animation: 1s all infinite ease-in-out;
    }
  }
}

@keyframes rescale {
  25% {
    transform: scale(0.9);
  }
  75% {
    transform: scale(1.1);
  }
}
</style>
