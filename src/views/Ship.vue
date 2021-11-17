<template>
    <div class="ship">
        <div class="ship_img">
            <div class="ship_cell" v-for="item in (5-count)" :key="item"></div>

        </div>
        <p class="ship_count">{{count}}</p>
    </div>
</template>
<script>


export default ({
    props: ['count']
})
</script>
<style>
    .ship {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-right: 15px;
    }
    .ship_img {
        display: flex;
        margin-bottom: 16px;
    }
    .ship_cell {
        width: 30px;
        height: 30px;
        border: 1px solid #000;
        background-color: #58555A;
    }
    .ship_count {
        font-size: 18px;
        font-weight: bold;
    }
</style>