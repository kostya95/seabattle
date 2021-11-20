export default class SeaBattleGame {
    letters = ['А','Б','В','Г','Д','Е','Ж','З','И','К']
    start() {
        this.pcShips = this.createShips('close');
        this.pcField = this.field;
        this.userShips = this.createShips('open');
        this.userField = this.field;
        this.is_move = Math.round(Math.random());
        this.pc_score = 20;
        this.user_score = 20;
    }
    createShips(stat) {
        this.cells = {};
        let ships = [];
        this.field = [];
        for (let i = 0; i<10; i++) {
            let tfield = []
            for (let j = 0; j<10; j++) {
                this.cells[i*10+j] = {
                    id: i*10+j,
                    l: i,
                    t: j,
                    lchildren: 10-i,
                    tchildren: 10-j,
                    lparent: (i == 0)? null:(i-1)*10 + j,
                    tparent: (j==0)? null:i*10 + j-1,
                    is_intact: false
                }
                tfield.push({
                    status: stat,
                    isShip: 0
                })
            }
            this.field.push(tfield)
        }
        for (let i = 4; i>0; i--) {
            for(let j = 5 - i; j>0; j--) {
                let des = Math.round(Math.random());
                let allowedCell = []
                this.toDel = []
                    if (des == 1) {

                        for(let cell in this.cells) {

                            if (this.cells[cell].tchildren >= i) {
                                allowedCell.push(this.cells[cell])
                            }

                        }
                    } else {
                        for(let cell in this.cells) {

                            if (this.cells[cell].lchildren >= i) {
                                allowedCell.push(this.cells[cell])
                            }
                        }
                    }


                let start = allowedCell[Math.floor(Math.random()*allowedCell.length)]
                let tship = [];

                for (let c =0; c<i; c++) {
                    let count = (des==1)? c : c*10
                    tship.push({...this.cells[start.id + count]})
                }
                ships.push(tship);
                tship.forEach(ship => {
                    this.field[ship.l][ship.t].isShip=1
                    this.clearCells(ship)
                    this.clearCells(this.cells[ship.id + 10])
                    this.clearCells(this.cells[ship.id + 1])
                    this.clearCells(this.cells[ship.lparent])
                    this.clearCells(this.cells[ship.tparent])
                })

            }
        }
        return ships
    }
    clearCells(cell) {

        if (cell == undefined) {
            return
        }
        let tparent = this.cells[cell.tparent];
        let lparent = this.cells[cell.lparent];
        let i = 1;
        while (tparent != undefined) {
            tparent.tchildren = i;
            tparent = this.cells[tparent.tparent]
            i++
        }
        i=1
        while (lparent != undefined) {
            lparent.lchildren = i;
            lparent = this.cells[lparent.lparent]
            i++
        }
        delete this.cells[cell.id]
    }
    move(x,y) {
        let field = (this.is_move)? this.pcField:this.userField;
        if (['fail','hurt','kill'].includes(field[x][y].status)){
            return {
                status: 'one_more'
            }
        }
        if ( field[x][y].isShip == 0 ) {
            this.is_move = Math.abs(this.is_move - 1);
            field[x][y].status = 'fail'
            return {
                status: 'fail'
            }
        }
        if (this.is_move) {
            this.pc_score--;
            if (this.pc_score==0) {
                return {
                    status: 'kill',
                    game: 'gameover',
                    result: 'win'
                }
            }
        } else {
            this.user_score--;
            if (this.user_score==0) {
                return {
                    status: 'kill',
                    game: 'gameover',
                    result: 'fail'
                }
            }
        }
        let ships = (this.is_move)? this.pcShips:this.userShips;
        let shipcell = null;
        let ship = null;
        for(let i = 0; i<ships.length; i++) {
            shipcell = ships[i].find(el=>{
                return el.id == x*10 + y
            })
            if (shipcell) {
                shipcell.is_intact = true
                ship = ships[i]
                break
            }
        }
        let brocken = ship.reduce((sum,current)=>{
            return (current.is_intact)? sum+1: sum
        },0);
        if (brocken == ship.length) {
            ship.forEach(s=>{
                field[s.l][s.t].status = 'kill'
            })
            return {
                status: 'kill',
                size: ship.length
            }
        } else {
            field[x][y].status = 'hurt'
            return {
                status: 'hurt'
            }
        }
    }
}
