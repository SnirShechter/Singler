<template>
  <section class="myProfile">
    <h1>
      <span class="theme">{{$store.state.profile.fName+ ' '+ $store.state.profile.lName}}</span>
    </h1>
    <img :src="$store.state.profile.imgUrl" class="imgProfile"></img>
    <div class="details">
      <div v-if="presentMode" class="editMode">
        <span class="theme">First Name</span>
        {{$store.state.profile.fName}}
      </div>
      <div v-else class="editMode">
        <span class="theme">First Name</span>
        <el-input v-model="profile.fName"></el-input>
      </div>
  
      <div v-if="presentMode" class="editMode">
        <span class="theme">Last Name</span>
        {{$store.state.profile.lName}}
      </div>
      <div v-else class="editMode">
        <span class="theme">Last Name</span>
        <el-input v-model="profile.lName">
        </el-input>
      </div>
  
      <div v-if="presentMode" class="editMode">
        <span class="theme">Birthdate</span>
        {{datePresent}}
        </el-date-picker>
      </div>
  
      <div v-else class="editMode">
        <span class="theme">Birthdate</span>
        <el-date-picker v-model="profile.birthdate" type="date" class="date-picker input-model" placeholder="Birthday"> </el-date-picker>
      </div>
  
      <div v-if="presentMode" class="editMode">
        <span class="theme">Gender</span>
        {{$store.getters.myGender}}
      </div>
      <div v-else class="editMode">
        <span class="theme">Gender</span>
        <el-radio-group v-model="profile.isMale">
          <el-radio class="radio" :label="true">male</el-radio>
          <el-radio class="radio" :label="false">female</el-radio>
        </el-radio-group>
      </div>
  
      <div class="editMode" v-if="presentMode">
        <span class="theme">Interests</span>
        {{$store.state.profile.interests}}
      </div>
      <div class="editMode" v-else>
        <span class="theme">Interests</span>
        <el-input v-model="profile.interests"></el-input>
      </div>
  
      <div class="editMode" v-if="presentMode">
        <span class="theme">Description</span>
        {{$store.state.profile.desc}}
      </div>
  
      <div class="editMode" v-else>
        <span class="theme">Description</span>
  
        <el-input v-model="profile.desc"></el-input>
      </div>
  
      <div class="editMode" v-if="!presentMode">
        <upload-img @imageUploaded="imageUploaed"></upload-img>
      </div>
  
      <div v-if="presentMode" class="btns">
        <el-button @click="editProfile" type="primary">
          <i class="el-icon-edit"></i> Edit</el-button>
        <el-button @click="goToSettings" type="primary">
          <i class="el-icon-setting"></i> Settings</el-button>
      </div>
      <div v-else class="btns">
        <el-button @click="commitChange" type="primary"> Save</el-button>
        <el-button @click="cancel" type="primary"> Cancel</el-button>
      </div>
    </div>
  </section>
</template>

<script>

import UploadImg from '../General/upload'

import moment from 'moment'
export default {
  name: 'MyProfile',
  beforeCreate() {
    if (!this.$store.state._id) {
      this.$message.error('You are not logged in!');
      this.$router.push('/')
    }
  },
  data() {
    return {
      presentMode: true,
      datePresent: moment(this.$store.state.profile.birthdate).format('L'),
      profile: JSON.parse(JSON.stringify(this.$store.state.profile))
    }
  },
  methods: {
    imageUploaed(url) {
      console.log(url);
      this.profile.imgUrl = url;
    },
    editProfile() {
      this.presentMode = !this.presentMode
    },
    commitChange() {
      // this.presentMode = !this.presentMode,
      // filterMatch
      console.log(this.profile);
      this.presentMode = !this.presentMode,
        this.$store.dispatch('editProfile', this.profile)

      // this.$store.dispatch('editFilterMatch', { filterMatch });
    },
    cancel() {
      this.presentMode = !this.presentMode
    },
    goToSettings() {
      this.$router.push('/myprofile/settings')
    }
  },
  components: {
    UploadImg
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
  .theme {
    margin-right: 1em;
    padding: 0;
  }
  p {
    display: inline;
  }

  .imgProfile {
    max-width: 10px;
  }
}
</style>
