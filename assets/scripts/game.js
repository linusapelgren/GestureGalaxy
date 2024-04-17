
//Variables
const WEAPONS_CONFIG = {
    rock: {
        name: 'Rock',
        winsOver: ['scissors', 'lizard'],
    },
    paper: {
        name: 'Paper',
        winsOver: ['rock', 'spock'],
    },
    scissors: {
        name: 'Scissors',
        winsOver: ['paper', 'lizard'],
    },
    lizard: {
        name: 'Lizard',
        winsOver:  ['spock', 'paper'],
    },
    spock: {
        name: 'Spock',
        winsOver: ['rock', 'scissors']
    },
};
let isWeaponClickDisabled = false;
let startScreen = document.querySelector('.startGameWindow');
let gameScreen = document.querySelector('.gameWindow');
let gameMusic = new Audio('./assets/sound/GameMusic.mp3');
let winSound = new Audio('./assets/sound/yay.mp3');
let startButton = document.querySelector('#startGame');
let scores = {
    player: 0,
    computer: 0
};
let buttons = document.querySelectorAll('.moveList button');
let scoreboard = {
    player: document.querySelector('#playerScore'),
    computer: document.querySelector('#opponentScore')
};
let screenOverlay = document.querySelector('.screenOverlay');
let resultElement = document.createElement('p');
resultElement.id = 'result'; 
screenOverlay.appendChild(resultElement);
let restartButton = document.querySelector('#restartGame');
let emptyHandImg =  document.querySelector('.emptyHandImg');
let muteButton = document.querySelector('#mute');
let isMuted = false;
let roundWin = new Audio('./assets/Sound/roundWin.mp3');
let arcadeName = document.querySelector('#arcadeName');
let inputName = document.querySelector('#inputName');
//Functions

// Function to handle the start button click event
function onStartBtnClick() {
    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    gameMusic.loop = true;
    gameMusic.play();
    gameMusic.volume = 0.2;
}
// Function to get the computer's choice
function getComputerChoice() {
    var keys = Object.keys(WEAPONS_CONFIG);    
    const randomIndex = Math.floor(Math.random() * keys.length);
    return WEAPONS_CONFIG[keys[randomIndex]].name.toLowerCase();
}

// Function to determine the winner
function getWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return {playerWon: false, message: 'It\'s a tie!'};
    } else if (WEAPONS_CONFIG[playerChoice].winsOver.includes(computerChoice)) {
        scores.player++;
        return {playerWon: true, message: 'Player wins!'};
    } else {
        scores.computer++;
        return {playerWon: false, message: 'Computer wins!'};
    }
}
//Function to handle the weapon button click event
function onWeaponBtnClick() {

    if(isWeaponClickDisabled) {
        return;
    }

    isWeaponClickDisabled = true;

    let move = document.getElementById('move');
    move.textContent = "Move in progress..."

    // Get the player's hand and the opponent's hand images
    let playerHandImg = document.querySelector('.playerHandImg img');
    let opponentHandImg = document.querySelector('.opponentHandImg img');

    // Reset the player and opponent hand images
    playerHandImg.src = "./assets/screenshots/moves/emptyhand.png";
    opponentHandImg.src = "./assets/screenshots/moves/emptyhand.png";

    // Apply the fade animation to the images
    playerHandImg.classList.add('fade');
    opponentHandImg.classList.add('fade');

    resultElement.style.display = 'none'; // Hide the result element
    
    let playerChoice = this.id.toLowerCase(); // The id of the button is the player's choice

    // Delay the execution of the move by 3 seconds
    setTimeout(function() {
        // Remove the fade animation from the images
        playerHandImg.classList.remove('fade');
        opponentHandImg.classList.remove('fade');

        // Play the game
        let computerChoice = getComputerChoice();
        let {playerWon, message} = getWinner(playerChoice, computerChoice);

        // Update the scores in localStorage
        localStorage.setItem('scores', JSON.stringify(scores));

        console.log(`Player chose ${playerChoice}`);
        console.log(`Computer chose ${computerChoice}`);
        console.log(message);

        // Set the src attribute of the img elements
        playerHandImg.src = "./assets/screenshots/moves/" + playerChoice + ".png";
        opponentHandImg.src = "./assets/screenshots/moves/" + computerChoice + ".png";

        // Display the result in the middle of the screen
        resultElement.textContent = message;
        resultElement.style.display = 'block';

        // Update the scoreboard
        scoreboard.player.textContent = "Player: " + scores.player;
        scoreboard.computer.textContent = "Computer: " + scores.computer;
        
        // Play the round win sound if the player or the computer wins the round
        function onWeaponBtnClick() {

            if(isWeaponClickDisabled) {
                return;
            }
        
            isWeaponClickDisabled = true;
        
            let move = document.getElementById('move');
            move.textContent = "Move in progress..."
        
            // Get the player's hand and the opponent's hand images
            let playerHandImg = document.querySelector('.playerHandImg img');
            let opponentHandImg = document.querySelector('.opponentHandImg img');
        
            // Reset the player and opponent hand images
            playerHandImg.src = "./assets/screenshots/moves/emptyhand.png";
            opponentHandImg.src = "./assets/screenshots/moves/emptyhand.png";
        
            // Apply the fade animation to the images
            playerHandImg.classList.add('fade');
            opponentHandImg.classList.add('fade');
        
                resultElement.style.display = 'none'; // Hide the result element
                
                let playerChoice = this.id.toLowerCase(); // The id of the button is the player's choice
            
                // Delay the execution of the move by 3 seconds
                setTimeout(function() {
                    // Remove the fade animation from the images
                    playerHandImg.classList.remove('fade');
                    opponentHandImg.classList.remove('fade');
            
                    // Play the game
                    let computerChoice = getComputerChoice();
                    let {playerWon, message} = getWinner(playerChoice, computerChoice);
            
                    // Update the scores in localStorage
                    localStorage.setItem('scores', JSON.stringify(scores));
            
                    console.log(`Player chose ${playerChoice}`);
                    console.log(`Computer chose ${computerChoice}`);
                    console.log(message);
            
                    // Set the src attribute of the img elements
                    playerHandImg.src = "./assets/screenshots/moves/" + playerChoice + ".png";
                    opponentHandImg.src = "./assets/screenshots/moves/" + computerChoice + ".png";
            
                    // Display the result in the middle of the screen
                    resultElement.textContent = message;
                    resultElement.style.display = 'block';
            
                    // Update the scoreboard
                    scoreboard.player.textContent = "Player: " + scores.player;
                    scoreboard.computer.textContent = "Computer: " + scores.computer;
                    
                    // Play the round win sound if the player or the computer wins the round
                    roundWin.volume = 0.5;
                    if ((playerWon && scores.player < 3) || (!playerWon && scores.computer < 3)) {
                        gameMusic.volume = 0.1; // Lower the volume of the game music;
                        roundWin.play();
            
                        // Resume the game music when the round win sound has finished playing
                        roundWin.onloadedmetadata = function() {
                            setTimeout(function() {
                                gameMusic.volume = 0.2; // Reset the volume of the game music
                            }, roundWin.duration * 1000); // roundWin.duration is in seconds, so multiply by 1000 to convert to milliseconds
                        };
                    }
                    // Check if the game is over
                    if (scores.player === 3 || scores.computer === 3) {
                        // Pause the game music
                        gameMusic.pause();
                        winSound.volume = 0.5;
                        winSound.play();
            
                        // Update the result to show who won the game
                        if (scores.player === 3) {
                            resultElement.textContent = 'Player wins the game!';
                        } else {
                            resultElement.textContent = 'Computer wins the game!';
                        }
                    }
                    move.textContent = "Make a move!";
                    isWeaponClickDisabled = false;
                }, 1500); // 1500 milliseconds = 1.5 seconds;
            }
            // Check if the game is over
            if (scores.player === 1 || scores.computer === 1) {
                // Pause the game music
                gameMusic.pause();
                winSound.play();

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
                
                // Hide the startButton
                startButton.style.display = 'none';

                if (playerWon) {
                    // Show the player wins message
                    arcadeName.style.display = 'block';
                    inputName.style.display = 'block';
                } else {
                    restartButton.style.display = 'block';
                }

                arcadeName.oninput = function() {
                    if (arcadeName.value.length === 3) {
                        setTimeout(function() {
                            arcadeName.style.display = 'none';
                            inputName.style.display = 'none';
                            restartButton.style.display = 'block';
                        }, 1000); // 1000 milliseconds = 1 second
                    }
                };
            }, 3500); // 3500 milliseconds = 3.5 seconds
        }
        move.textContent = "Make a move!";
        isWeaponClickDisabled = false;
    }, 1500); // 3000 milliseconds = 3 seconds 
}
//Function to handle the restart button click event
function onRestart() {
    // Hide the start screen and show the game screen
    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    gameMusic.loop = true;
    gameMusic.currentTime = 0;
    gameMusic.play();
    gameMusic.volume = 0.5;
    restartButton.style.display = 'none';
    // Reset the game
    resetGame();
}
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
//Function to handle the mute button click event
function onMuteBtnClick() {
    let icon = muteButton.querySelector('i');
    if (isMuted) {
        gameMusic.volume = 0.2;
        roundWin.volume = 0.5; // restore volume
        winSound.volume = 0.5; // restore volume
        isMuted = false;
        icon.classList.remove('fa-volume-mute');
        icon.classList.add('fa-volume-up');
        localStorage.setItem('!isMuted', !isMuted);
    } else {
        gameMusic.volume = 0;
        roundWin.volume = 0;
        winSound.volume = 0;
        isMuted = true;
        icon.classList.remove('fa-volume-up');
        icon.classList.add('fa-volume-mute');
        localStorage.setItem('isMuted', isMuted);
    }
}

//Event listeners

//Function to initialize event listeners
function initEventListeners() {
    // Add a click event listener to the start button
    startButton.addEventListener('click', onStartBtnClick);    

    // Add a click event listener to the restart button
    restartButton.addEventListener('click', onRestart);

    // Add a click event listener to each button
    buttons.forEach(button => {
        if (button.id !== 'mute') {
            button.addEventListener('click', onWeaponBtnClick);
        }
    });

    muteButton.addEventListener('click', onMuteBtnClick);
}

initEventListeners();

