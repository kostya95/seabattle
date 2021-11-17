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
            <td v-for="y in yAsix" :key="y" :class="['field_cell',  close]"></td>
        </tr>
    </table>
</template>
<script>
export default ({
    props: ['close'],
    data: function () {
        return {
            xAsix: ['А','Б','В','Г','Д','Е','Ж','З','И','К'],
            yAsix: 10,
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
</style>