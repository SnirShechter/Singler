<template>
  <section class="myProfile">
    <h1>
      <span class="theme">Snir Shechter</span>
    </h1>
    <img src="../../assets/profile.png"></img>
    <div class="details">
      <p>
        <span class="theme">First Name</span> Snir</p>
      <p>
        <span class="theme">Last Name</span> Shechter</p>
      <p>
        <span class="theme">Birthdate</span> 25.5.12</p>
      <p>
        <span class="theme">Gender</span> Male</p>
      <p>
        <span class="theme">Interests</span> Soccer, Baseball, Basketball, Gaming, Running </p>
      <p>
        <span class="theme">Description</span> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam consequuntur necessitatibus excepturi culpa eaque sed temporibus, mollitia, consectetur, voluptates aliquam dolorem cumque veritatis neque, est aliquid? Nobis eaque unde in.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam consequuntur necessitatibus excepturi culpa eaque sed temporibus, mollitia, consectetur, voluptates aliquam dolorem cumque veritatis neque, est aliquid? Nobis eaque unde in. </p>
      <div class="btns">
        <el-button @click="showLikes" type="primary"> ✎ Edit</el-button>
        <el-button @click="commitChange" type="primary"> ⚙ Settings</el-button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MyProfile',
  data() {
    return {
    }
  }
  , methods: {
    showLikes() {
      console.log(this.$store.state.user);
      this.$notify({
        title: 'Success',
        message: 'This is a success message',
        type: 'success'
      });
    },
    commitChange() {
      // var like = {'522': true};
      this.$store.commit('like', { '522': true })
    }
  }
}
</script>

<style lang="scss" scoped>
.details {
  * {
    text-align: left;
  }
  .btns {
    display: flex;
    justify-content: space-around;
  }
}
</style>
