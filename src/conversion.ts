import {
    RowSudoku,
    ColSudoku,
    SquareSudoku,
    Coordinates,
    SudokuPossibilities,
    SudokuValues,
    SquareSudokuPossibilities
} from "./type";

export function rowToCol(sudoku: RowSudoku): ColSudoku {
    let array: ColSudoku = []
    sudoku.forEach((row) => {
        row.forEach((value, i) => {
            if (!array[i]) array[i] = []
            array[i].push(value)
        })
    })
    return array
}

export function rowToSquare(sudoku: RowSudoku): SquareSudoku {
    let array: ColSudoku = []
    sudoku.forEach((row, y) => {
        row.forEach((value, x) => {
            const squareIndex = getSquareIndex(x, y)
            if (!array[squareIndex]) array[squareIndex] = []
            array[squareIndex].push(value)
        })
    })
    return array
}

export function getSquareIndex(x : number, y : number) : number {
    return Math.floor(x / 3) + Math.floor(y / 3) * 3
}

export function getAlternativeSudoku(sudoku : RowSudoku, coordinates : Coordinates, value : SudokuPossibilities) : RowSudoku {
    const copiedSudoku = [...sudoku]
    copiedSudoku[coordinates.y][coordinates.x] = value
    return copiedSudoku
}
