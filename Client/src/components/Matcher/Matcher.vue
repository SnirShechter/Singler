<template>
  <section class="matcher">
    <div class="img-container">
      <img src="../../assets/userImgs/sample.jpg" v-if="nextUser"></img>
      <p class="details">
        <span class="big-txt" v-if="nextUser">{{this.nextUser.profile.fName}}</span>
        <span class="age" v-if="nextUser">{{this.$store.getters.nextUserAge}}</span>
      </p>
    <div class="btns">
      <button @click="changeProfile(false)" class="unlike">X</button>
      <button @click="changeProfile(true)" class="like">V</button>
    </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'matcher',
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
.img-container {
  width:100%;
}

.btns {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%);
  text-align: center;
  display:flex;
  flex-direction: row;
  height:50px;
}

button {
  margin: 2%;
  border-radius: 50%;
  text-align: center;
  background-color: white;
  border: 2px solid gray;
  width: 50px;
  height: 50px;
  font-weight: bold;
  font-size: 25px;
}

.like {
  color: lightgreen;
}

.unlike {
  color: red;
}

img {
  margin-top: 20px;
  max-width: 500px;
  max-height: 70vh;
}

.details {
  color: white;
  text-align: left;
  line-height: 56px;
  margin: 0;
  padding: 0;
  position: relative;
  bottom: 56px;
}
</style>
