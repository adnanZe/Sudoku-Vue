import { makepuzzle as generateNumbers } from "sudoku";

export function generateSudokuCells() {
  const rawNumbers = generateNumbers();
  let valueIndexZero;

  const gameState = rawNumbers.map((number, index) => {
    let value = number == null ? "" : `${number + 1}`;

    if (index == 0) {
      valueIndexZero = value;
    }

    return {
      value,
      id: index.toString(),
      isSelected: index == 0 ? true : false,
      isReadOnly: value ? true : false,
      isAssociated: index == 0 ? true : false,
      isMatchValue: getIsMatchedNumber(value, valueIndexZero),
      isWrongValue: false,
      associatedIds: getListOfIdsAssociated(index.toString())
    };
  });

  return gameState;
}

export function getIsMatchedNumber(value, valueSelectedCell) {
  if (Array.isArray(value)) return false;

  if (value == valueSelectedCell && value) {
    return true;
  } else {
    return false;
  }
}

export function getIdsRowsColumnsSquares() {
  const RowColumnSqrObject = {
    rows: [],
    columns: [],
    squares: []
  };

  let counterColumn = -1;
  let counterSquare = 0;
  let row = null;
  let column = null;
  let square = null;

  for (let i = 0; i < 81; i++) {
    if (i % 9 == 0) {
      counterColumn++;
      row = [];
      column = [];
      square = [];

      RowColumnSqrObject.rows.push(row);
      RowColumnSqrObject.columns.push(column);
      RowColumnSqrObject.squares.push(square);
    }

    if (i % 27 == 0) {
      counterSquare = 0;
    } else if (i % 9 == 0) {
      counterSquare -= 18;
    } else if (i % 3 == 0) {
      counterSquare += 6;
    }
    row.push(String(i));
    column.push(String((i % 9) * 9 + counterColumn));
    square.push(String(i + counterSquare));
  }

  return RowColumnSqrObject;
}

export function getListOfIdsAssociated(selectedCellId) {
  const { rows, columns, squares } = getIdsRowsColumnsSquares();

  const rowList = rows.find(row => row.includes(selectedCellId));
  const colList = columns.find(col => col.includes(selectedCellId));
  const sqrList = squares.find(sqr => sqr.includes(selectedCellId));

  return rowList.concat(colList, sqrList);
}
