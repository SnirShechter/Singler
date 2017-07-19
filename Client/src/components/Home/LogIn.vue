<template>
    <section class="login" @keyup.enter="login">
        <h1>
            <span class="theme"> Singler </span>
        </h1>
        <el-input class="sign-in" type="text" placeholder="Username" v-model="username"></el-input>
        <el-input class="sign-in" type="password" placeholder="Password" v-model="password"></el-input>
        <el-button class="sign-in" type="primary" @click="login">Log in</el-button>
        <p>Don't have an account yet?
            <router-link to="/register"> Register now! </router-link>
        </p>
    </section>
</template>

<script>

export default {
    name: 'login',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
            this.$store.dispatch('login', { uName: this.username, password: this.password })
        }
    }
}
</script>


<style lang="scss">
.log-in {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: space-between;
}

h1 {
    font-size: 2em;
}

.facebook {
    background-color: #3b5998;
    color: white;
    &:hover {
        background-color: #3b5998;
        opacity: 0.8;
    }
}


.sign-in {
    margin: 2em 0 0 0 !important;
    width: 100%;
}

a {
    color: var(--theme-color);
}
</style>
