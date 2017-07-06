<template>
  <section class="matches">
    <ul>
      <!--<chat-preview :key="match.id" v-for="match in matches"></chat-preview>-->
      <chat-preview></chat-preview>
    </ul>
  </section>
</template>

<script>
import chatPreview from './ChatPreview'
export default {
  name: 'Matches',
  data() {
    return {
      matches: {


      }
    }
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
  
}
</style>
