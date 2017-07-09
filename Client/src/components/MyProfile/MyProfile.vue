<template>
  <section class="myProfile">
    <h1>
      <span class="theme">{{$store.state.profile.fName+ ' '+ $store.state.profile.lName}}</span>
    </h1>
    <img src="../../assets/profile.png"></img>
    <div class="details">
      <p>
        <span class="theme">First Name</span> {{$store.state.profile.fName}}</p>
      <p>
        <span class="theme">Last Name</span> {{$store.state.profile.lName}}</p>
      <p>
        <span class="theme">Birthdate</span> {{$store.getters.myAge}}</p>
      <p>
        <span class="theme">Gender</span> {{$store.getters.myGender}}</p>
      <p>
        <span class="theme">Interests</span> {{$store.state.profile.interests}}</p>
      <p>
        <span class="theme">Description</span> {{$store.state.profile.desc}} </p>
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
      this.$notify({
        title: 'Success',
        message: 'This is a success message',
        type: 'success'
      });
    },
    commitChange() {
      var like = { '522': true };
      this.$store.commit('like', like)
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
