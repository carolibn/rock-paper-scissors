class RPSGame {
    static WIN_TARGET = 5;
    static ROCK = "rock";
    static PAPER = "paper";
    static SCISSORS = "scissors";
    static PLAYER_WINNER = 1;
    static COMPUTER_WINNER = 2;
    static NO_WINNER = 3;

    constructor() {
        this.initGameState();
        this.setupEventListeners();
        this.playAgainButton = document.querySelector("#replay_button");
    }

    // Initializes the game state for a fresh game
    initGameState() {
        this.playerSelection = null;
        this.computerSelection = null;
        this.playerScore = 0;
        this.computerScore = 0;
    }

    // Resets the game so that player can play again
    resetGame() {
        this.initGameState();
        this.displayReset();
    }

    // Sets up event listeners
    setupEventListeners() {
        let playerOptions = document.querySelectorAll(".player-option-icon");
        for (const option of playerOptions) {
            option.addEventListener("click", () => this.playRound(option.getAttribute("name")));
        }
    }

    // Plays a round of the game
    playRound(playerOption) {
        this.setPlayerSelection(playerOption);
        this.generateComputerSelection();

        let roundWinner = this.getRoundWinner();
        this.updateScore(roundWinner);
        this.displayRound(roundWinner);

        // Check if game has ended
        if (this.playerScore === RPSGame.WIN_TARGET || this.computerScore === RPSGame.WIN_TARGET) {
            this.displayGameEnd();
        }
    }

    // Sets player selection in the game state
    setPlayerSelection(playerOption) {
        if (![RPSGame.ROCK, RPSGame.PAPER, RPSGame.SCISSORS].includes(playerOption)) {
            console.log("Invalid option provided!");
            return;
        }
        this.playerSelection = playerOption;
    }

    // Generates computer selection in the game state
    generateComputerSelection() {
        let randomSelection = Math.floor(Math.random() * 3) + 1;
        let numToComputerSelection = {
            1: RPSGame.ROCK,
            2: RPSGame.PAPER,
            3: RPSGame.SCISSORS
        };
        this.computerSelection = numToComputerSelection[randomSelection];
    }

    // Gets winner of round
    getRoundWinner() {
        const moveToCounterMove = {
            [RPSGame.ROCK]: RPSGame.PAPER,
            [RPSGame.PAPER]: RPSGame.SCISSORS,
            [RPSGame.SCISSORS]: RPSGame.ROCK
        }

        if (!this.playerSelection || !this.computerSelection) {
            console.log("No selection was made for player or computer!")
            return null;
        }
        else if (this.playerSelection == this.computerSelection) {
            return RPSGame.NO_WINNER;
        }
        else {
            let counterMove = moveToCounterMove[this.playerSelection]
            if (this.computerSelection === counterMove) {
                return RPSGame.COMPUTER_WINNER;
            }
            else {
                return RPSGame.PLAYER_WINNER;
            }
        }
    }

    // Updates the score in the game state
    updateScore(roundWinner) {
        if (this.playerScore === RPSGame.WIN_TARGET || this.computerScore === RPSGame.WIN_TARGET) {
            console.log("Can't update the score since game is already over!");
            return;
        }

        switch (roundWinner) {
            case RPSGame.PLAYER_WINNER:
                this.playerScore += 1;
                break;
            case RPSGame.COMPUTER_WINNER:
                this.computerScore += 1;
                break;
        }
    }

    // Displays all updates for a round
    displayRound(roundWinner) {
        this.displaySelections(false);
        this.displaySelections(true);
        this.displayRoundWinner(roundWinner);
        this.displayScore();
    }

    // Displays the player and computer selection
    displaySelections(isActive) {
        if (isActive) {
            let playerSelectionImage = document.querySelector("#player-" + this.playerSelection);
            let computerSelectionImage = document.querySelector("#computer-" + this.computerSelection);

            playerSelectionImage.classList.add("option-active");
            computerSelectionImage.classList.add("option-active");
            setTimeout(() => {
                playerSelectionImage.classList.remove("option-active");
                computerSelectionImage.classList.remove("option-active");
            }, 1500);
        }
        else {
            let selectionImages = document.querySelectorAll(".player-option-icon, .computer-option-icon");
            for (const selectionImage of selectionImages) {
                selectionImage.classList.remove("option-active");
            }

        }

    }

    // Displays winner of the round
    displayRoundWinner(roundWinner) {
        switch (roundWinner) {
            case RPSGame.PLAYER_WINNER:
                document.querySelector("#winner_result").innerText = "You win the round!";
                break;
            case RPSGame.COMPUTER_WINNER:
                document.querySelector("#winner_result").innerText = "The computer wins the round!";
                break;
            case RPSGame.NO_WINNER:
                document.querySelector("#winner_result").innerText = "It's a tie!";
                break;
        }
    }

    // Displays current score
    displayScore() {
        document.querySelector("#player_score").innerText = this.playerScore;
        document.querySelector("#computer_score").innerText = this.computerScore;
    }

    // Displays who won the game and asks if player wants to play again
    displayGameEnd() {
        if (this.playerScore === 5) {
            document.querySelector("#winner_result").innerText = "You win the game!";
        }
        else if (this.computerScore === 5) {
            document.querySelector("#winner_result").innerText = "The computer wins the game!";
        }

        this.playAgainButton.style.visibility = "visible";
        this.playAgainButton.addEventListener("click", () => this.resetGame());
    }

    // Resets display for new game
    displayReset() {
        this.displayScore()
        this.playAgainButton.style.visibility = "hidden";
        this.displaySelections(false);
        document.querySelector("#winner_result").innerText = "Make your move";
    }
}

let game = new RPSGame()