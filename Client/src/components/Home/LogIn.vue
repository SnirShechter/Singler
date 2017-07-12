<template>
    <section class="login" @keyup="keymonitor">
        <h1>
            <span class="theme"> Singler </span>
        </h1>
        <el-input class="sign-in" type="text" placeholder="Username" v-model="username"></el-input>
        <el-input class="sign-in" type="password" placeholder="Password" v-model="password"></el-input>
        <el-button class="sign-in" type="primary" @click="login">Log in</el-button>
        <!--<el-button class="sign-in facebook" type="primary">Sign in with Facebook</el-button>
        <el-button class="sign-in facebook" type="primary" @click="sendMsg">Send dummy msg</el-button>-->
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
            console.log(this.username, this.password);
            this.$store.dispatch('login', { uName: this.username, password: this.password })
        },
        sendMsg() {
            this.$store.dispatch('sendMsg')
        },
        keymonitor(event) {
            // console.log(event.key);
            if (event.key === "Enter") {
                console.log("enter key was pressed!");
                // console.log('the id of the input was: ' + event.currentTarget.id);
                this.login();
            }
        }
    },
    computed: {
        showErrorIfNotReg() {
            return this.$store.state.numUnRegLogin;
        },
        goToMatcherScreen() {
            return this.$store.state.toMatcher;
        }
    },
    watch: {
        showErrorIfNotReg(newVal) {
            this.$notify.error({
                title: 'Error',
                message: 'Cannot login, please register!!!'
            })
        },
        goToMatcherScreen() {
            if (this.$store.state.toMatcher) this.$router.push('matcher');
        }
    }
}
</script>


<style lang="scss">
.log-in {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: space-around;
}

h1 {
    // color: var(--theme-color);
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
    //  background-color: #f4424b;
    margin: 2em 0 0 0 !important;
    width: 100%;
}

router-link {
    color: var(--theme-color);
}
</style>
