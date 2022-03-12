
var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ['red','blue','green','yellow'];
var started = false;

  var level =0;

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);

}


$(".btn").click(function(event){
  var userChosenColor =  event.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});


function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
  $("#"+currentColor).removeClass("pressed")
  },100);
}

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    startOver();
  }
}

function startOver(){
  level=0;
  gamePattern=[];
  started = false;

}

function playSound(name){
  switch(name){
    case "green":
    var green = new Audio("sounds/green.mp3");
    green.play();
    break;
    case "blue":
    var blue = new Audio("sounds/blue.mp3");
    blue.play();
    break;
    case "yellow":
    var yellow = new Audio("sounds/yellow.mp3");
    yellow.play();
    break;
    case "red":
    var red = new Audio("sounds/red.mp3");
    red.play();
    break;
    case "wrong":
    var wrong= new Audio("sounds/wrong.mp3");
    wrong.play();
    break;

  }
}
