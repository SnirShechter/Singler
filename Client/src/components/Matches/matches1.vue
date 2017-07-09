<template>
  <section class="matches">
    <li>
     <chat-preview v-for="currMatch in matches" :match="currMatch" :key="currMatch.id"  ></chat-preview>
     
    </li>
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
li {
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start; 
  cursor: pointer; 
}
</style>
