const gameField = document.querySelector('.game-field');
const buttons = document.querySelector('#gamefield button');
const turn = document.querySelector('#turn');

let player = 'circle';

const tah = (event) => {
  let policko = event.target;

  if (player === 'circle') {
    policko.classList.add('game-field--circle');
    policko.disabled = true;
    turn.src = 'cross.svg';
  } else if (player === 'cross') {
    policko.classList.add('game-field--cross');
    policko.disabled = true;
    turn.src = 'circle.svg';
  }
  /* if (player === 'circle') {
    player = 'cross';
  } else {
    player = 'circle';
  } */
  //toto zjednodušeně ("ternární operátor"):
  player = player === 'circle' ? 'cross' : 'circle';
};

gameField.addEventListener('click', tah);
