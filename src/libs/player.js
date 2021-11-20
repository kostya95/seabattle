//класс игрока бота, для создания нужен экземпляр класса SeaBattleGame
export default class Player{
    constructor(game) {
        this.game = game
        this.create()
    }
    create() {
        this.moves = []
        for(let i = 0; i<10; i++) {
            for(let j = 0; j<10; j++) {
                this.moves.push({
                    x: i,
                    y: j,
                    id: i*10+j
                })
            }
        }
        this.probableMoves = [];
        this.ship = [];
    }
    //ход компьютера
    move() {
        let index,move,status;
        // проверяем массив предполагаемых ходов, если пусто берем случайный ход
        if (this.probableMoves.length>0) {
            index = Math.random()*this.probableMoves.length
            index = this.probableMoves.splice(index,1)[0].id;
            index = this.moves.findIndex(el=> el.id == index)
        } else {
            index = Math.random()*this.moves.length;
        }
        move = this.moves.splice(index,1)[0];
        status = this.game.move(move.x,move.y)
        // если статус "ранен", то создаем список предполагаемых ходов
        if (status.status == 'hurt') {
            this.ship.push({...move});
            this.createProbableMoves()
        }
        // если статус "убит", то удаляем ходы, которые не содержат кораблей
        if (status.status == 'kill') {
            this.ship.push({...move});
            this.clearField();
        }
        return status
    }
    //убрать ненужные ходы
    clearField() {
        let indexes = []
        //получаем соседние клетки вокруг "убитого" корабля
        this.ship.forEach(ship=>{
            let indexes1 = this.getIndexes(ship);
            indexes = indexes.concat(indexes1.filter(el=>el>=0))
        })
        indexes = Array.from(new Set(indexes)).sort((a,b)=>a-b)
        // удаляем ненужные ходы
        for(let i = 0; i< indexes.length; i++) {
            this.moves.splice(indexes[i]-i,1)
        }
        this.probableMoves = [];
        this.ship = [];
    }
    // получает соседние клетки
    getIndexes(ship) {
        let indexes = [];
        if (ship.y <9) {
            indexes.push(this.moves.findIndex(el=>el.id == ship.id+1))
        }
        if (ship.y>0) {
            indexes.push(this.moves.findIndex(el=>el.id == ship.id-1))
        }
        if (ship.x<9) {
            indexes.push(this.moves.findIndex(el=>el.id == ship.id+10))
        }
        if (ship.x>0) {
            indexes.push(this.moves.findIndex(el=>el.id == ship.id-10))
        }
        return indexes.filter(el=> el>=0)
    }
    // создает массив с предполагаемыми ходами
    createProbableMoves() {
        this.ship.sort((a,b)=>{
            return a.id-b.id
        });
        let indexes = []
        if (this.ship.length == 1) {
            indexes = this.getIndexes(this.ship[0])
            indexes.forEach(el=>{
                this.probableMoves.push({...this.moves[el]})
            })
            return
        }
        this.probableMoves = [];
        if (this.ship[this.ship.length-1].id - this.ship[0].id>=10) {
            if (this.ship[0].x > 0) {
                indexes.push(this.moves.findIndex(el=>el.id == this.ship[0].id-10))
            }
            if (this.ship[this.ship.length-1].x < 9) {
                indexes.push(this.moves.findIndex(el=>el.id == this.ship[this.ship.length-1].id+10))
            }

        } else {
            if (this.ship[0].y>0) {
                indexes.push(this.moves.findIndex(el=>el.id == this.ship[0].id-1))
            }
            if (this.ship[this.ship.length-1].y <9) {
                indexes.push(this.moves.findIndex(el=>el.id == this.ship[this.ship.length-1].id+1))
            }
        }
        indexes = indexes.filter(el=> el>=0)
        indexes.forEach(el=>{
            this.probableMoves.push({...this.moves[el]})
        })
        return
    }
}