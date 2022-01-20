var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue", "green", "yellow"];
var randomNumber;
var level = 0;
var started = false;

function playsound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

$("body").keypress(function(event) {
  if(!started){
  nextSequence();
  $("h1").text("level " + level);
  started =  true;
  }
});

function nextSequence(){
  randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playsound(randomChosenColour);
  level++;
  $("h1").text("level " + level );
  userClickedPattern = [];
}

$(".btn").click(function(){

  var userChosenColour= $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playsound(userChosenColour);
  $("#" + userChosenColour).addClass("pressed");
  setTimeout(function(){
    $("#" + userChosenColour).removeClass("pressed");
  }, 100);
  var x= userClickedPattern.length-1;
  checkanswer(x);
  if(userClickedPattern.length === level)
  {
    setTimeout(function(){
      nextSequence();
    }, 1000);
  }

});

function checkanswer(index) {

  if(gamePattern[index] !== userClickedPattern[index])
  {
    // console.log("Game Over !!");
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    playsound("wrong");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
