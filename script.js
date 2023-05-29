'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//resetting the value to zero
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden'); //removing the dice img

const scores = [0, 0]; //current scores of the the player (index0 = player0score) (index1 = player1score)
let activePlayer = 0;
let currentScore = 0;
let playingState = true;

const switchPlayer = function () {
  //active player  current score turns zero
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;

  //updates the active player
  activePlayer = activePlayer === 0 ? 1 : 0;

  //it changes the background color i.e toggles help to remove and add classes
  //how toggles work ? => if the class is present it will remove and vice-versa
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//rolling the dice

btnRoll.addEventListener('click', function () {
  if (playingState) {
    //genrating the random-number for dice

    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //adding the dice image
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //if dice is not equal to 1 than switch the player
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    }
    //when dice = 1
    else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playingState) {
    //holding the current value
    scores[activePlayer] += currentScore;

    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    //if the score is 100 the active player wins

    if (scores[activePlayer] >= 20) {
      playingState = false;
      diceEl.classList.add('hidden');

      //exit the game and the active player wins.
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  window.location.reload();
});
