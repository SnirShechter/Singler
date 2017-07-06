<template>
    <section class="matches">
        <li :class="classObject">
            <div class="profile"> 
            </div>
            <div>
                <p>name</p>
            </div>
        </li>
    </section>
</template>

<script>
export default {
    name: 'Matches',
    data() {
        return {
            // matches: {}
        }
    }
}
</script>

<style lang="scss" scoped>
li {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-around;
}

.profile {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    color: black;
    background-color: #345;
}
</style>
