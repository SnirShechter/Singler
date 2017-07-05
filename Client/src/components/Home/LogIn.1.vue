<template>
    <section class="log-in">
        </el-alert>
        <h1> Singler</h1>
        <el-input class="sign-in" type="text" placeholder="Username" v-model="username"></el-input>
        <el-input class="sign-in" type="password" placeholder="Password" v-model="password"></el-input>
        <el-button class="sign-in" type="primary">Log in</el-button>
        <el-button class="sign-in facebook" type="primary">Sign in with Facebook</el-button>
        <el-button class="sign-in" type="primary">Success</el-button>
        
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
    align-items: center;
    justify-content: space-around;
}

.facebook {
    background-color: #3b5998;
    color: white;
    &:hover {
        background-color: #3b5998;
        opacity: 0.8;
    }
}


.sign-in{
   //  background-color: #f4424b;
     margin: 2em 0 0 0 !important;
     width: 100%;
}

</style>
