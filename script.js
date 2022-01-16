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

let playerWinCount = 0
let computerWinCount = 0

function playRound(playerSelection, computerSelection) {
    switch (playerSelection) {
        case "rock":
            if (computerSelection === "rock") {
                alert("It's a draw!")
            }
            else if (computerSelection === "paper") {
                alert("You lose! Paper beats rock.")
                computerWinCount++
            }
            else {
                alert("You win! Rock beats scissors.")
                playerWinCount++
            }
            break
        case "paper":
            if (computerSelection === "rock") {
                alert("You win! Paper beats rock.")
                playerWinCount++
            }
            else if (computerSelection === "paper") {
                alert("It's a draw!")
            }
            else {
                alert("You lose! Scissors beat paper.")
                computerWinCount++
            }
            break
        case "scissors":
            if (computerSelection === "rock") {
                alert("You lose! Rock beats scissors.")
                computerWinCount++
            }
            else if (computerSelection === "paper") {
                alert("You win! Scissors beat paper.")
                playerWinCount++
            }
            else {
                alert("It's a draw!")
            }
            break
    }
}

function game() {
    for (let i = 0; i < 5; i++) {
        let playerSelection = getPlayerSelection()
        let computerSelection = getComputerSelection()
        playRound(playerSelection, computerSelection)
    }

    if (playerWinCount === computerWinCount) {
        alert("You drew in the game. Refresh the game to play again!")
    }
    else if (playerWinCount > computerWinCount) {
        alert("You won the game. Refresh the game to play again!")
    }
    else {
        alert("You lost the game. Refresh the game to try again!")
    }
}

game()