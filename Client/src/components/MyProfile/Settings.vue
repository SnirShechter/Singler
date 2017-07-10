<template>
  <section class="settings">
    <h1>
      <span class="theme">Settings</span>
    </h1>
    <h2>{{$store.state.profile.fName+ ' '+ $store.state.profile.lName}}</h2>
      
    <div class="block">
      <span class="theme">matching age:</span>
      <el-slider v-model="filtermap.ageRange" class="ages" range show-stops :min="18" :max="120">
      </el-slider>
    </div>
  
    <!--<div>
      <span jfd3`ssayerrclass="theme">matching gender:</span>
      <el-radio-group v-model="prefs.genderPref">
        <el-radio class="radio" :label="1">male</el-radio>
        <el-radio class="radio" :label="2">female</el-radio>
        <el-radio class="radio" :label="3">both</el-radio>
      </el-radio-group>
    </div>-->
  </section>
</template>

<script>
export default {
  name: 'match',
  data() {
    return {
       filtermap: {
        female: false,
        male: false,
        ageRange: [this.$store.state.filtermap.minAge, this.$store.state.filtermap.maxAge]
      }
    }
  },
  methods: {


  }
}
</script>

<style lang="scss">

</style>
