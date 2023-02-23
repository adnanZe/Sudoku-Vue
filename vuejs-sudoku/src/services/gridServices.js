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
      value: value,
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
