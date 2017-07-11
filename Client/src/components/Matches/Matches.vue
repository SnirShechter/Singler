<template>
  <section class="matches">
    <ul v-if="!isInChat">
      <chat-preview v-for="match in this.$store.state.matches" :match="match" :key="match._id" @click.native="selectMatch(match)"></chat-preview>
    </ul>
    <!--<transition name="component-fade" mode="out-in">-->
    <component v-else :match="selected" @toggleChat="toggleChat" is="chat"></component>
  </section>
</template>

<script>
import chatPreview from './ChatPreview'
import chat from './Chat'
export default {
  name: 'Matches',
  data() {
    return {
      selected: null,
      isInChat: false
    }
  },
  methods: {
    selectMatch(match) {
      console.log('selecting match : ', match)
      this.selected = match;
      this.$store.dispatch('getAllMatchMsgs', this.selected)
      this.toggleChat();
    },
    toggleChat() {
      this.isInChat = !this.isInChat;
    }
  },
  computed: {
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
