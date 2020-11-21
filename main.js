const CHOICES = [
    {
        name: 'rock',
        emoji: '✊',
        beats: 'scissors'
    },
    {
        name: 'paper',
        emoji: '✋',
        beats: 'rock'
    },
    {
        name: 'scissors',
        emoji: '✌',
        beats: 'paper'
    }
]

const selectionButtons = document.querySelectorAll('[data-selection]')
const playerCounter = document.querySelector('[player-score]')
const computerCounter = document.querySelector('[computer-score]')

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection;
        const choice = CHOICES.find(choices => choices.name === selectionName);
        makeChoice(choice);

        if (Number(playerCounter.innerText) === 5) {
            let x = confirm("You've won the game! Do you want to play again?");
            if (x == true) location.reload()
            else location.reload();
        };
        if (Number(computerCounter.innerText) === 5) {
            let y = confirm("The computer has beaten you! Do you want to play again?");
            if (y == true) location.reload();
            else location.reload();
        }
    })
})

function makeChoice(choice) {
    const computerSelection = computerPlay();
    const playerWinner = isWinner(choice, computerSelection);
    const computerWinner = isWinner(computerSelection, choice);

    addResult(computerSelection, computerWinner);
    addResult(choice, playerWinner);

    if (playerWinner) incrementCounter(playerCounter);
    if (computerWinner) incrementCounter(computerCounter);

    console.log(computerSelection)
    console.log(choice);
}

function incrementCounter(scoreCounter) {
    scoreCounter.innerHTML = parseInt(scoreCounter.innerHTML) + 1;
}

function computerPlay() {
    const number = Math.floor(Math.random() * 3);
    return CHOICES[number];
    }

function addResult(choice, winner) {
    const addDiv = document.querySelector('[column]')
    const div = document.createElement('div');
    div.innerHTML = (choice.emoji) + choice.name;
    if (!winner) div.classList.add('loser');
    if (winner) div.classList.add('winner');
    addDiv.after(div);

}    

function isWinner (player, computer) {
    return player.beats === computer.name;
}