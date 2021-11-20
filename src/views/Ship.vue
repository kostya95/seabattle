<template>
    <div class="ship" :class="count==0?'is_end':''">
        <div class="ship_img">
            <div class="ship_cell" v-for="item in size" :key="item"></div>

        </div>
        <p class="ship_count">{{count}}</p>
    </div>
</template>
<script>


export default ({
    props: ['count', 'size']
})
</script>
<style>
    .ship {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-right: 15px;
        position: relative;
    }
    .ship:after, .ship:before {
        content: ' ';
        position: absolute;
        width: 60px;
        height: 4px;
        background: #bd2f04;
        top: 20%;
        left: 50%;
        opacity: 0;
        transition: opacity .3s;
    }
    .ship::after {
        transform:translateX(-50%) rotate(45deg) ;

    }
    .ship:before {
        transform:translateX(-50%) rotate(-45deg) ;
    }
    .ship.is_end:after, .ship.is_end:before {
        opacity: 1;
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