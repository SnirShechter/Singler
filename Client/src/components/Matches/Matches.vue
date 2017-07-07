<template>
  <section class="matches">
    <ul>
     <chat-preview v-for="currMatch in matches" :match="currMatch" :key="currMatch.id"  ></chat-preview>
     
    </ul>
  </section>
</template>

<script>
import chatPreview from './ChatPreview'
export default {
  name: 'Matches',
  computed: {
    matches() {
      // console.log(this.$store.getters.getMatches)
      return this.$store.getters.getMatches;
    },
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
