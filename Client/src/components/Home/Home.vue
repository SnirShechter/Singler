<template>
  <section class="home">
   <h1> home </h1>
    <login></login>
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
