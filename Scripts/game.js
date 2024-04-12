// Get the start screen and the game screen
let startScreen = document.querySelector('.startGameWindow');
let gameScreen = document.querySelector('.gameWindow');

// Get game music
let gameMusic = new Audio('./Assets/Sound/GameMusic.mp3');
//Get start button
let startButton = document.querySelector('#startGame');
// Add a click event listener to the start button
startButton.addEventListener('click', function() {
    // Hide the start screen and show the game screen
    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    gameMusic.loop = true;
    gameMusic.play();
    gameMusic.volume = 0.5;
});    

// Define the choices and the rules of the game
const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
const rules = {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['spock', 'paper'],
    spock: ['rock', 'scissors']
};

// Initialize the scores
let scores = {
    player: 0,
    computer: 0
};

// Function to get the computer's choice
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Function to determine the winner
function getWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'It\'s a tie!';
    } else if (rules[playerChoice].includes(computerChoice)) {
        scores.player++;
        return 'Player wins!';
    } else {
        scores.computer++;
        return 'Computer wins!';
    }
}

// Get the buttons
let buttons = document.querySelectorAll('.moveList button');

// Get the scoreboard
let scoreboard = {
    player: document.querySelector('#playerScore'),
    computer: document.querySelector('#opponentScore')
};

// Get the screenOverlay div
let screenOverlay = document.querySelector('.screenOverlay');

// Create a new element for the result
let resultElement = document.createElement('p');
resultElement.id = 'result'; 
screenOverlay.appendChild(resultElement);

// Add click event listeners to the buttons
// Add click event listeners to the buttons
buttons.forEach(button => {
    button.addEventListener('click', function() {
        let playerChoice = this.id.toLowerCase(); // The id of the button is the player's choice

        // Play the game
        let computerChoice = getComputerChoice();
        let result = getWinner(playerChoice, computerChoice);

        // Update the scores in localStorage
        localStorage.setItem('scores', JSON.stringify(scores));

        console.log(`Player chose ${playerChoice}`);
        console.log(`Computer chose ${computerChoice}`);
        console.log(result);

        // Get the player's hand and the opponent's hand images
        let playerHandImg = document.querySelector('.playerHandImg img');
        let opponentHandImg = document.querySelector('.opponentHandImg img');

        // Set the src attribute of the img elements
        playerHandImg.src = "./Assets/Screenshots/Moves/" + playerChoice + ".png";
        opponentHandImg.src = "./Assets/Screenshots/Moves/" + computerChoice + ".png";

        // Display the result in the middle of the screen
        resultElement.textContent = result;
        resultElement.style.display = 'block';

        // Update the scoreboard
        scoreboard.player.textContent = "Player: " + scores.player;
        scoreboard.computer.textContent = "Computer: " + scores.computer;

        // Check if the game is over
        if (scores.player === 3 || scores.computer === 3) {
            // Pause the game music
            gameMusic.pause();

            // Update the result to show who won the game
            if (scores.player === 3) {
                resultElement.textContent = 'Player wins the game!';
            } else {
                resultElement.textContent = 'Computer wins the game!';
            }

            // Clear the game screen and show the start screen after a delay
            setTimeout(function() {
                // Hide the gameWindow div
                gameScreen.style.display = 'none';

                // Show the startGameWindow and the restart button
                startScreen.style.display = 'block';
                restartButton.style.display = 'block';

                // Hide the startButton
                startButton.style.display = 'none';
                
                // Reset the player and opponent hand images
                playerHandImg.src = "./Assets/Screenshots/Moves/emptyhand.png";
                opponentHandImg.src = "./Assets/Screenshots/Moves/emptyhand.png";
            }, 2000); // 2000 milliseconds = 2 seconds
        }
    });
});
// Get restart button
let restartButton = document.querySelector('#restartGame');
//Get empty hand image
let emptyHandImg =  document.querySelector('.emptyHandImg');

// Add a click event listener to the restart button
restartButton.addEventListener('click', function() {
    // Hide the start screen and show the game screen
    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    gameMusic.loop = true;
    gameMusic.play();
    gameMusic.volume = 0.5;
    restartButton.style.display = 'none';
    // Reset the game
    resetGame();
}); 
// Function to reset the game
function resetGame() {
    // Reset the game
    scores.player = 0; // Reset the player score
    scores.computer = 0; // Reset the computer score
    gameMusic.play();

    // Update the scoreboard
    scoreboard.player.textContent = "Player: " + scores.player;
    scoreboard.computer.textContent = "Computer: " + scores.computer;
    // Hide the result element
    resultElement.style.display = 'none';
}