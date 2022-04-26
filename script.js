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
