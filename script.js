function getComputerSelection() {
    let randomSelection = Math.floor(Math.random() * 3) + 1
    let numToComputerSelection = {
        1: "rock",
        2: "paper",
        3: "scissors"
    }
    let computerSelection = numToComputerSelection[randomSelection]
    alert(`The computer chose ${computerSelection}`)
    return computerSelection
}

function getPlayerSelection() {
    while (true) {
        let playerSelection = prompt("Make your move: rock, paper, or scissors").toLowerCase()
        if (["rock", "paper", "scissors"].includes(playerSelection)) {
            return playerSelection
        }
        else {
            alert("That is not a valid move. Please try again.")
        }
    }
}

function playRound(playerSelection, computerSelection) {
    let moveToCounterMove = {
        "rock": "paper",
        "paper": "scissors",
        "scissors": "rock"
    }

    if (playerSelection == computerSelection) {
        alert("It's a draw!")
        return 0
    }
    else {
        let counterMove = moveToCounterMove[playerSelection]
        if (computerSelection === counterMove) {
            alert(`You lose: ${computerSelection} beats ${playerSelection}`)
            return -1
        }
        else {
            alert(`You win: ${playerSelection} beats ${computerSelection}`)
            return 1
        }
    }
}

function game() {
    let score = 0

    for (let i = 0; i < 5; i++) {
        let playerSelection = getPlayerSelection()
        let computerSelection = getComputerSelection()
        score += playRound(playerSelection, computerSelection)
    }

    if (score === 0) {
        alert("You drew in the game. Refresh the game to play again!")
    }
    else if (score > 0) {
        alert("You won the game. Refresh the game to play again!")
    }
    else {
        alert("You lost the game. Refresh the game to try again!")
    }
}

game()