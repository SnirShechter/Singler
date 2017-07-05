<template>
  <section class="matcher">
    <div class="img">
  
    </div>
    <img src="../../assets/profile.png">
    </img>
    <div class="details">
      <p class="onImg">
        <span class="theme">Name</span> Snir Shechter</p>
        <p><span class="theme">Birthdate</span> 25.5.12</p>
      </p>
      <p>
        <span class="theme">Description</span> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam consequuntur necessitatibus excepturi culpa eaque sed temporibus, mollitia, consectetur, voluptates aliquam dolorem cumque veritatis neque, est aliquid? Nobis eaque unde in.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam consequuntur necessitatibus excepturi culpa eaque sed temporibus, mollitia, consectetur, voluptates aliquam dolorem cumque veritatis neque, est aliquid? Nobis eaque unde in. </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Matcher',
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  border: 1px solid white;
  width: 100%;
  margin-top: 20px;
  max-width: 450px;
}

.details {
  text-align: left;
}
</style>
