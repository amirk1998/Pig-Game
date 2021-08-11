'use strict';

const Player0El = document.querySelector('.player--0');
const Player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let activePlayer = 0;
let currentScore = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  /*
    if (activePlayer === 0) {
      activePlayer = 1;
    } else {
      activePlayer = 0;
    } 
    */
  Player0El.classList.toggle('player--active');
  Player1El.classList.toggle('player--active');
};

//RESET Function
const ResetGame = function () {
  if (playing) {
    activePlayer = 0;
    diceEl.classList.add('hidden');
    Player0El.classList.add('player--active');
    Player1El.classList.remove('player--active');
    currentScore = 0;
    scores[0] = 0;
    scores[1] = 0;

    document.getElementById('current--0').textContent = 0;
    document.getElementById('current--1').textContent = 0;
    document.getElementById(`score--0`).textContent = scores[0];
    document.getElementById(`score--1`).textContent = scores[1];
  } else {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--winner');
    document;
    // .querySelector(`.player--${activePlayer}`)
    // .classList.add('player--active');

    btnRoll.classList.remove('disabled');

    btnHold.classList.remove('disabled');

    playing = true;
    activePlayer = 0;
    diceEl.classList.add('hidden');
    Player0El.classList.add('player--active');
    Player1El.classList.remove('player--active');
    currentScore = 0;
    scores[0] = 0;
    scores[1] = 0;

    document.getElementById('current--0').textContent = 0;
    document.getElementById('current--1').textContent = 0;
    document.getElementById(`score--0`).textContent = scores[0];
    document.getElementById(`score--1`).textContent = scores[1];
  }
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generate a random dice number
    const dice = Math.trunc(Math.random() * 6 + 1);

    //2. display the dice number
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //console.log(dice);
    //3.check for rolled 1
    if (dice !== 1) {
      // add dice to current score

      //currentScore = currentScore + dice;
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//HOLD Button

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add current score to active's player score
    scores[activePlayer] += currentScore;
    //scores[activePlayer] = scores[activePlayer] + currentScore ;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.Check if Player's score is >=100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      btnRoll.classList.add('disabled');

      btnHold.classList.add('disabled');
    } else {
      //Or Switch the Player
      switchPlayer();
    }
  }
});

//Start New Game
btnNew.addEventListener('click', ResetGame);
