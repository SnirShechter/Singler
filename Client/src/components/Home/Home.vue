<template>
  <section class="home">
    <login></login>
    <log-in></log-in>
  </section>
</template>

<script>
import login from './LogIn'
export default {
  name: 'home',
  data() {
    return {
    }
  },
  components: {
    login
  }
}
</script>

<style lang="scss">

</style>
