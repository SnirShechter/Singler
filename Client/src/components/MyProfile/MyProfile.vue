<template>
  <section class="myProfile">
    <h1>
      <span class="theme">{{this.profile.fName+ ' '+ this.profile.lName}}</span>
    </h1>
    <img src="../../assets/profile.png"></img>
    <div class="details">
      <p>
        <span class="theme">First Name</span> {{this.profile.fName}}</p>
      <p>
        <span class="theme">Last Name</span> {{this.profile.lName}}</p>
      <p>
        <span class="theme">Birthdate</span> 25.5.12</p>
      <p>
        <span class="theme">Gender</span> Male</p>
      <p>
        <span class="theme">Interests</span>{{this.$store.getters.myAge}}</p>
      <p>
        <span class="theme">Description</span> {{this.profile.desc}} </p>
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
      profile:this.$store.state.user.profile
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
      var like = {'522': true};
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
