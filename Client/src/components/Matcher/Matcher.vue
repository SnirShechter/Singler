<template>
  <section class="matcher">
    <div v-if="isNextUser">
  
      <div class="background-img img-container" :class="{'img-smaller': isShowingDetails }" :style="{'background-image': 'url('+nextUser.imgUrl+')'}" v-if="nextUser" @click="showDetails"></div>
  
      <div v-if="!isShowingDetails" class="details">
        <span class="big-txt" v-if="nextUser">{{nextUser.fName}}</span>
        {{$store.getters.nextUserAge}}
      </div>
  
      <div v-else class="left">
        <span class="theme">Name </span> {{nextUser.fName}} {{nextUser.lName}}
        <br />
        <br />
        <span class="theme">Age </span> {{this.$store.getters.nextUserAge}}
        <br />
        <br />
        <span class="theme">Description </span> {{nextUser.desc}}
        <br />
        <br />
        <span class="theme ">Interests </span> {{nextUser.interests}}
      </div>
  
    </div>
  
    <div v-else class="noUsersMsg">
      <p class="mainMsg">
        There are currently no users matching your criteria. you can either
        <router-link to="../myprofile/settings" class="link">change</router-link> your filter settings or....
      </p>
      <br/>
      <br/>
      <div>
        <h2 class="theme">Give another chance</h2>
        <p>Reset the unlikes you marked and give those people another shot!</p>
        <el-button type="primary" @click="resetUnlikes">Reset</el-button>
      </div>
    </div>
  
    <div class="btns" v-if="isNextUser">
      <button @click="changeProfile(false)" class="unlike">
        <i class="fa fa-times" aria-hidden="true "></i>
      </button>
      <button @click="changeProfile(true)" class="like">
        <i class="fa fa-heart" aria-hidden="true "></i>
      </button>
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
      if (typeof this.nextUser !== 'string') return true;
      else return false;
    }
  },
  methods: {
    changeProfile(isLiked) {
      this.$store.dispatch('like', { targetId: this.nextUser._id, isLiked })
    },
    showDetails() {
      this.isShowingDetails = !this.isShowingDetails;
    },
    resetUnlikes() {
      this.$store.dispatch('resetUnlikes')
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  color: #f4424b;
  font-weight: bold;
}

.matcher {
  text-align: center;
}

.noUsersMsg {
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  * {
    text-align: center;
  }
  .mainMsg {
    font-size: 1.3em;
  }
}

.left {
  text-align: left
}

.btns {
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%);
  text-align: center;
  display: flex;
  flex-direction: row;
  height: 50px;
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
    outline: none;
  }
  .unlike {
    background-color: red;
    color: white;
    outline: none;
    &:focus {
      background-color: red;
    }
  }
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

.img-container {
  display: inline-block;
  width: 100%;
  height: 70vh;
  border-radius: 10px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  display: inline-block;
}

.img-smaller {
  width: 80%;
  height: 300px;
}
</style>
