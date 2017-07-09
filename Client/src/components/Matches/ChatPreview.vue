<template>
    <section class="matches">
        <li>
            <img class="profile" :src="match.matchedProfile.imgUrl">
            
            <div class="msg-details">
                <p>
                    <span class="theme">{{match.matchedProfile.fName }} {{match.matchedProfile.lName }} </span>
                    {{timestamp}}
                </p>
                <p>
                    {{match.msgs[0].txt}}
                </p>
            </div>
        </li>
        <hr>
    </section>
</template>

<script>
import moment from 'moment'
export default {
    name: 'Matches',
    props: ['match'],
    data() {
        return {
        }
    },
    computed: {
        timestamp: function (msgDate) {
            return moment(msgDate).fromNow();
        }
    }
}
</script>


<style lang="scss" scoped>
li {
    display: flex; // flex-flow: row nowrap;
    align-items: center;
    justify-content: left;

    margin: 0.5em;
}

p {
    text-align: left;
}

.profile {
    border-radius: 50%;
    width: 4.5em;
    height: 4.5em;
}

.msg-details p {
    margin: 1px 0 1px 2em;
    padding: 1px;
    text-align: left;
}

hr {
    margin-left: 20%;
}

.msg {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
