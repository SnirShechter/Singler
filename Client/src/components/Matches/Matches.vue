<template>
  <div class="matches">
    <ul>
      <chat-preview :key="match.id" v-for="match in matches"></chat-preview>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Matches',
  data() {
    return {
    }
  }
}
</script>

<style lang="scss">
</style>
