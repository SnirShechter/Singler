<template>
  <section class="matches" :class='{fullscreen: isInChat}'>
    <ul v-if="!isInChat">
      <chat-preview v-for="match in this.$store.state.matches" :match="match" :key="match._id" @click.native="selectMatch(match)"></chat-preview>
    </ul>
    <!--<transition name="component-fade" mode="out-in">-->
    <component v-else :match="selected" @enableNav="enableNav" @disableNav="disableNav" @toggleChat="toggleChat" is="chat"></component>
  </section>
</template>

<script>
import chatPreview from './ChatPreview'
import chat from './Chat'
export default {
  name: 'Matches',
  beforeCreate() {
    if (!this.$store.state._id) {
      this.$message.error('You are not logged in!');
      this.$router.push('/')
    }
  },
  data() {
    return {
      selected: null,
      isInChat: false
    }
  },
  methods: {
    selectMatch(match) {
      // console.log('selecting match : ', match)
      this.selected = match;
      this.$store.dispatch('getAllMatchMsgs', this.selected)
      this.toggleChat();
    },
    toggleChat() {
      this.isInChat = !this.isInChat;
    },
    enableNav() {
      this.$emit('enableNav')
    },
    disableNav() {
      this.$emit('disableNav')
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
.fullscreen {
  width: 100vw !important;
  height: 100vh !important;
}

ul {
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
}
</style>
