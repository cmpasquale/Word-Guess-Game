var wordGuess = ["lisa", "mo", "apu","krusty", "milhouse", "smithers", "flanders", "barney", "duffman","ralph","willie"];
var cpuPick = "";
var letterNumber = [];
var letterSpaces = 0;
var remaining = [];
var wrongGuess = [];
var playerGuess= " ";
var wins = 0 ;
var loses = 0 ;
var guesses = 6;

function gameTime () {
  guesses = 6;
  cpuPick = wordGuess[Math.floor(Math.random() * wordGuess.length)];
  letterNumber = cpuPick.split("");
  letterSpaces = letterNumber.length;
  console.log (cpuPick);
  remaining = [];
  loses = [];
    for (var i = 0; i < letterSpaces.length; i++){
      remaining.push("_");
    }
  document.getElementById("remaining").innerHTML = guesses;
  document.getElementById("slots").innerHTML = remaining.join(" ");
  document.getElementById("loses").innerHTML = loses.join(" ");
}

function checker(correctLetter){
  var letterPresent = false;
  for (var i = 0; i < letterSpaces.length ; i++){

      if (cpuPick[i] === correctLetter) {
          letterPresent = true;
      }
  }
      if (letterPresent){
        //differnet letter for variable because they are in the same function?
        for (var a = 0; a < letterSpaces.length; a++){

            if (cpuPick[a] === correctLetter){
                remianing [a] = correctLetter;
            }
        }
      }
        else {
          wrongGuess = [];
          guesses--;
        }
      }

function endRound(){
  document.getElementById("remaining").innerHTML = guesses;
  document.getElementById("slots").innerHTML = remaining.join(" ");
  document.getElementById("loses").innerHTML = loses.join(" ");
  if (letterNumber.toString() === remaining.toString() ){
    wins ++;
    alert ("You found the culprit!!");
    document.getElementById("RoundWins").innerHTML = wins;
    gameTime();
  }
  else if (guesses === 0) {
    loses ++;
    alert ("YOU LOSE! THEY GOT AWAY!");
    document.getElementById("loses").innerHTML = wins;
    gameTime();
    }
}
  gameTime ();
  document.onkeyup = function (event) {
    playerGuess = ""; String.fromCharCode(event.which).toLowerCase();
    checker(playerGuess);
  };
  endRound();