<template>
  <section class="settings">
    <h1>
      <span class="theme">Settings</span>
    </h1>
    <h2>{{$store.state.profile.fName+ ' '+ $store.state.profile.lName}}</h2>
  
    <div class="block">
      <span class="theme">matching age:</span>
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
export default {
  name: 'match',
  created: {


  },
  data() {
    return {
      female: false,
      male: false,
      genderPref: null,
      ageRange: [this.$store.state.filtermap.minAge, this.$store.state.filtermap.maxAge],
    }
  },
  computed: {
    femalePref() {
      if (this.genderPref == 1)
        return false;
      return true;
    },
    malePref() {
      if (this.genderPref == 2)
        return false;
      return true;
    }
  },
  watch: {
    genderPref: function (val) {
      if (this.$store.state.filtermap.female === true && this.$store.state.filtermap.male === true)
        return 3;
      else if (this.$store.state.filtermap.female === 2)
        return 2;
      else
        return 1;
    }
    //msgService.onTyping();
  },
  methods: {
    submit() {
      var filtermatch = {
        female: this.femalePref,
        male: this.malePref,
        minAge: ageRange[0],
        maxAge: ageRange[1]
      }
      this.$store.dispatch('editFilterMatch', { filtermatch: this.filtermatch });
    },
    cancel() {
      this.$router.push('/myprofile')
    },
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
