<template>
  <section class="matches">
    <ul v-if="isInChat">
      <chat-preview v-for="currMatch in matches" :match="currMatch" :key="currMatch.id" @click.native="selectMatch(currMatch)"></chat-preview>
    </ul>
    <component v-else  :matchId="selected" @toggleChat="toggleChat" :is="chatName"></component>
  </section>
</template>

<script>
import chatPreview from './ChatPreview'
import chat from './chat'
export default {
  name: 'Matches',
  data() {
    return {
      selected: null,
      chatName: 'chat',
       isInChat: true,
    }

  },
  methods: {
    selectMatch(currMatch) {
      // this.$router.push('/chat/'+currMatch._Id)
      console.log('selceting match : ', currMatch._Id)
      this.selected = currMatch._Id;
      this.isInChat = !this.isInChat;
    },
    toggleChat() {
      this.isInChat = !this.isInChat;
    }
  },
  computed: {
    matches() {
      // console.log(this.$store.getters.getMatches)
      return this.$store.getters.getMatches;
    },
  },
  components: {
    chatPreview, chat
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
