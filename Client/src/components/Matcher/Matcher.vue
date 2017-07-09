<template>
  <section class="matcher">
    <div class="img-container">
      <img src="../../assets/userImgs/sample.jpg" :class="{'img-smaller': isShowingDetails }" v-if="nextUser" @click="showDetails"></img>
      <p :class="{details: !isShowingDetails}">
        <span class="big-txt" v-if="nextUser">{{this.nextUser.fName}}</span>
        <span class="age" v-if="nextUser ">{{this.$store.getters.nextUserAge}}</span>
      </p>
      <div class="btns">
        <button @click="changeProfile(false) " class="unlike ">X</button>
        <button @click="changeProfile(true) " class="like ">V</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'matcher',
  created() {
    this.$store.dispatch('getUsersToShow');
  },
  data() {
    return {
      isShowingDetails: false
    }
  },
  computed: {
    nextUser() {
      return this.$store.getters.nextUser;
    }
  },
  methods: {
    changeProfile(isLiked) {
      if (this.$store.state.usersToShow.length < 5) this.$store.dispatch('getUsersToShow');
      this.$store.dispatch('like', this.nextUser._id, isLiked)
    },
    showDetails() {
      this.isShowingDetails = !this.isShowingDetails;
    }
  }
}
</script>

<style lang="scss" scoped>
.img-container {
  width: 100%;
}

.img-smaller {
  width: 80%;
}

.btns {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%);
  text-align: center;
  display: flex;
  flex-direction: row;
  height: 50px;
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

p {
  text-align: left;
}

.details {
  color: white;
  line-height: 56px;
  margin: 0;
  padding: 0;
  position: relative;
  bottom: 56px;
}
</style>
