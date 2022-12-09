import {Coordinates, RowSudoku, SquareSudokuPossibilities} from "./type";
import {
    getEmptyCellsCoordinates, getLowerPossibilityCell,
    getPossibilities,
    getPossibilitiesSum,
    isEveryCellFilled
} from "./possibilities";
import {getAlternativeSudoku} from "./conversion";

export async function resolve (sudoku : RowSudoku) : Promise<RowSudoku> {
    const emptyCells = getEmptyCellsCoordinates(sudoku)
    let soluce : RowSudoku | undefined
    for (const emptyCell of emptyCells) {
        const alternativeTry = resolveCell(sudoku, emptyCell)
        console.log("alt try", alternativeTry)
        if(alternativeTry !== undefined && soluce === undefined) {
            soluce = alternativeTry
            console.log("soluce", soluce)
            break
        }
    }
    console.log("soluce", soluce)
    if(soluce === undefined) throw new Error("No soluce")
    return soluce
}

export function resolveCell(sudoku: RowSudoku, cell : Coordinates) : RowSudoku | undefined {
    function resolveEmpty(sudoku: RowSudoku, cell : Coordinates) {
        console.table(sudoku)
        const basePossibilities = getPossibilities(sudoku)
        const lowerPosCell = basePossibilities[cell.y][cell.x]
        let higherPossibilitySum = 0
        let higherPossibilitySudoku : RowSudoku | undefined
        let higherPossibilities : SquareSudokuPossibilities = []
        let choosePossibility = 0
        lowerPosCell.forEach((possibility) => {
            let alternativeSudoku = getAlternativeSudoku(sudoku, cell, possibility)
            higherPossibilities = getPossibilities(alternativeSudoku)
            let possibilitiesSum = getPossibilitiesSum(higherPossibilities)

            if(possibilitiesSum > higherPossibilitySum) {
                higherPossibilitySum = possibilitiesSum
                higherPossibilitySudoku = alternativeSudoku
                choosePossibility = possibility
            }
        })

        if(!higherPossibilitySudoku) {
            console.log("Nope --------------", higherPossibilitySum)
            return
        }
        if(!isEveryCellFilled(higherPossibilitySudoku)) {
            const nextCell = getLowerPossibilityCell(higherPossibilities)
            console.log("Take this", choosePossibility, " for this one", cell, "next ", nextCell)
            console.log("Possibilities", higherPossibilitySum)
            console.table(higherPossibilitySudoku)
            resolveEmpty([...higherPossibilitySudoku], nextCell)
        } else {
            console.log("I have one !", higherPossibilitySudoku)
            return higherPossibilitySudoku
        }
    }

    return resolveEmpty(sudoku.map(row => row.slice()), cell)
}
