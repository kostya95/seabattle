<template>
    <div class="wrapper">
        <div class="player">
            <h2>Компьютер</h2>
            <div class="ships">
                <ship v-for="i in 4" :count="i" :key="i"></ship>
            </div>
            <field :close="'close'"></field>
        </div>
        <div class="line"></div>
        <div class="player">
            <h2>Вы</h2>
            <div class="ships">
                <ship v-for="i in 4" :count="i" :key="i"></ship>
            </div>
            <field :close="'open'"></field>
        </div>
    </div>
</template>
<script>
import Ship from './Ship'
import Field from './Field'
export default ({
    components: {Ship,Field},
})
</script>
<style>
.line {
    width: 2px;
    height: 100%;
    background: #76BA92;
}
.wrapper {
    padding: 60px 8px;
    max-width: 1216px;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
}
h2 {
    margin-bottom: 30px;
    color: #49C1FF;
}
.ship:last-child {
    margin-right: 0;
}
.player {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(50% - 20px)
}
    .ships {
        display: flex;
        margin-bottom: 30px;
    }
</style>