<template>
  <section class="matches">
    <ul v-if="isInChat">
      <chat-preview v-for="currMatch in matches" :match="currMatch" :key="currMatch.id" @click.native="selectMatch(currMatch)"></chat-preview>
    </ul>
    <!--<transition name="component-fade" mode="out-in">-->
    <component v-else :matchId="selected" @toggleChat="toggleChat" :is="chatName"></component>
  </section>
</template>

<script>
import chatPreview from './ChatPreview'
import chat from './Chat'
export default {
  name: 'Matches',
  created() {
    // this.$store.dispatch('getAllMatchMsgs', this.$store.state.matches[0]._Id)
  },
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
      console.log('selecting match : ', currMatch._Id)
      this.selected = currMatch._Id;
      this.isInChat = !this.isInChat;
    },
    toggleChat() {
      this.isInChat = !this.isInChat;
    }
  },
  computed: {
    matches() {
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
