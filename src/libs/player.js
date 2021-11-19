export default class Player{
    constructor(game) {
        this.game = game
        this.moves = []
        this.last_status = 'fail'
        for(let i = 0; i<10; i++) {
            for(let j = 0; j<10; j++) {
                this.moves.push({
                    x: i,
                    y: j
                })
            }
        }

    }
    move() {
        let i = Math.random()*this.moves.length;
        let m = this.moves.splice(i,1)[0];
        this.last_status = this.game.move(m.x,m.y)
        return this.last_status

    }

}