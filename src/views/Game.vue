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
                <ship v-for="i in pcShips" :count="i.count" :size="i.size" :key="`${i.count}i${i.size}`"></ship>
            </div>
            <field :close="'close'" :field="pcField" @opencell="move"></field>
        </div>
        <div class="line"></div>
        <div class="player">
            <h2>Вы</h2>
            <div class="ships">
                <ship v-for="i in userShips" :count="i.count" :size="i.size" :key="`${i.count}i${i.size}`"></ship>
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
let player = new Player(game);

export default ({
    components: {Ship,Field},
    data: function () {
        return {
            userShips: [],
            pcShips: [],
            pcField: '',
            userField: '',
            curr_move: 1,
            stat: {},
            game: 'starting'
        }
    },
    computed: {
        // отображение информации
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
        // создание игры и игрока
        start: function () {
            game.start();
            player.create();
            this.userField = game.userField;
            this.pcField = game.pcField;
            this.curr_move = game.is_move;
            this.stat = {};
            this.game = 'starting';
            this.userShips = [];
            this.pcShips = [];
            this.createShips();
        },
        // создание статистики по кораблям
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
        // ход компьютера 
        pcMove: function () {
            setTimeout(()=>{
                this.stat = player.move()
                this.updateField();
                if (this.stat.game == 'gameover') {
                    this.game = 'stop'
                    return
                }
                if (this.stat.status!='fail' && this.game == 'starting') {
                    this.pcMove();
                    if (this.stat.status == 'kill') {
                        this.userShips.find(el => this.stat.size==el.size).count--
                    }
                } else {
                    this.curr_move = Math.abs(this.curr_move - 1)
                }
            },1000)
        },
        // ход игрока
        move: function (ob) {
            if (this.curr_move == 1) {
                this.stat = game.move(ob.x,ob.y);
                
                this.updateField()
                if (this.stat.game=='gameover') {
                    this.game='stop'
                    return
                }
                if (this.stat.status == 'fail') {
                    this.curr_move = Math.abs(this.curr_move - 1)
                }
                if (this.stat.status == 'kill') {
                    this.pcShips.find(el => this.stat.size==el.size).count--
                }
                if (this.curr_move == 0) {
                    this.pcMove()
                }
            }

        },
        // обновляем игровые поля
        updateField: function () {
            this.pcField = game.pcField
            this.userField= game.userField
        },
        endGame: function () {
            game.start();
            this.updateField()
        },
        // обновление счета
        ...mapMutations(['refresh','incrementScore'])
    },
    watch: {
        // проверяет конец игры
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