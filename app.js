/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

-Implemented by: Dimitar Dimitrov
-Originaly created by: Jonas Schmedtmann https://twitter.com/jonasschmedtman
*/
var scores, roundScore, prevRoll, activePlayer, dice, gamePlaying;

init();

// You can have --> callBack Function, argument function
document.querySelector('.btn-roll').addEventListener('click', function() { 
    if (gamePlaying) {
        // 1. Random number
        dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        // create a variable for the dice HTML element
        diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        if (dice === 6 && prevRoll === 6) {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        }
        else if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            prevRoll = dice;
        }
        else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() { 
    if (gamePlaying) {
        scores[activePlayer] += roundScore;

        // Update UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 15) {
            gamePlaying = false;
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            document.querySelector('.btn-hold').style.display = 'none';
            document.querySelector('.btn-roll').style.display = 'none';
        }
        else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    roundScore = 0;
    prevRoll = 0;
    document.getElementById('current-' + activePlayer).textContent = roundScore;

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    prevRoll = 0;
    gamePlaying = true;

    // Manipulate the CSS via the 'style'
    document.querySelector('.dice').style.display = 'none';

    // Faster than querySelector !!!!!!
    // Set all score to 0 in the beginning
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    document.querySelector('.btn-hold').style.display = 'block';
    document.querySelector('.btn-roll').style.display = 'block';
}
