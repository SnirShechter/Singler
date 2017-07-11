<template>
  <section class="myProfile">
    <h1>
      <span class="theme">{{$store.state.profile.fName+ ' '+ $store.state.profile.lName}}</span>
    </h1>
    <img src="../../assets/profile.png"></img>
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
  
        <div class="editMode">
          <span class="theme">Image</span>
          <el-input v-model="profile.picUrl"></el-input>
        </div>
      </div>
      <!--////////////////////////////////////////////////////////-->
      <!--<div class="editMode">
              <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog v-model="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt>
              </el-dialog>
            </div>-->
      <!--////////////////////////////////////////////////////////-->
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
import moment from 'moment'
export default {
  name: 'MyProfile',
  created() {
  },
  data() {
    return {
      presentMode: true,
      datePresent: moment(this.$store.state.profile.birthdate).format('L'),
      profile: {
        fName: this.$store.state.profile.fName,
        lName: this.$store.state.profile.lName,
        interests: this.$store.state.profile.interests,
        desc: this.$store.state.profile.desc,
        birthdate: this.$store.state.profile.birthdate,
        isMale: this.$store.state.profile.isMale,
        picUrl: this.$store.state.profile.picUrl
      },
      // dialogImageUrl: 'https://organicthemes.com/demo/profile/files/2012/12/profile_img.png',
      // dialogVisible: false
    }
  },
  methods: {
    editProfile() {
      // this.$notify({
      //   title: 'Success',
      //   message: 'This is a success message',
      //   type: 'success'
      // });
      // this.$router.push('/myprofile/edit')  
      this.presentMode = !this.presentMode
    },
    commitChange() {
      // this.presentMode = !this.presentMode,
      // filterMatch
      console.log(this.profile);
      // this.$store.dispatch('editFilterMatch', { filterMatch: filterMatch });
      this.$store.dispatch('editProfile', this.profile );
    },
    cancel() {
      this.presentMode = !this.presentMode
    },
    goToSettings() {
      this.$router.push('/myprofile/settings')
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      console.log('in handleRemove function');
    },
    handlePictureCardPreview(file) {
      console.log('in handlePictureCardPreview function');
      // this.dialogImageUrl = file.url;
      // this.dialogVisible = true;
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
  .theme {
    margin-right: 1em;
    padding: 0;
  }
  p {
    display: inline;
  }
}
</style>
