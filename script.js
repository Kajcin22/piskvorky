const gameField = document.querySelector('.game-field');
const turn = document.querySelector('#turn');

let player = 'circle';

const tah = (event) => {
  let policko = event.target;

  //máme eventListener na celém divu → aby nereagovalo na kliknutí v mezerách
  if (policko.tagName !== 'BUTTON') {
    return;
  }

  if (player === 'circle') {
    policko.classList.add('game-field--circle');
    policko.disabled = true;
    turn.src = 'cross.svg';
  } else if (player === 'cross') {
    policko.classList.add('game-field--cross');
    policko.disabled = true;
    turn.src = 'circle.svg';
  }
  player = player === 'circle' ? 'cross' : 'circle';
  console.log(player);

  const victory = isWinningMove(event.target);

  if (victory) {
    const symbol = getSymbol(event.target);
    if (confirm(`Vyhrál hráč: ${symbol}. Spustit novou hru?`) === true) {
      location.reload();
    }
  }
};

console.log(player);

//VÝHRA:

//vracíme symbol:
const getSymbol = (field) => {
  if (field.classList.contains('game-field--cross')) {
    return 'KŘÍŽEK';
  } else if (field.classList.contains('game-field--circle')) {
    return 'KRUH';
  }
};

const boardSize = 10; // 10x10
const fields = document.querySelectorAll('.game-field button');

const getField = (row, column) => {
  //toto vrací určitý button
  return fields[row * boardSize + column];
};

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length && field !== fields[fieldIndex]) {
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

const symbolsToWin = 5;

const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;
  let c;
  let r;

  let inRow = 1; // Jednička pro právě vybrané políčko

  /*------------- kontrola směrem doleva a doprava --------------------------------- */
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  /* ------------------- kontrola směrem nahoru a dolů -------------------------- */
  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  //podmínka pro výhru:
  if (inColumn >= symbolsToWin) {
    return true;
  }

  /*--------------------- kontrola diagonálním směrem -------------------------- */

  //první osa:
  let inDiagonal1 = 1;

  // Koukni vpravo nahoru
  c = origin.column;
  r = origin.row;
  while (
    c < boardSize - 1 &&
    r > 0 &&
    symbol === getSymbol(getField(r - 1, c + 1))
  ) {
    inDiagonal1++;
    c++;
    r--;
  }

  //Koukni vlevo dolu
  c = origin.column;
  r = origin.row;
  while (
    r < boardSize - 1 &&
    c > 0 &&
    symbol === getSymbol(getField(r + 1, c - 1))
  ) {
    inDiagonal1++;
    c--;
    r++;
  }

  if (inDiagonal1 >= symbolsToWin) {
    return true;
  }

  //druhá osa:
  let inDiagonal2 = 1;

  //Koukni vpravo dolu
  c = origin.column;
  r = origin.row;
  while (
    c < boardSize - 1 &&
    r < boardSize - 1 &&
    symbol === getSymbol(getField(r + 1, c + 1))
  ) {
    inDiagonal2++;
    c++;
    r++;
  }

  //Koukni vlevo nahoru
  c = origin.column;
  r = origin.row;
  while (c > 0 && r > 0 && symbol === getSymbol(getField(r - 1, c - 1))) {
    inDiagonal2++;
    c--;
    r--;
  }

  if (inDiagonal2 >= symbolsToWin) {
    return true;
  }

  return false;
};

gameField.addEventListener('click', tah);
