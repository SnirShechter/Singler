<template>
  <section class="myProfile">
    <h1><span class="theme">Snir Shechter</span></h1>
    <img src="../../assets/profile.png"></img>
    <div class="details">
      <p><span class="theme">First Name</span> Snir</p>
      <p><span class="theme">Last Name</span> Shechter</p>
      <p><span class="theme">Birthdate</span> 25.5.12</p>
      <p><span class="theme">Gender</span> Male</p>
      <p><span class="theme">Interests</span> Soccer, Baseball, Basketball, Gaming, Running </p>
      <p><span class="theme">Description</span> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam consequuntur necessitatibus excepturi culpa eaque sed temporibus, mollitia, consectetur, voluptates aliquam dolorem cumque veritatis neque, est aliquid? Nobis eaque unde in.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam consequuntur necessitatibus excepturi culpa eaque sed temporibus, mollitia, consectetur, voluptates aliquam dolorem cumque veritatis neque, est aliquid? Nobis eaque unde in. </p>
      <div class="btns"><el-button type="primary"> ✎ Edit</el-button><el-button type="primary"> ⚙ Settings</el-button></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MyProfile',
  data() {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
.details{
  *{
    text-align: left;
  }
  .btns{
    display: flex;
    justify-content: space-around;
  }
}
</style>
