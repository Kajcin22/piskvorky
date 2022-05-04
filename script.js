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

  let inRow = 1; // Jednička pro právě vybrané políčko
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

  if (inColumn >= symbolsToWin) {
    return true;
  }

  return false;
};

gameField.addEventListener('click', tah);

/*kód z prac skupinky:

- měnili jsme textContent, ne obrázky

import "./styles.css";

let naTahu = "X";

const handleClick = (event) => {
  if (event.target.tagName !== "BUTTON") {
    return;
  }

  if (
    event.target.classList.contains("hrac-X") ||
    event.target.classList.contains("hrac-O")
  ) {
    return;
  }

  event.target.classList.add(`hrac-${naTahu}`);
  naTahu = naTahu === "X" ? "O" : "X";
};

const Tlacitko = () => {
  return "<button></button>";
};

const RadekTlacitek = ({ pocetPolicek }) => {
  let result = "<div>";
  for (let i = 0; i < pocetPolicek; i++) {
    result += Tlacitko();
  }
  result += "</div>";
  return result;
};

const PoleTlacitek = ({ pocetPolicek }) => {
  let result = "";
  for (let i = 0; i < pocetPolicek; i++) {
    result += RadekTlacitek({ pocetPolicek });
  }
  return result;
};

document.querySelector("#app").addEventListener("click", handleClick);
document.querySelector("#app").innerHTML = PoleTlacitek({ pocetPolicek: 10 });

----------- event target na buttons přímo: ------------------------------

const handleClickDisabled = (event) => {
  event.target.disabled = true;
  naTahu = naTahu === "X" ? "O" : "X";
};

- když je querySelectorAll, tak se pak cyklem projdou všechny zvolené elementy a přidá se na ně eventlistener:

const tlacitka = document.querySelectorAll("button");
for (let index = 0; index < tlacitka.length; index++) {
  const tlacitko = tlacitka[index];
  tlacitko.addEventListener("click", handleClick);
}
*/
