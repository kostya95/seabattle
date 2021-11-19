<template>

    <div class="wrapper">
        <h1 v-if="curr_move==1">Ваш ход</h1>
        <h1 v-else>Ходит Компьютер</h1>
        <div class="player">
            <h2>Компьютер</h2>
            <div class="ships">
                <ship v-for="i in 4" :count="i" :key="i"></ship>
            </div>
            <field :close="'close'" :field="pcField" @opencell="move"></field>
        </div>
        <div class="line"></div>
        <div class="player">
            <h2>Вы</h2>
            <div class="ships">
                <ship v-for="i in 4" :count="i" :key="i"></ship>
            </div>
            <field :close="'open'" :field="userField"></field>
        </div>
    </div>
</template>
<script>
import Ship from './Ship'
import Field from './Field'
import SeaBattleGame from '../libs/seabattlegame'
import Player from '../libs/player'
let game = new SeaBattleGame();
let player = new Player(game)
export default ({
    components: {Ship,Field},
    data: function () {
        return {
            userShips: game.userField,
            pcShips: game.pcField,
            pcField: '',
            userField: '',
            curr_move: 1
        }
    },

    beforeMount: function () {

    },
    mounted: function () {
        this.start();
        if (this.curr_move==0) {
            this.pcMove();
        }
    },
    methods: {
        start: function () {
            game.start();
            this.userShips = game.userShips;
            this.userField = game.userField;
            this.pcField = game.pcField;
            this.pcShips = game.pcShips;
            this.curr_move = game.is_move;

        },
        pcMove: function () {
            setTimeout(()=>{
                let stat = player.move()

                this.updateField();
                console.log(stat.status)
                if (stat.status!='fail') {
                    this.pcMove();
                } else {
                    this.curr_move = Math.abs(this.curr_move - 1)
                }
            },2000)
        },
        move: function (ob) {
            if (this.curr_move == 1) {
                let stat = game.move(ob.x,ob.y);
            this.updateField()
            if (stat.status == 'fail') {
                this.curr_move = Math.abs(this.curr_move - 1)

            }
            if (this.curr_move == 0) {
                this.pcMove()
            }
            }

        },
        updateField: function () {
            this.pcField = game.pcField
            this.userField= game.userField
        }
    }
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
    flex-wrap: wrap;
}
h1 {
    text-align: center;
    width: 100%;
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