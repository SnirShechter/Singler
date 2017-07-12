<template>
  <section class="register">
    <h1>
      <span class="theme"> user details </span>
    </h1>
    <el-input class="input-model" placeholder="Username" type="text" v-model="prefs.uName"> </el-input>
    <el-input class="input-model" placeholder="Password" type="password" v-model="prefs.password"> </el-input>
    <el-input class="input-model" placeholder="Repeat password" v-model="prefs.repeatPassword" type="password"> </el-input>
    <span class="error" v-if="prefs.repeatPassword !== prefs.password">Passwords don't match!</span>
    <h1>
      <span class="theme"> profile </span>
    </h1>
    <div>
      <el-input class="input-model nameInput" placeholder="First name" type="text" v-model="profile.fName"> </el-input>
      <el-input class="input-model nameInput" placeholder="Last name" type="text" v-model="profile.lName"> </el-input>
    </div>
    <el-date-picker v-model="profile.birthdate" type="date" class="date-picker input-model" placeholder="Birthday">
    </el-date-picker>
    <el-input class="input-model" v-model="profile.interests" placeholder="Interests"> </el-input>
  
    <el-input class="input-model" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Description" v-model="profile.desc">
    </el-input>
    <br>
    <div>
      <span class="theme">gender</span>
      <el-radio-group v-model="profile.isMale">
        <el-radio class="radio" :label="true">male</el-radio>
        <el-radio class="radio" :label="false">female</el-radio>
      </el-radio-group>
    </div>
    <!--  
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="profile.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>-->
  
    <h1 span class="theme">match preferance</span>
    </h1>
  
    <div class="block">
      <span class="theme">matching age:</span>
      <el-slider v-model="filtermap.ageRange" class="ages" range show-stops :min="18" :max="120">
      </el-slider>
    </div>
  
    <div>
      <span class="theme">matching gender:</span>
      <el-radio-group v-model="prefs.genderPref">
        <el-radio class="radio" :label="1">male</el-radio>
        <el-radio class="radio" :label="2">female</el-radio>
        <el-radio class="radio" :label="3">both</el-radio>
      </el-radio-group>
    </div>
    <el-button type="primary" @click="submit">Submit</el-button>
    <!--<el-button type="primary" @click="cl">Console</el-button>-->
  </section>
</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'
export default {

  name: 'register',
  data() {
    return {
      prefs: {
        genderPref: 3,
        repeatPassword: '',
        uName: '',
        password: ''
      },
      profile: {
        fName: '',                                   // name: 'Snir Shechter'
        lName: '',                                   // name: 'Snir Shechter'
        birthdate: 0,
        isMale: true,
        interests: '',    // interests: ['Soccer','Gaming','Shopping','Movies']
        imageUrl: '',
        desc: ''                            // desc: 'I love hiking, dancing, shopping, prefer girls with brown hair'
      },
      filtermap: {
        female: false,
        male: false,
        ageRange: [18, 120]
      }
    }
  },
  computed: {
    femalePref() {
      if (this.prefs.genderPref == 1)
        return false;
      return true;
    },
    malePref() {
      if (this.prefs.genderPref == 2)
        return false;
      return true;
    }
  },
  methods: {
    cl() {
      console.log(this.$store.state);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('Avatar picture must be JPG format!');
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!');
      }
      return isJPG && isLt2M;
    },
    submit() {
      var user = {
        uName: this.prefs.uName,
        password: this.prefs.password,
        profile: {
          fName: this.profile.fName,
          lName: this.profile.lName,
          birthdate: this.profile.birthdate,
          imgUrl: 'http://via.placeholder.com/350x350',
          isMale: this.profile.isMale,
          interests: this.profile.interests,
          desc: this.profile.desc
        },
        filtermap: {
          female: this.femalePref,
          male: this.malePref,
          minAge: this.filtermap.ageRange[0],
          maxAge: this.filtermap.ageRange[1]
        }
      }
      // console.log(user); // <----------- CONSOLE.LOG
      if (this.prefs.repeatPassword === user.password) {
        this.$store.dispatch('register', user)
      }
      else
        this.$notify.error({
          title: 'Error',
          message: 'Passwords do not match!'
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

p {
  display: inline;
  width: 100%;
}

.block {
  width: 95%;
}

.ages,
.date-picker {
  width: 100%;
}

.radio {
  margin-left: 1em;
}

.error {
  color: white;
  background-color: red;
  font-weight: bold;
  padding: 5px;
  border-radius: 20px;
}

.register {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: space-around;
}

.nameInput {
  width: 49%;
}

.input-model {
  margin-top: 1em;
  height: 40px;
}
</style>
