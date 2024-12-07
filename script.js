const cards = document.querySelectorAll('.card');
const buttons = document.querySelector('.btn-container button');
let cardOne,cardTwo;
let disableDeck = false;
let gameStarted = false;
let matchedCard = 0;
let timer;
let seconds = 0;
let minutes = 0;


function flipCard(e){ 
  let clickedCard = e.target; //getting user clicked card

  if(clickedCard !== cardOne && !disableDeck && gameStarted){ 
      clickedCard.classList.add('flip');

      if(!cardOne){
          return cardOne = clickedCard; //return the cardOne value to clickedCard
      }
      cardTwo = clickedCard;

      disableDeck = true;

      let cardOneImg = cardOne.querySelector('img').src,
      cardTwoImg = cardTwo.querySelector('img').src; 
      matchCards(cardOneImg, cardTwoImg);
  }
}
function matchCards(img1, img2){
  if(img1 === img2){ // if two cards img matched
      matchedCard++; //increment matched value by one
      if(matchedCard == 8){ // if matched value is 8 that means user has matched all the cards

          setTimeout(() => { 
              return shuffleCard();
          }, 1200); 
          clearInterval(timer); // Stop the timer when all pairs are matched
          // Adding a delay before showing the alert to wait for the flip animation to complete
          setTimeout(() => {
              alert(`You win! Time taken: ${minutes}m ${seconds}s`);
          }, 1500); // Show alert after 1.5s to ensure the last flip finishes
          timer = ""; 
           setTimeout(() => {
            document.querySelector('.timer').textContent = `Time: 0m 0s`;
            seconds = 0; // Reset the seconds variable to 0
        }, 2000); // Set a slight delay after the alert before resetting the timer
      }
      cardOne.removeEventListener('click', flipCard);
      cardTwo.removeEventListener('click', flipCard);
      cardOne = cardTwo = '';//7.4
      return disableDeck = false;
  } else{
      setTimeout(() => { // if two card not matched
          cardOne.classList.add('shake');// adding shake class to both card after 400ms
          cardTwo.classList.add('shake');
      }, 400);

      setTimeout(() => { // removing both shake and flip classes from the both card after 1.2s
          cardOne.classList.remove('shake', 'flip');
          cardTwo.classList.remove('shake', 'flip');
          cardOne = cardTwo = '';//setting both card value to blank

          disableDeck = false;

      }, 1200);
  }
}

function shuffleArray(arr) {
  // Start from the last element and go backwards
  for (let i = arr.length - 1; i > 0; i--) {
      // Generate a random index between 0 and i
      const j = Math.floor(Math.random() * (i + 1));

      // Swap arr[i] with arr[j]
      [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}


function shuffleCard(){
  matchedCard = 0;
  cardOne = cardTwo = "";

  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]; //creating array of 16 items and each item is repeated twice
  shuffleArray(arr);

  cards.forEach((card, index) => { 
      card.classList.remove('flip');
      card.addEventListener('click', flipCard);

      let imgTag = card.querySelector('img');
      imgTag.src = `images/img-${arr[index]}.png`;
  });
}
shuffleCard();

  function startTimer() {
    gameStarted = true;  // Mark game as started
       // Change the button text to "Stop Game" when the game starts
      //  buttons.textContent = 'Stop Game'; 
    timer = setInterval(() => {
        seconds++;
        if (seconds === 60) { // If 60 seconds pass, increment minutes and reset seconds
          minutes++;
          seconds = 0;
      }
        document.querySelector('.timer').textContent = `Time: ${minutes}m ${seconds}s`;
    }, 1000);

    shuffleCard(); // Shuffle and start the game
}

buttons.addEventListener('click', () => {
  if (gameStarted) {
    clearInterval(timer);  // Stop the timer when game is stopped
    buttons.textContent = 'Start Game';  // Change button text back to 'Start Game'
} else {
    startTimer();  // Start the game and timer
    buttons.textContent = 'Stop Game'; 
}
});


cards.forEach(card => { // adding click event to all cards
  card.addEventListener('click', flipCard); 
});

