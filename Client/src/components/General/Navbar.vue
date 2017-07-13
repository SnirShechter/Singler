<template>
  <section class="navbar">
    <div class="container">
      <!--<router-link to="/myprofile">-->
      <img src="../../assets/profile.png" @click="goToPage('/myprofile')"></img>
      <!--</router-link>
                    <router-link to="/matcher">-->
      <img src="../../assets/heart.png" @click="goToPage('/matcher')"></img>
      <!--</router-link>
                    <router-link to="/matches">-->
      <img src="../../assets/chat.png" @click="goToPage('/matches')"></img>
      <!--</router-link>-->
    </div>
  </section>
</template>

<script>
export default {
  name: 'navbar',
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
        // console.log('you are not logged in!')
        this.$router.push('/')
      }
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
  // box-shadow: -1px 10px 20px -3px rgba(0, 0, 0, 0.75);
  // border-bottom-right-radius: 15px;
  // border-bottom-left-radius: 15px;
  margin-bottom: 1em;
  img {
    max-width: 5em;
    height: 90%;
    margin: 9px;
    &:hover {
      cursor: pointer;
    }
  }
  .container {
    max-width: 800px;
    width:  800px;
    margin:10px;
    justify-content: space-between;
    display: flex;
    // margin: auto;
  }
}
</style>
