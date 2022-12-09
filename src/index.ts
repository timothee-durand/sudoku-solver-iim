import {RowSudoku} from "./type";
import {resolve} from "./resolve"

const sudoku2 : RowSudoku = [
    [null, null, null, null, null, null, null, null, null],
    [null, 1, 2, null, 3, 4, 5, 6, 7],
    [null, 3, 4, 5, null, 6, 1, 8, 2],
    [null, null, 1, null, 5, 8, 2, null, 6],
    [null, null, 8, 6, null, null, null, null, 1],
    [null, 2, null, null, null, 7, null, 5, null],
    [null, null, 3, 7, null, 5, null, 2, 8],
    [null, 8, null, null, 6, null, 7, null, null],
    [2, null, 7, null, 8, 3, 6, 1, 5],
]

 resolve(sudoku2).then((result) => {
     console.log(result)
     console.log("result")
 }).catch(e => {
     console.error("Error", e)
 })
//console.log(getPossibilities(sudoku2)[3][3])

