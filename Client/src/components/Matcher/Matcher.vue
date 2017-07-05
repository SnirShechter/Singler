<template>
  <section class="matcher">
    <img src="../../assets/profile.png"></img>
    <div class="details">
      <p><span class="big-txt theme">Snir</span>, <span class="age">23</span></p>
      <hr />
      <p><span class="theme"></span> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam consequuntur necessitatibus excepturi culpa eaque sed temporibus, mollitia, consectetur, voluptates aliquam dolorem cumque veritatis neque, est aliquid? Nobis eaque unde in.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam consequuntur necessitatibus excepturi culpa eaque sed temporibus, mollitia, consectetur, voluptates aliquam dolorem cumque veritatis neque, est aliquid? Nobis eaque unde in. </p>
      <p><span class="theme big-txt">Interests</span><br /> Soccer, Baseball, Basketball, Gaming, Running </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Matcher',
  data() {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  margin-top: 20px;
  max-width: 450px;
}
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
