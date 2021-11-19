<template>
    <table>
        <tr>
            <td></td>
            <td v-for="i in xAsix" :key="i" class="field_letter">
                {{i}}
            </td>
        </tr>
        <tr v-for="i in yAsix" :key="i">
            <td class="field_num">{{i}}</td>
            <td
                v-for="y in yAsix"
                :key="y" class="field_cell"
                :class="[close,  cellStatus(i-1,y-1)]"
                @click="openCell(i-1,y-1)"></td>
        </tr>
    </table>
</template>
<script>
export default ({
    props: ['close', 'field'],
    data: function () {
        return {
            xAsix: ['А','Б','В','Г','Д','Е','Ж','З','И','К'],
            yAsix: 10,
            dataField: [],
        }
    },
    beforeMount: function () {

    },
    methods: {
        openCell: function (x,y) {
            this.$emit('opencell',{x: x,y:y})
        },
        cellStatus: function(i,j) {
            if (this.close!='close') {
                if (this.field[i][j].isShip == 1 && this.field[i][j].status == 'open') {
                    return 'shipcell'
                }
            }
            return this.field[i][j].status
        }
    }
})
</script>
<style>
    table {
        border-collapse: collapse;
        border-spacing: 0px;
    }
    .field_cell {
        width: 30px;
        height: 30px;
        border: 1px solid #d1d1d1;

        transition: background-color .3s;

    }
    .shipcell {
        background-color: #58555A;
    }
    .field_cell.close {
        background-color: #49C1FF;
        cursor: pointer;
    }
    .field_cell.close:hover {
        background-color: #387FE8;
    }
    .field_letter {
        font-size: 18px;
        font-weight: bold;
        padding-bottom: 6px;
        text-align: center;
        line-height: 1;
    }
    .field_num {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        padding-right: 6px;
    }
    .field_cell.fail {
        background: #ffffff !important;
        position: relative;
    }
    .fail::after, .fail::before {
        content: ' ';
        position: absolute;
        width: 100%;
        left: 0;
        height: 4px;
        top: 13px;
        background: #58555A;
    }
    .fail::after {
        transform: rotate(45deg);
    }
    .fail::before {
        transform: rotate(-45deg);
    }
    .field_cell.fail:hover {
        background: #ffffff !important;
    }
    .field_cell.hurt {
        background: #e98e05 !important;
    }
    .field_cell.hurt:hover {
        background: #e98e05 !important;
    }
    .field_cell.kill {
        background: #bd2f04 !important;
    }
    .field_cell.kill:hover {
        background: #bd2f04 !important;
    }
</style>