import {
    Coordinates,
    RowSudoku,
    SquareSudoku,
    SquareSudokuPossibilities,
    SudokuPossibilities,
    SudokuPossibilitiesValues,
    SudokuValues
} from "./type";
import {getSquareIndex, rowToCol, rowToSquare} from "./conversion";

export function getPossibilitiesForArray(numbers: SudokuValues[]): SudokuPossibilities[] {
    return SudokuPossibilitiesValues.filter(n => !numbers.includes(n))
}

export function getPossibilitiesForCell(colPossibilities: SudokuPossibilities[], rowPossibilities: SudokuPossibilities[], squarePossibilities: SudokuPossibilities[]): SudokuPossibilities[] {
    return colPossibilities.filter(n => rowPossibilities.includes(n) && squarePossibilities.includes(n))
}

export function getPossibilities(rowSudoku: RowSudoku): SquareSudokuPossibilities {
    const colSudoku = rowToCol(rowSudoku)
    const squareSudoku = rowToSquare(rowSudoku)
    const result: SquareSudokuPossibilities = []

    rowSudoku.forEach((row, y) => {
        const rowRemainPossibilities = getPossibilitiesForArray(row)
        const rowPossibilities: SudokuPossibilities[][] = []
        row.forEach((value, x) => {
            const colRemainPossibilities = getPossibilitiesForArray(colSudoku[x])
            const squareRemainPossibilities = getPossibilitiesForArray(squareSudoku[getSquareIndex(x, y)])

            if (value === null) {
                rowPossibilities.push(getPossibilitiesForCell(colRemainPossibilities, rowRemainPossibilities, squareRemainPossibilities))
                return
            }
            rowPossibilities.push([])

        })
        result.push(rowPossibilities)
    })
    return result
}

export function getLowerPossibilityCell(possibilities: SquareSudokuPossibilities): Coordinates {
    let lessPossibilitiesNumber: undefined | number = undefined
    let result: Coordinates = {
        x: 0,
        y: 0
    }
    possibilities.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (!lessPossibilitiesNumber || (cell.length < lessPossibilitiesNumber && cell.length > 0)) {
                lessPossibilitiesNumber = cell.length
                result = {x, y}
            }
        })
    })
    return result
}

export function getPossibilitiesSum(possibilities: SquareSudokuPossibilities): number {
    let result = 0
    possibilities.forEach((row) => {
        row.forEach(cell => {
            result += cell.length
        })
    })
    return result
}

export function isEveryCellFilled(sudoku : RowSudoku) : boolean {
    let result = true
    sudoku.forEach(row => {
        row.forEach(cell => {
            if(cell === null) {
                result = false
            }
        })
    })
    return result
}

export function iterateCells(sudoku : RowSudoku, fn : (cell: SudokuValues, coord : Coordinates) => void) {
    sudoku.forEach((row, y) => {
        row.forEach((cell, x) => {
            fn(cell, {x,y})
        })
    })
}

export function getEmptyCellsCoordinates(sudoku : RowSudoku) : Coordinates[] {
    const coordinates : Coordinates[] = []
    iterateCells(sudoku, (cell, coord) => {
        if(cell === null) coordinates.push(coord)
    })
    return coordinates
}
