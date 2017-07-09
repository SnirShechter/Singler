<template>
  <section class="navbar">
    <router-link to="/myprofile">
      <img src="../../assets/profile.png"></img>
    </router-link>
    <router-link to="/matcher">
      <img src="../../assets/heart.png"></img>
    </router-link>
    <router-link to="/matches">
      <img src="../../assets/chat.png"></img>
    </router-link>
  </section>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  position: static;
  z-index: 10;
  height: 50px;
  display: flex;
  justify-content: space-between;
  background-color: gainsboro;
  box-shadow: -1px 10px 20px -3px rgba(0, 0, 0, 0.75);
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  margin-bottom: 1em;
  img {
    max-width: 5em;
    height: 90%;
    margin:5px;
  }
}
</style>
