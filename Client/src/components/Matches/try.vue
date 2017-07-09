<template>
  <section class="matches">
    <h1> heyyyyyyyyyyyyyyy</h1>
  </section>
</template>

<script>
import chat from './Chat'
export default {
  name: 'Matches',
//   computed: {
//     matches() {
//       // console.log(this.$store.getters.getMatches)
//       return this.$store.getters.getMatches;
//     },
  },
    components: {
      chatPreview
    }
  }
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;  
}
</style>
