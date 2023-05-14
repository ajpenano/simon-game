//alert("hello");
var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

$(".btn").on("click", function() { //helped
    var userChosenColor = $(this).attr("id"); //helped
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor); //helped
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);   //helped
});

var started = false; //helped
var level = 0;

$(document).keydown(function(){
    if (!started){  //helped      
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    userClickedPattern = [];    //helped
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    toggleColor(randomChosenColor);
    playSound(randomChosenColor);
    level++;
    $("#level-title").text("Level "+level);
} 

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function toggleColor(color){
    $("#"+color).fadeIn(100).fadeOut(100).fadeIn(100);
}

$(document).keydown(function(event){
    switch (event.key) {
        case "r":
            userClickedPattern.push("red");
            playSound("red");
            animatePress("red");
            checkAnswer(userClickedPattern.length-1);
            break;
        case "b":
            userClickedPattern.push("blue");
            playSound("blue");
            animatePress("blue");
            checkAnswer(userClickedPattern.length-1)
            break;
        case "g":
            userClickedPattern.push("green");
            playSound("green");
            animatePress("green");
            checkAnswer(userClickedPattern.length-1)
            break;
        case "y":
            userClickedPattern.push("yellow");
            playSound("yellow");
            animatePress("yellow");
            checkAnswer(userClickedPattern.length-1)
            break;
        default: ;
            break;
    }
});

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed"); //helped
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed"); //helped
    }, 100);
}

//helped
function checkAnswer(colorIndex){
    if(userClickedPattern[colorIndex]===gamePattern[colorIndex]){    
        if (userClickedPattern.length===gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }       
       else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}