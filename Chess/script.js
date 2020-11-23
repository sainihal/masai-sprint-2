//arr used to hold details for movement in a particular step
var arr = [];
//state arr stores all the steps . Helps in undo opeations
var state = [];
document.getElementById("play").addEventListener("click", createGame);

//creates chess board
function createBoard() {
  event.target.remove();
  var container = document.getElementById("container");
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      var cell = document.createElement("div");
      cell.setAttribute("id", "R" + i + "C" + j);
      cell.style.border = "1px solid gray";
      cell.style.flexBasis = "50px";
      cell.addEventListener("click", processGame);
      container.appendChild(cell);
    }
  }
  container.style.display = "grid";
  container.style.gridTemplateRows = "80px 80px 80px 80px 80px 80px 80px 80px";
  container.style.gridTemplateColumns =
    "80px 80px 80px 80px 80px 80px 80px 80px";
  container.style.gridGap = "5px";

  for (var i = 0; i <= 7; i = i + 2) {
    for (var j = 0; j <= 7; j = j + 2) {
      var ele = document.getElementById("R" + i + "C" + j);
      ele.style.backgroundColor = "rgb(179, 119, 0)";
    }
  }
  for (var i = 1; i <= 7; i = i + 2) {
    for (var j = 1; j <= 7; j = j + 2) {
      var ele = document.getElementById("R" + i + "C" + j);
      ele.style.backgroundColor = "rgb(179, 119, 0)";
    }
  }
  createUndo();
}

//creates undo button
function createUndo() {
  var undo = document.createElement("div");
  undo.setAttribute("id", "undo");
  undo.textContent = "UNDO";
  undo.addEventListener("click", fetchPreviousState);
  undo.style.position = "relative"
  undo.style.left="150px"
  document
    .querySelector("body")
    .insertBefore(undo, document.querySelector("div"));
}

//invokes other createcoin functions
function createCoins() {
  createBlackCoinImages();
  createWhiteCoinImages();
}

//create black coins
function createBlackCoinImages() {
  //BlackElephants
  var img = document.createElement("img");
  img.setAttribute("src", "resources\\BlackEle.png");
  document.getElementById("R0C0").appendChild(img);
  img = document.createElement("img");
  img.setAttribute("src", "resources\\BlackEle.png");
  document.getElementById("R0C7").appendChild(img);
  //BlackHorses
  img = document.createElement("img");
  img.setAttribute("src", "resources\\BlackHorse.png");
  document.getElementById("R0C1").appendChild(img);
  img = document.createElement("img");
  img.setAttribute("src", "resources\\BlackHorse.png");
  document.getElementById("R0C6").appendChild(img);
  img = document.createElement("img");
  img.setAttribute("src", "resources\\BlackCamel.png");
  document.getElementById("R0C2").appendChild(img);
  img = document.createElement("img");
  img.setAttribute("src", "resources\\BlackCamel.png");
  document.getElementById("R0C5").appendChild(img);
  img = document.createElement("img");
  img.setAttribute("src", "resources\\BlackMinister.png");
  document.getElementById("R0C3").appendChild(img);
  img = document.createElement("img");
  img.setAttribute("src", "resources\\BlackKing.png");
  document.getElementById("R0C4").appendChild(img);

  for (var i = 0; i < 8; i++) {
    var img = document.createElement("img");
    img.setAttribute("src", "resources\\BlackSoilder.png");
    document.getElementById("R1C" + i).appendChild(img);
  }
}

//creates white coins
function createWhiteCoinImages() {
  //BlackElephants
  var img = document.createElement("img");
  img.setAttribute("src", "resources\\WhiteEle.png");
  document.getElementById("R7C0").appendChild(img);
  img = document.createElement("img");
  img.setAttribute("src", "resources\\WhiteEle.png");
  document.getElementById("R7C7").appendChild(img);
  //BlackHorses
  img = document.createElement("img");
  img.setAttribute("src", "resources\\WhiteHorse.png");
  document.getElementById("R7C1").appendChild(img);
  img = document.createElement("img");
  img.setAttribute("src", "resources\\WhiteHorse.png");
  document.getElementById("R7C6").appendChild(img);
  img = document.createElement("img");
  img.setAttribute("src", "resources\\WhiteCamel.png");
  document.getElementById("R7C2").appendChild(img);
  img = document.createElement("img");
  img.setAttribute("src", "resources\\WhiteCamel.png");
  document.getElementById("R7C5").appendChild(img);
  img = document.createElement("img");
  img.setAttribute("src", "resources\\WhiteMinister.png");
  document.getElementById("R7C3").appendChild(img);
  img = document.createElement("img");
  img.setAttribute("src", "resources\\WhiteKing.png");
  document.getElementById("R7C4").appendChild(img);

  for (var i = 0; i < 8; i++) {
    var img = document.createElement("img");
    img.setAttribute("src", "resources\\WhiteSoilder.png");
    document.getElementById("R6C" + i).appendChild(img);
  }
}

//invokes createBoard and createCoins
function createGame() {
  createBoard();
  createCoins();
  createRules();
}

//stores the steps to help undo
function storeState() {
  var presentState = document.getElementById("container").cloneNode(true);
  // document.getElementById("container")
  state.push(presentState);
  console.log("state stored");
}

//does all the logical operations in game
function processGame(e) {
  e.preventDefault();
  console.log(
    "id is" +
      (event.target.getAttribute("id") ||
        event.target.parentElement.getAttribute("id"))
  );
  if (arr.length == 0) {
    arr.push(
      event.target.getAttribute("id") ||
        event.target.parentElement.getAttribute("id")
    );
    console.log(
      "pushed into arr" +
        (event.target.getAttribute("id") ||
          event.target.parentElement.getAttribute("id"))
    );
    console.log("arr is" + arr.length, arr[0]);
    storeState();
  } else {
    var ele = arr.pop();
    console.log(
      "pop element from arr" + document.getElementById(ele).getAttribute("id")
    );
    console.log(
      "ele text content is" + document.getElementById(ele).textContent
    );
    if (event.target.nodeName == "IMG") {
      var parentEle = event.target.parentElement;
      console.log("clicked image");
      console.log(event.target);
      event.target.parentElement.querySelector("img").remove();
      console.log("after removing");
      console.log(event.target);
      console.log(parentEle);
      parentEle.textContent = document.getElementById(ele).textContent;
      var img = document.getElementById(ele).lastChild;
      document.getElementById(ele).textContent = "";
      parentEle.appendChild(img);
      storeState();
      return;
    }
    event.target.textContent = document.getElementById(ele).textContent;
    var img = document.getElementById(ele).lastChild;
    console.log(img.nodeType);
    document.getElementById(ele).textContent = "";
    event.target.appendChild(img);
    storeState();
  }
}

//help fetch previous state in the game
function fetchPreviousState() {
  if (state.length == 0) {
    return;
  }

  var prevState = state.pop();
  var presState = document.getElementById("container");
  presState.remove();
  var ele = prevState.querySelectorAll("div");
  var tot = ele.length;
  for (var i = 0; i < tot; i++) {
    ele[i].addEventListener("click", processGame);
  }
  document.querySelector("body").appendChild(prevState);
  console.log("In Undo");
  while (arr.length != 0) {
    arr.pop();
  }
}

function createRules(){
  var div = document.createElement("div")
  div.style.width = "400px"
  div.style.border= "1px solid black"
  div.innerHTML = "<div style=\"padding:15px;font-size:18px\"><h1>Rules for the game.</h1><br /><p>1)Click on the coin which needs to be selected.</p><br/><p>2)Next click on cell where the coin needs to be placed.</p> <br /><p> 3) To undo a move double click on the undo button. </p></div>"
  div.style.position = "fixed"
  div.style.top = "100px"
  div.style.right = "5px"
  div.style.backgroundColor =  "rgb(179, 119, 0,0.8)"
  document.getElementById("container").appendChild(div)
}