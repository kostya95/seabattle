<template>
    <main>
        <div class="wrapper">
            <h1>{{result}}</h1>
            <router-link :to="'/game'"><button>Заново</button></router-link>
        </div>
    </main>
</template>
<script>
export default ({
    props: ['result']
})
</script>
<style scoped>
    .wrapper {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>