<template>
  <section class="myProfile">
    <h1>
      <span class="theme">{{$store.state.profile.fName+ ' '+ $store.state.profile.lName}}</span>
    </h1>
    <img src="../../assets/profile.png"></img>
    <div class="details">
      <div class="editMode">
        <span class="theme">First Name</span>
        <p v-if="presentMode">{{$store.state.profile.fName}}</p>
        <el-input v-else v-model="fName"></el-input>
      </div>
      <div class="editMode">
        <span class="theme">Last Name</span>
        <p v-if="presentMode">{{$store.state.profile.lName}}</p>
        <el-input v-else v-model="lName">
        </el-input>
      </div>
      <div class="editMode">
        <span class="theme">Birthdate</span>
        <p v-if="presentMode">{{$store.getters.myAge}}</p>
        <el-date-picker v-else v-model="birthdate" type="date" class="date-picker input-model" placeholder="Birthday"> </el-date-picker>
      </div>
      <div class="editMode">
        <span class="theme">Gender</span>
        <p v-if="presentMode">{{$store.getters.myGender}}</p>
        <el-radio-group v-else v-model="isMale">
          <el-radio class="radio" :label="true">male</el-radio>
          <el-radio class="radio" :label="false">female</el-radio>
        </el-radio-group>
      </div>
      <div class="editMode">
        <span class="theme">Interests</span>
        <p v-if="presentMode">{{$store.state.profile.interests}}</p>
        <el-input v-else v-model="interests"></el-input>
      </div>
      <div class="editMode">
        <p>
          <span class="theme">Description</span>
          <p v-if="presentMode">{{$store.state.profile.desc}} </p>
          <el-input v-else v-model="desc"></el-input>
      </div>
      <div v-if="presentMode" class="btns">
        <el-button @click="editProfile" type="primary"> ✎ Edit</el-button>
        <el-button @click="commitChange" type="primary"> ⚙ Settings</el-button>
      </div>
      <div v-else class="btns">
        <el-button @click="commitChange" type="primary"> Save</el-button>
        <el-button @click="cancel" type="primary"> Cancel</el-button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MyProfile',
  data() {
    return {
      presentMode: false,
      fName: this.$store.state.profile.fName,
      lName: this.$store.state.profile.lName,
      interests: this.$store.state.profile.interests,
      desc: this.$store.state.profile.desc,
      birthdate: this.$store.state.profile.birthdate,
      isMale: this.$store.state.profile.isMale
    }
  }
  , methods: {
    editProfile() {
      // this.$notify({
      //   title: 'Success',
      //   message: 'This is a success message',
      //   type: 'success'
      // });
      this.presentMode = !this.presentMode
    },
    commitChange() {
      this.presentMode = !this.presentMode

    },
    cancel() {
      this.presentMode = !this.presentMode

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
  .editMode {
    display: flex;
    flex-flow: row nowrap;
    text-justify: space-between;
    margin: 1em;
  }
}
</style>
