<template>
    <div>
        <header>

        <p class="username">{{myName}}</p>
        <p class="score">{{myName}} {{showUserScore}}:{{showPcScore}} Компьютер</p>
        <button class="refresh" @click="refresh"><img src="../assets/refresh.svg" alt=""></button>

    </header>
    <div class="wrapper">
        <h1 v-if="curr_move==1">Ваш ход</h1>
        <h1 v-else>Ходит Компьютер</h1>
        <div class="player">
            <h2>Компьютер</h2>
            <div class="ships">
                <ship v-for="i in pcShips" :count="i.count" :size="i.size" :key="i"></ship>
            </div>
            <field :close="'close'" :field="pcField" @opencell="move"></field>
        </div>
        <div class="line"></div>
        <div class="player">
            <h2>Вы</h2>
            <div class="ships">
                <ship v-for="i in userShips" :count="i.count" :size="i.size" :key="i"></ship>
            </div>
            <field :close="'open'" :field="userField"></field>
        </div>
    </div>
    </div>
</template>
<script>
import Ship from './Ship'
import Field from './Field'
import SeaBattleGame from '../libs/seabattlegame'
import Player from '../libs/player'
import {mapGetters, mapMutations} from 'vuex';
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
            curr_move: 1,
            stat: {},
            game: 'starting'
        }
    },
    computed: {
        ...mapGetters(['myName', 'showUserScore', 'showPcScore'])
    },
    beforeMount: function () {
        this.start();
    },
    mounted: function () {

        if (this.curr_move==0) {
            this.pcMove();
        }
    },
    methods: {
        start: function () {
            game.start();
            this.userField = game.userField;
            this.pcField = game.pcField;
            this.curr_move = game.is_move;
            this.stat = {};
            this.game = 'starting';
            this.userShips = [];
            this.pcShips = [];
            this.createShips();
        },
        createShips: function () {
            for(let i=4; i>0; i--) {
                this.userShips.push({
                    size: i,
                    count: 5-i,
                });
                this.pcShips.push({
                    size: i,
                    count: 5-i
                })
            }
        },
        pcMove: function () {
            setTimeout(()=>{
                let stat = player.move()
                this.stat = stat;
                this.updateField();
                console.log(stat.status)
                if (stat.game == 'gameover') {
                    this.game = 'stop'
                    return
                }
                if (stat.status!='fail' && this.game == 'starting') {
                    this.pcMove();
                    if (stat.status == 'kill') {
                        this.userShips.find(el => stat.size==el.size).count--
                    }
                } else {
                    this.curr_move = Math.abs(this.curr_move - 1)
                }
            },0)
        },
        move: function (ob) {
            if (this.curr_move == 1) {
                let stat = game.move(ob.x,ob.y);
                this.stat = stat
                this.updateField()
                console.log(stat.status)
                if (stat.game=='gameover') {
                    this.game='stop'
                    return
                }
                if (stat.status == 'fail') {
                    this.curr_move = Math.abs(this.curr_move - 1)
                }
                if (stat.status == 'kill') {
                    this.pcShips.find(el => stat.size==el.size).count--
                }
                if (this.curr_move == 0) {
                    this.pcMove()
                }
            }

        },
        updateField: function () {
            this.pcField = game.pcField
            this.userField= game.userField
        },
        endGame: function () {
            game.start();
            this.updateField()
        },
        ...mapMutations(['refresh','incrementScore'])
    },
    watch: {
        game: function () {
            if (this.game == 'stop') {
                (this.stat.result == 'win') ? this.incrementScore('user'): this.incrementScore('pc');
                this.$router.push({name: 'End', params: {
                    result: (this.stat.result == 'win') ? 'Вы победили': 'Вы проиграли'
                }})
            }

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