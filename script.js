const gameField = document.querySelector('.game-field');
const buttons = document.querySelector('#gamefield button');
const turn = document.querySelector('#turn');

let player = 'circle';

const tah = (event) => {
  let policko = event.target;

  if (player === 'circle') {
    policko.classList.add('game-field--circle');
    turn.src = 'cross.svg';
  } else if (player === 'cross') {
    policko.classList.add('game-field--cross');
    turn.src = 'circle.svg';
  }

  if (player === 'circle') {
    player = 'cross';
  } else {
    player = 'circle';
  }
};

gameField.addEventListener('click', tah);
