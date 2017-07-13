<template>
  <section class="matcher">
  
    <img :src="nextUser.imgUrl" :class="{'img-smaller': !isShowingDetails }" v-if="nextUser" @click="showDetails"></img>
    <div v-if="isShowingDetails" class="details">
      <span class="big-txt" v-if="nextUser">{{nextUser.fName}}</span>
      <span class="age" v-if="nextUser">{{$store.getters.nextUserAge}}</span>
    </div>
    <div v-else class="left">
      <span class="age " v-if="nextUser">
        <span class="theme">name:</span> {{nextUser.fName}}</span>
      <br>
      <br>
      <span class="age " v-if="nextUser ">
        <span class="theme">age:</span> {{this.$store.getters.nextUserAge}}</span>
      <br>
      <br>
      <span class="age">
        <span class="theme">Description</span> {{nextUser.desc}}</span>
      <br>
      <br>
  
      <span class="age">
        <span class="theme ">Interests</span> {{nextUser.interests}}</span>
      <br>
      <br>
  
    </div>
    <div class="btns ">
      <button @click="changeProfile(false) " class="unlike " :class="{ 'disableBtn': isNextUser} " :disabled="isNextUser ">
        <i class="fa fa-times " aria-hidden="true "></i>
      </button>
      <button @click="changeProfile(true) " class="like " :class="{ 'disableBtn': isNextUser} " :disabled="isNextUser ">
        <i class="fa fa-heart " aria-hidden="true "></i>
      </button>
    </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'matcher',
  beforeCreate() {
    if (!this.$store.state._id) {
      this.$message.error('You are not logged in!');
      this.$router.push('/')
    }
  },
  data() {
    return {
      isShowingDetails: false
    }
  },
  computed: {
    nextUser() {
      return this.$store.getters.nextUser;
    },
    isNextUser() {
      {
        if (this.nextUser === 'Nothing to show!') {
          // console.log('isNextUser', this.$store.getters.nextUser);
          return true;
        }
        return false;
      }
    }
  },
  methods: {
    changeProfile(isLiked) {
      console.log(isLiked)
      // if (this.$store.state.usersToShow.length === 1) this.$store.dispatch('getUsersToShow', this.$store.state._id);
      this.$store.dispatch('like', { targetId: this.nextUser._id, isLiked })
      // console.log('Taly: ', this.nextUser);
    },
    showDetails() {
      this.isShowingDetails = !this.isShowingDetails;
    }
  }
}
</script>

<style lang="scss" scoped>
.disableBtn {
  cursor: not-allowed;
  opacity: 0.6;
}

.left {
  text-align: left
}

.img-container {
  width: 100%;
}

.img-smaller {
  width: 80%;
}

// .space {
//   margin: 2em 0;
//   padding: 2em 0;
//   height: 1em;
// }
.btns {
  position: fixed;
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
  border: 1px solid gray;
  width: 50px;
  height: 50px;
  font-weight: bold;
  font-size: 25px;
  cursor: pointer;
}

.like {
  color: white;
  background-color: lightgreen;
}

.unlike {
  background-color: red;
  color: white;
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
