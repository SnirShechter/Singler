<template>
  <section class="matcher">
    <img src="../../assets/userImgs/UzaE0Uk.jpg" v-if="nextUser"></img>
    <p class="details">
      <span class="big-txt" v-if="nextUser">{{this.nextUser.profile.fName}}</span>
      <span class="age" v-if="nextUser">{{this.$store.getters.nextUserAge}}</span>
    </p>
    <div class="btns">
      <button @click="changeProfile(false)" class="unlike">X</button>
      <button @click="changeProfile(true)" class="like">V</button>
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
  computed: {
    nextUser() {
      return this.$store.getters.nextUser;
    }
  },
  methods: {
    changeProfile(isLiked) {
      console.log(this.nextUser);
      this.$store.commit('like', { targetId: this.nextUser._id, isLiked })
    }
  }
}
</script>

<style lang="scss" scoped>
.btns{
  position: fixed;
    bottom: 25px;
    left:50%;
    transform: translate(-50%)
}
button {
  margin: 20px;
  border-radius: 50%;
  text-align: center;
  background-color: white;
  border: 2px solid gray;
  width: 50px;
  height: 50px;
}
.like {
  color: lightgreen;
}
.unlike {
  color: red;
}

img {
  width:100%;
  margin-top: 20px;
  max-width: 500px;
  max-height: 100vh;
}

.details {
  text-align: left;
  line-height: 56px;
  margin: 0;
  padding: 0;
  position: relative;
  bottom: 56px;
}
</style>
