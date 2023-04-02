const form = document.querySelector('#form');
const playerNameInput = document.querySelector('#player-name');
const gameContainer = document.querySelector('#game-container');
const playerScoreElem = document.querySelector('#player-score');
const computerScoreElem = document.querySelector('#computer-score');
const resultElem = document.querySelector('#result');
const playerHand = document.querySelector('#player-hand');
const computerHand = document.querySelector('#computer-hand');

const playerSelections = {
    rock: 0,
    paper: 0,
    scissors: 0,
    spock: 0,
    lizard: 0
  };

// Set up game variables
let playerName = '';
let playerScore = 0;
let computerScore = 0;
const weapons = ['rock', 'paper', 'scissors', 'spock', 'lizard'];

// Add event listener to form
form.addEventListener('submit', function(event) {
  event.preventDefault();
  playerName = playerNameInput.value;
  startGame();
});

// Start the game
function startGame() {
    
  // Hide the form and show the game container
  form.style.display = 'none';
  gameContainer.style.display = 'block';

  // Update player name in the game container
  const playerNameElem = document.querySelector('#player-name-elem');
  playerNameElem.textContent = playerName;

  // Add event listeners to buttons
  const rockBtn = document.querySelector('#rock');
  rockBtn.addEventListener('click', function() {
    playRound('rock');
  });

  const paperBtn = document.querySelector('#paper');
  paperBtn.addEventListener('click', function() {
    playRound('paper');
  });

  const scissorsBtn = document.querySelector('#scissors');
  scissorsBtn.addEventListener('click', function() {
    playRound('scissors');
  });

  const spockBtn = document.querySelector('#spock');
  spockBtn.addEventListener('click', function() {
    playRound('spock');
  });

  const lizardBtn = document.querySelector('#lizard');
  lizardBtn.addEventListener('click', function() {
    playRound('lizard');
  });
}

// Function to play one round of the game
function getComputerChoice() {
   
    const choices = Object.keys(playerSelections);
    const maxCount = Math.max(...Object.values(playerSelections));
    const mostFrequent = choices.filter(choice => playerSelections[choice] === maxCount);
  
    let computerChoice;

    // Add some randomness to the choice
    if (Math.random() < 0.35) {
        computerChoice = choices[Math.floor(Math.random() * choices.length)];
    } else if (mostFrequent.length === 1) {
      // Only one weapon has been selected most frequently, choose the weapon that beats it
      switch (mostFrequent[0]) {
        case 'rock':
          computerChoice = 'paper';
          break;
        case 'paper':
          computerChoice = 'scissors';
          break;
        case 'scissors':
          computerChoice = 'rock';
          break;
        case 'spock':
          computerChoice = 'paper';
          break;
        case 'lizard':
          computerChoice = 'scissors';
          break;
      }
    } else {
      // More than one weapon has been selected most frequently, choose a random one
      const randomIndex = Math.floor(Math.random() * mostFrequent.length);
      computerChoice = mostFrequent[randomIndex];
    }

    if (computerChoice === 'paper') {
        computerHand.innerHTML = "✋"
    }  else if (computerChoice === 'rock') {
        computerHand.innerHTML = "✊"
    }  else if (computerChoice === 'scissors') {
        computerHand.innerHTML = "✌️"
    }  else if (computerChoice === 'spock') {
        computerHand.innerHTML = '🖖'
    } else if (computerChoice === 'lizard') {
        computerHand.innerHTML = "🦎"
    };
  
    // Increment the count for the player's selection
  
    return computerChoice;
}

function win(playerChoice, computerChoice) {
  playerScore++;
  playerScoreElem.textContent = playerScore;
  resultElem.textContent = `${playerName}'s ${playerChoice} beats Computer's ${computerChoice}. You win!`;

}

function lose(playerChoice, computerChoice) {
  computerScore++;
  computerScoreElem.textContent = computerScore;
  resultElem.textContent = `Computer's ${computerChoice} beats ${playerName}'s ${playerChoice}. You lose!`;
 
}

function tie(playerChoice, computerChoice) {
  resultElem.textContent = `Both players chose ${playerChoice}. It's a tie!`;

}

function playRound(playerChoice) {


    if (playerChoice === 'paper') {
        playerHand.innerHTML = "✋"
      }  else if (playerChoice === 'rock') {
        playerHand.innerHTML = "✊"
      }  else if (playerChoice === 'scissors') {
        playerHand.innerHTML = "✌️"
      }  else if (playerChoice === 'spock') {
        playerHand.innerHTML = '🖖'
      } else if (playerChoice === 'lizard') {
        playerHand.innerHTML = "🦎"
      };


    const computerChoice = getComputerChoice();
    
    

    switch (playerChoice + computerChoice) {
      case 'rockscissors':
      case 'rocklizard':
      case 'paperrock':
      case 'paperspock':
      case 'scissorspaper':
      case 'scissorslizard':
      case 'spockrock':
      case 'spockscissors':
      case 'lizardspock':
      case 'lizardpaper':
        win(playerChoice, computerChoice);
        break;
      case 'rockpaper':
      case 'rockspock':
      case 'paperscissors':
      case 'paperlizard':
      case 'scissorsrock':
      case 'scissorsspock':
      case 'spockpaper':
      case 'spocklizard':
      case 'lizardrock':
      case 'lizardscissors':
        lose(playerChoice, computerChoice);
        break;
      case 'rockrock':
      case 'paperpaper':
      case 'scissorsscissors':
      case 'spockspock':
      case 'lizardlizard':
        tie(playerChoice, computerChoice);
        break;
    }
  
    playerHand.classList.add('animate');
    computerHand.classList.add('animate');
  
    setTimeout(() => {
      playerHand.classList.remove('animate');
      computerHand.classList.remove('animate');
    }, 3000);

    playerSelections[playerChoice]++;
  }


