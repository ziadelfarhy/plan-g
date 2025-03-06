const cardsArray = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍍', '🥝', '🍉'];
const gameBoard = document.getElementById("game-board");
const movesCounter = document.getElementById("moves");
const restartButton = document.getElementById("restart");
let moves = 0;
let firstCard, secondCard;
let lockBoard = false;

// Duplicate cards and shuffle
const cards = [...cardsArray, ...cardsArray].sort(() => Math.random() - 0.5);

// Create cards
cards.forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;
    card.innerHTML = "?";
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
});

function flipCard() {
    if (lockBoard || this === firstCard) return;
    
    this.innerHTML = this.dataset.symbol;
    this.classList.add("flipped");
    
    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;
        moves++;
        movesCounter.textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        resetBoard();
    } else {
        setTimeout(() => {
            firstCard.innerHTML = "?";
            secondCard.innerHTML = "?";
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

restartButton.addEventListener("click", () => {
    gameBoard.innerHTML = "";
    moves = 0;
    movesCounter.textContent = moves;
    firstCard = secondCard = null;
    lockBoard = false;
    
    const shuffledCards = [...cardsArray, ...cardsArray].sort(() => Math.random() - 0.5);
    shuffledCards.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;
        card.innerHTML = "?";
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
});
