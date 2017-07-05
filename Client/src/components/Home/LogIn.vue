<template>
    <section class="log-in">
        <h1> Singler></h1>
        <input v-model="username" placeholder="Username" type="text">
        <input v-model="password" placeholder="Password" type="password">
        <button>Log in</button>
        <button class="facebook">Sign in with Facebook</button>
        <button>Register</button>
    </section>
</template>

<script>
export default {
  name: 'log-in',
  data() {
        return {
            username: '',
            password: ''
        }
    }
}
</script>

<style lang="scss">
.log-in {
    display: flex;
    flex-flow: column wrap;
}
</style>
