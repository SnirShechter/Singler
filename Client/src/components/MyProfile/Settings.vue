<template>
  <section class="settings">
    <h1>
      <span class="theme">Settings</span>
    </h1>
    <h2>{{$store.state.profile.fName+ ' '+ $store.state.profile.lName}}</h2>
  
    <div class="block">
      <span class="theme">Matching age:</span>
      <el-slider v-model="ageRange" class="ages" range show-stops :min="18" :max="120">
      </el-slider>
    </div>
  
    <div>
      <span class="theme">matching gender:</span>
      <el-radio-group v-model="genderPref">
        <el-radio class="radio" :label="1">male</el-radio>
        <el-radio class="radio" :label="2">female</el-radio>
        <el-radio class="radio" :label="3">both</el-radio>
      </el-radio-group>
    </div>
    <div class="btns">
      <el-button type="primary" @click="submit">Save Changes</el-button>
      <el-button type="primary" @click="cancel">Cancel</el-button>
    </div>
  </section>
</template>

<script>
import router from '../../router'
export default {
  name: 'match',
  beforeCreate() {
    if (!this.$store.state._id) {
      this.$message.error('You are not logged in!');
      this.$router.push('/')
    }
  },
  data() {
    return {
      female: false,
      male: false,
      genderPref: this.getGenderPref(),
      ageRange: [this.$store.state.filtermap.minAge, this.$store.state.filtermap.maxAge],
    }
  },
  methods: {
    getGenderPref() {
      if (this.$store.state.filtermap.female && this.$store.state.filtermap.male)
        return 3;
      else if (this.$store.state.filtermap.female)
        return 2;
      else
        return 1;
    },
    submit() {
      var filtermatch = {
        female: !(this.genderPref == 1),
        male: !(this.genderPref == 2),
        minAge: this.ageRange[0],
        maxAge: this.ageRange[1]
      }
      this.$store.dispatch('editFilterMatch', filtermatch);
      router.go(-1);
    },
    cancel() {
      router.go(-1);
    }
  }
}
</script>

<style lang="scss">
.btns {
  display: flex;
  flex-direction: row nowrap;
  justify-content: space-around;
  margin: 1em 0;
}

.register {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
}

.ages {
  margin: 0 0.5em;
}
</style>
