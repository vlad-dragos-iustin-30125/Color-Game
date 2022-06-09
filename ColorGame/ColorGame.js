var numSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  setUpModeButtons();
  setUpSquares();
  reset();
}

function setUpModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function () {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      modeButtons[2].classList.remove("selected");
      modeButtons[3].classList.remove("selected");
      modeButtons[4].classList.remove("selected");
      this.classList.add("selected");
      if (this.textContent === "Easy") {
        numSquares = 3;
        makeBigSquares();
      } else if (this.textContent === "Hard") {
        numSquares = 6;
        makeBigSquares();
      } else if (this.textContent === "Hardest") {
        numSquares = 12;
        makeSmallSquares();
      } else if (this.textContent === "Ultra Hard") {
        numSquares = 54;
        makeExtraSmallSquares();
      } else if (this.textContent === "Insanity") {
        numSquares = 216;
        makeSuperSmallSquares();
      }
      reset();
    });
  }
}

function makeSuperSmallSquares() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].classList.remove("square");
    squares[i].classList.remove("square-sm");
    squares[i].classList.remove("square-xs");
    squares[i].classList.add("square-ss");
  }
}

function makeExtraSmallSquares() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].classList.remove("square");
    squares[i].classList.remove("square-sm");
    squares[i].classList.remove("square-ss");
    squares[i].classList.add("square-xs");
  }
}

function makeSmallSquares() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].classList.remove("square");
    squares[i].classList.remove("square-xs");
    squares[i].classList.remove("square-ss");
    squares[i].classList.add("square-sm");
  }
}

function makeBigSquares() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].classList.remove("square-sm");
    squares[i].classList.remove("square-xs");
    squares[i].classList.remove("square-ss");
    squares[i].classList.add("square");
  }
}

function setUpSquares() {
  for (var i = 0; i < squares.length; i++) {
    //add click listeners
    squares[i].addEventListener("click", function () {
      //grab color of clicked square
      var clickedColor = this.style.backgroundColor;
      //compare color to pickedColor
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct";
        changeColors(clickedColor);
        resetButton.textContent = "Play Again";
        h1.style.backgroundColor = clickedColor;
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try again";
      }
    });
  }
}

function reset() {
  //generate all new colors
  colors = generateRandomColors(numSquares);
  //pick new random color from array
  pickedColor = pickColor();
  //change colorDisplay to match picked color
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "New Colors";
  messageDisplay.textContent = "";
  //change colors of squares
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function () {
  reset();
});

function changeColors(color) {
  //loop through all squares
  for (var i = 0; i < squares.length; i++) {
    //change all colors to match give colors
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  //make array
  var arr = [];
  //add num random colors to array
  for (var i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  //return array
  return arr;
}

function randomColor() {
  //pick a "red" from 0 to 255
  var r = Math.floor(Math.random() * 256);
  //pick a "green" from 0 to 255
  var g = Math.floor(Math.random() * 256);
  //pick a "blue" from 0 to 255
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
