/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

//created this dice for two consecutive six


// dice = Math.floor(Math.random() * 6) +  1;
// console.log(dice);

// Math.random gives you random numbers in the console.
// Math.floor rounds the numbers
// Math.floor(Math.random() * 6)  will give you a round random number between 1-6

// document.querySelector('#current-' + activePlayer).textContent = dice;
// textContent can only select plain text, without styling form html 
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';  (for stylish italic .innerhtml must be selected)
// var x = document.querySelector('#score-0').textContent;
// console.log(x);
// this method above only allows us to GET and not set;


// function btn() {
//     do something here, we will use this fucntion to be called below in the doc. 
//     then this btn function will be called a callback function because it is being called by another function such as the one
//     below which is the event listener method function
// }
// btn();

document.querySelector('.btn-roll').addEventListener('click', function() {
    //gameplaying is already true
    if(gamePlaying) {
//if we want to write an anonymous function we can write it right after the click in the (), and it can not be used anywhere else but for this here
//we will start writing it below this document.query line, and tell it to do something so we will not use the event listener method.
// can not be used outside of this scope.
// 1. Random number 
var dice1 = Math.floor(Math.random() * 6) + 1; // Math.floor(Math.random() * 6)  will give you a round random number between 1-6
var dice2 = Math.floor(Math.random() * 6) + 1; // Math.floor(Math.random() * 6)  will give you a round random number between 1-6
//2. Display the result
// we created this variable so we can assign an image for whenever it changes
document.getElementById('dice-1').style.display = 'block';
document.getElementById('dice-2').style.display = 'block';
document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
 //we are also selecting the dice src and toggling between the .png by using the math.random which is associated with dice
// so the var dice randomizes it and add's the integer to the end of dice- .. for example if a 4 was rolled, dice-4 will be generated

//3. Update the round score IF the rolled number was NOT a 1
if (dice1 !== 1 && dice2 !== 1) {
//             //Player looses score
        roundScore += dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
     } else {
         nextPlayer();
     }
//             scores[activePlayer] = 0;
//             document.querySelector('#score-' + activePlayer).textContent = '0';
//             nextPlayer();
// } else if (dice !== 1) {
//     //Add score
//     roundScore += dice;  //roundScore is from our Global variable above; the rolled dice amount will be added to it if it's not 1
//     document.querySelector('#current-' + activePlayer).textContent = roundScore;
//     // we are grabbing the current score that is associated with the active player and updating the roundedScore
// } else {
//     //Next player
//     nextPlayer();
//     }
//     lastDice = dice;
    }

});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) { // all of this happens when game is playing
        // Add CURRENT score to GLOBAL score (main score (total score wich is the #score))
        scores[activePlayer] += roundScore;
        //activeplayer's value is the index position inside of the array so if it's 1 it's changing the other player's score
        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;
        // Undefined, 0, null or "" are COERCED to false ; our input is "" empty string right now
        // Anything else is COERCED to true; so if the empty string input is changed, the if statement is saying to update it to that
        // if nothing is changed set it to 100 max for the winning score.
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); /// removes the dot
            gamePlaying = false; //concludes the game, switches it off
        } else {
            //Next player
            nextPlayer();
        }

    }
    
});

function nextPlayer() {
    // activeplayer by default is set to player 1, so if the player rolls a 1 dice, the other player's turn should come
    // ternary statement means if active player score is 0 then active player should be 1
    // else active player should be 0
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // so remember this is continuing from player rolling 1 and if the player rolls a 1, bascially switch players
    roundScore = 0; // and roundscore set it to 0 when the player rolls a 1, since it's from this else the opposite of !==1
    document.getElementById('current-0').textContent = '0'; // then update the player score to 0
    document.getElementById('current-1').textContent = '0'; // notice how the main total score is not here (score) that's why it never resets to 0

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');   
    // this works just fine, but you remove a better way is below.

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);
// for the new game button, anonymous function called init, so when somoene click that call it

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true; // a state variable that tells us the condition of a system, so we can remember the state of something

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    // we selected the style by .selector and hid it.
    // for these 4 below we are grabbing the score elements and setting them all to 0 to start the game with for all scores, (upon page refresh);
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
}

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row.  After that, it's the next
player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100.
(Hint: you can read that value with the .value property in JavaScript. This is a good opportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now.  The player looses at his current score when
one of them is a 1.  (HInt: you will need CSS to position the second dice, so take a look a the CSS
code for the first one.)
*/
