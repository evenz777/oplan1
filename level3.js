const board = document.getElementById("gameBoard");
const statusDiv = document.getElementById("status");
let firstCard, secondCard, thirdCard;
let lockBoard = false;
let matchesFound = 0;
let images = [];

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function loadGame() {
  board.innerHTML = "";
  statusDiv.textContent = "Match all triplets!";
  firstCard = secondCard = thirdCard = null;
  lockBoard = false;
  matchesFound = 0;

  const numTriplets = 12; // 3 sets = 9 cards
  images = [];
  for (let i = 1; i <= numTriplets; i++) {
    images.push(`img${i}.jpg`, `img${i}.jpg`, `img${i}.jpg`);
  }
  images = shuffle(images);
  images.forEach(img => board.appendChild(createCard(img)));
}

function createCard(imageSrc) {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner");

  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front");

  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");
  cardBack.style.backgroundImage = `url('${imageSrc}')`;

  cardInner.append(cardFront, cardBack);
  card.appendChild(cardInner);

  card.addEventListener("click", () => flipCard(card));
  return card;
}

function flipCard(card) {
  if (lockBoard || card.classList.contains("flip") || card.classList.contains("matched")) return;

  card.classList.add("flip");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  if (!secondCard) {
    secondCard = card;
    return;
  }

  thirdCard = card;
  lockBoard = true;

  const img1 = firstCard.querySelector(".card-back").style.backgroundImage;
  const img2 = secondCard.querySelector(".card-back").style.backgroundImage;
  const img3 = thirdCard.querySelector(".card-back").style.backgroundImage;

  if (img1 === img2 && img2 === img3) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    thirdCard.classList.add("matched");
    matchesFound++;

    if (matchesFound === images.length / 3) {
      setTimeout(() => {
        statusDiv.textContent = "🎉 Task Completed! Restarting...";
        setTimeout(loadGame, 2000);
      }, 500);
    }

    resetTurn();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      thirdCard.classList.remove("flip");
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard, thirdCard] = [null, null, null];
  lockBoard = false;
}

// Start the game
loadGame();
