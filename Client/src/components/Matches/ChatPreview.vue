<template>
    <section class="matches">
        <li>
            <div class="profile">
            </div>
            <div class="msg-details">
                <p>
                    <span class="theme">{{match.matchedProfile.fName }} {{match.matchedProfile.lName }} </span>
                    {{timestamp}}
                </p>
                {{match.msgs[0].txt}}
            </div>
        </li>
        <hr>
    </section>
</template>

<script>
import moment from 'moment'
export default {
    name: 'Matches',
    // prop:,
    data() {
        return {
            match: {
                matchedProfile: {
                    fName: 'fname',                                   // name: 'Snir Shechter'
                    lName: 'lname',                                   // name: 'Snir Shechter'
                    birthdate: '942271200000',                        // birthdate: '23235232352' - IN MILISECONDS
                    imgUrl: 'http://nowhere.com/img.png',                        // birthdate: '23235232352' - IN MILISECONDS
                    isMale: true,                                   // isMale: true
                    position: { lat: '23509.2', lng: '340943.2' },       // position:{lat:3395.22,lng:2341.65}
                    interests: ['Gaming', 'Web Surfing', 'Movies'],    // interests: ['Soccer','Gaming','Shopping','Movies']
                    desc: 'I like girls'                            // desc: 'I love hiking, dancing, shopping, prefer girls with brown hair'
                },
                msgs: [
                    { date: '1499345412633', txt: 'msg' },
                    { date: '1499345412733', txt: 'msg' },
                    { date: '1499345412833', txt: 'msg' }
                ]

            },
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
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: left;
    ;
    margin: 0.5em;
}

p {
    text-align: left ;
}

.profile {
    border-radius: 50%;
    width: 4.5em;
    height: 4.5em;
    color: black;
    background-color: #345;
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
