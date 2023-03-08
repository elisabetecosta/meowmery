'use strict';

const cardImages = [
  { name: 'card-01', path: 'images/card-01.png' },
  { name: 'card-02', path: 'images/card-02.png' },
  { name: 'card-03', path: 'images/card-03.png' },
  { name: 'card-04', path: 'images/card-04.png' },
  { name: 'card-05', path: 'images/card-05.png' },
  { name: 'card-06', path: 'images/card-06.png' },
  { name: 'card-01', path: 'images/card-01.png' },
  { name: 'card-02', path: 'images/card-02.png' },
  { name: 'card-03', path: 'images/card-03.png' },
  { name: 'card-04', path: 'images/card-04.png' },
  { name: 'card-05', path: 'images/card-05.png' },
  { name: 'card-06', path: 'images/card-06.png' }
];


const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const resultDisplay = document.getElementById('result');
const messageDisplay = document.getElementById('message');

const gameStartSection = document.querySelector('.game-start');
const gameEndSection = document.querySelector('.game-end');

let selectedCards, selectedCardsIds, cardsMatched, flippedCards;


// Event Listeners
const startButton = document.getElementById('start');
startButton.addEventListener('click', startGame);

const playAgainButton = document.getElementById('play-again');
playAgainButton.addEventListener('click', startGame);


function startGame() {

  resetGame();
  shuffleCards();
  createGameBoard();
}


function resetGame() {

  selectedCards = [];
  selectedCardsIds = [];
  cardsMatched = [];
  flippedCards = 0;

  gameBoard.classList.remove('won');
  gameEndSection.style.display = 'none';
  gameStartSection.style.display = 'none';
  messageDisplay.innerText = '';

  resultDisplay.innerText = 0;
  scoreDisplay.style.display = 'block';

  clearBoard();
}

function clearBoard() {

  gameBoard.textContent = '';
}

function shuffleCards() {

  cardImages.sort(() => Math.random() - 0.5);
}


function createGameBoard() {

  for (let i = 0; i < cardImages.length; i++) {

    const card = document.createElement('img');

    card.setAttribute('src', 'images/card-back.png');
    card.setAttribute('data-id', i);
    card.classList.add('card');

    gameBoard.appendChild(card);

    card.addEventListener('click', flipCard);
  }
}


function flipCard() {

  const card = this;
  const cardId = card.getAttribute('data-id');

  // console.log(cardImages);
  // console.log(card);

  if (selectedCards.length < 2 && !selectedCardsIds.includes(cardId)) {

    selectedCards.push(cardImages[cardId].name);
    selectedCardsIds.push(cardId);

    card.setAttribute('src', cardImages[cardId].path);
    card.classList.add('selected');
  }

  if (selectedCards.length === 2) {

    setTimeout(checkSelection, 500);
  }
}

function checkSelection() {

  const cards = document.querySelectorAll('.card');
  const firstCardId = selectedCardsIds[0];
  const secondCardId = selectedCardsIds[1];

  // console.log(cards[firstCardId]);
  // console.log(cards[secondCardId]);

  if (selectedCards[0] === selectedCards[1]) {

    cards[firstCardId].classList.add('matched');
    cards[secondCardId].classList.add('matched');

    cardsMatched.push(selectedCards);

  } else {

    cards[firstCardId].setAttribute('src', 'images/card-back.png');
    cards[secondCardId].setAttribute('src', 'images/card-back.png');

    cards[firstCardId].classList.remove('selected');
    cards[secondCardId].classList.remove('selected');
  }

  resultDisplay.innerText = cardsMatched.length;
  selectedCards = [];
  selectedCardsIds = [];

  if (cardsMatched.length === (cardImages.length / 2)) {

    endGame();
  }
}


function endGame() {

  // hide the board
  gameBoard.classList.add('won');

  // display winning message
  messageDisplay.innerText = 'You won!';

  // show buttons to play again and go to next level
  gameEndSection.style.display = 'block';
}