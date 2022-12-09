export const SudokuPossibilitiesValues = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const
export type SudokuPossibilities = typeof SudokuPossibilitiesValues[number]
export type SudokuValues = SudokuPossibilities | null
export type SquareSudoku = SudokuValues[][]
export type SquareSudokuPossibilities = SudokuPossibilities[][][]
export type RowSudoku = SudokuValues[][]
export type ColSudoku = SudokuValues[][]
export interface Coordinates {
    x : number,
    y : number
}
