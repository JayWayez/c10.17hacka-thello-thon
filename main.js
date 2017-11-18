$(document).ready(initializeApplication);

function initializeApplication() {
  window.game = new Othello();
  game.createBlocks(8, 8);
    initialFourCoins();
    allowClickHandler(checkAvailableSpace(game.currentPlayer));
    // playerSelectionModal();
    // playBackgroundMusic();
    // $(".btn.btn-default").click(playBackgroundMusic);
    $(".btn.btn-default").click(statusBarFlag);
    $(".btn.btn-default").click(factionOst);
}

// function playerSelectionModal() {
//   modal = document.getElementById("modal");
//   modal.style.display = "block";
//   $(".stark").on("click", checkPlayerOrder);
//   $(".lannister").on("click", checkPlayerOrder);
//   $(".targaryen").on("click", checkPlayerOrder);
//   $(".greyjoy").on("click", checkPlayerOrder);
//   close_modal_handle();
// }

// function close_modal_handle() {
//   window.onclick = function() {
//     if (event.target === modal) {
//       modal.style.display = "none";
//     }
//   };
//   $(".close_modal_button").on("click", function() {
//     modal.style.display = "none";
//   });
// }
// var player1 = null;
// var player2 = null;

// function checkPlayerOrder(){
//     var houses = houseList();

//     if (player1 === null) {
//         for (var i = 0; i < houses.length; i++){
//             if(houses[i].house === this.children[0].alt) {
//                 houses[i].symbol = 0;
//                 player1 = houses[i];
//             }
//         }

//     } else {
//         for (var i = 0; i < houses.length; i++){
//             if(houses[i].house === this.children[0].alt) {
//                 houses[i].symbol = 1;
//                 player2 = houses[i];
//                 initialFourCoins();
//             }
//         }
//     }

//     console.log(player1, player2);
//     // var activePlayers = (player1, player2)
//     // return activePlayers;
// }

/*********** Othello*************/

function Othello(){
    var selfOthello = this;
    this.containerElement = $("#gameBoard");
    this.currentPlayer = 0;
    this.playerTurn = houseList();
    this.cells = [ ];

    this.createBlocks = function(row,column){
        var width= row;
        var length= column;

        for(var y = 0; y<width; y++){
            var row = [];

            for(var x =0; x<length; x++){
                var cell = new IndBlock({'x': x, 'y':y});

                var cellDomElement = cell.createDomElement( this.handleBlockClick.bind(this) );
                if(y%2===0 && x%2===0){
                    cell.domElement[0].style.backgroundImage="url('images/bg_2.png')";
                }else if(y%2!==0 && x%2!==0){
                    cell.domElement[0].style.backgroundImage="url('images/bg_2.png')";
                } else {
                    cell.domElement[0].style.backgroundImage="url('images/bg_1.png')";
                }
                row.push(cell);
                this.containerElement.append(cellDomElement);
            }
            this.cells.push(row);
        }
    };
    this.toggleCurrentPlayer = function(){
        this.currentPlayer = 1 - this.currentPlayer;
    };
    /*this.checkForWin = function(){
        //create if statement checking for total coin?
        if (counter1 === 64 || counter2 === 64){
            console.log("game over");
        }else if (counter1 === 32 && counter2 === 32){
            console.log("this is a draw");
        }

    }*/;

    //this function not yet
    this.getCurrentPlayerSymbol = function(){
        return this.playerTurn[this.currentPlayer].symbol;
    };
    this.handleBlockClick = function(){
        var currentSymbol = game.getCurrentPlayerSymbol();
        //check if the button has been clicked.
        if(this.getCurrentMark()=== undefined){
            this.setCurrentMark(currentSymbol);
            game.toggleCurrentPlayer();
        }
        var element= document.body.getElementsByClassName('available');
        $(element).removeClass("available");
        removeClickHandler(lastLocations);
        allowClickHandler(checkAvailableSpace(game.currentPlayer));
        displayOutput(score());
        // checkForWin();
        // factionOst();
    }
}

/*==================================================== Block  ========================================================*/
/*====================================================================================================================*/

function IndBlock(locationObj){
    this.IndBlockSelf=this;
    this.location = locationObj;
    this.domElement = null;
    this.createDomElement = function(clickCallback){
        this.domElement = $("<div>",{
            'class': 'cell test',
           text: 'x:'+locationObj.x+',y:'+locationObj.y
        });
        return this.domElement;
    };
    this.setCurrentMark = function(mark){
        var currentTurnPlayer = game.playerTurn[game.currentPlayer];
        var playerCoin = $("<img>").attr("src", currentTurnPlayer.coinImage);
        var currentElement= this.domElement[0];
        currentElement.setAttribute('box_owned_by', game.currentPlayer);
        $(currentElement).append(playerCoin);
        flipCoin(this.location.y, this.location.x);
        console.log(this.location.y, this.location.x);

    };
    this.getCurrentMark = function(){
        return this.domElement[0].attributes.box_owned_by;
    }
}


// function flipCoin (y, x) {
//
//     currentSpaceY = y;
//     currentSpaceX = x;
//     var totalCellsToFlip = [];
//     for (var k = currentSpaceY - 1; k <= currentSpaceY + 1; k++) {
//         for (var m = currentSpaceX - 1; m <= currentSpaceX + 1; m++) {
//             $(".highlight").removeClass('highlight');
//             $(game.cells[k][m].domElement[0]).addClass('highlight');
//             if (k > -1 && k < 8 && m > -1 && m < 8 && $(game.cells[k][m].domElement[0]).attr('box_owned_by') === (1 - game.currentPlayer).toString()) {
//
//                 var y_axis = k - y;
//                 var x_axis = m - x;
//                 var y_vector = k + y_axis;
//                 var x_vector = m + x_axis;
//
//
//                 var possibleCells = []
//                 var a = y + y_axis, b = x + x_axis;
//                 while ($(game.cells[a][b].domElement[0]).attr('box_owned_by') == (1 - game.currentPlayer)) {
//                     possibleCells.push($(game.cells[a][b].domElement[0]));
//                     a += y_axis;
//                     b += x_axis;
//                 }
//                 if ($(game.cells[a][b].domElement[0]).attr('box_owned_by') == game.currentPlayer) {
//                     totalCellsToFlip = totalCellsToFlip.concat(possibleCells);
//                 }
//
//                 // if(Math.sign(y_axis) === 1 && Math.sign(x_axis) === 0){
//                 //     for(var q = y ; q < 8; q ++){
//                 //         if($(game.cells[k][m].domElement[0]).attr('box_owned_by') === (game.currentPlayer).toString()){
//                 //             var currentTurnPlayer = game.playerTurn[game.currentPlayer];
//                 //             $(game.cells[q][b].domElement[0]).find('img').attr('src', currentTurnPlayer.coinImage );
//                 //             $(game.cells[q][b].domElement[0]).attr( 'box_owned_by', game.currentPlayer);
//                 //         }else{
//                 //
//                 //         }
//                 //     }
//                 // }
//
//             }
//
//         }
//     }
//     for (var flipIndex = 0; flipIndex < totalCellsToFlip.length; flipIndex++) {
//         var currentTurnPlayer = game.playerTurn[game.currentPlayer];
//         totalCellsToFlip[flipIndex].attr('box_owned_by', game.currentPlayer).find('img').attr('src', currentTurnPlayer.coinImage);
//     }
// }
function houseList() {
  var player1 = {
    house: "stark",
    coinImage: "images/stark.png",
    audio: "audio/...",
    flagImage: "image/flag/...",
    backgroundImg: "image/background/...",
    score: null,
    symbol: "0"
  };
  var player2 = {
    house: "greyjoy",
    coinImage: "images/greyjoy.png",
    audio: "audio/...",
    flagImage: "image/flag/...",
    backgroundImg: "image/background/...",
    score: null,
    symbol: "1"
  };
  var lannister = {
    house: "lannister",
    coinImage: "image/coin/...",
    audio: "audio/...",
    flagImage: "image/flag/...",
    backgroundImg: "image/background/...",
    score: null
  };
  var targaryen = {
    house: "targaryen",
    coinImage: "image/coin/...",
    audio: "audio/...",
    flagImage: "image/flag/...",
    backgroundImg: "image/background/...",
    score: null
  };

  var houses = [player1, player2];
  return houses;
}

function displayOutput(counters){
    var counter=counters;
    $(".p1_stat_box p:nth-child(2)").text(counter[0]);
    $(".p2_stat_box p:nth-child(2)").text(counter[1]);
}


///////score/////////////////////////////////////
//if you leave global previous count stays and overlaps
// var counter1 = null;
// var counter2 = null;

function score() {
//Do we need isClicked?
    var isClicked = false;
    var counter1 = null;
    var counter2 = null;

//just adding, needs to substract
  for (var i = 0; i < game.cells.length; i++) {
    for (var j = 0; j < game.cells[i].length; j++) {
      var currentCell = game.cells[i][j].domElement[0];
      if($(currentCell).attr("box_owned_by") === "1"){
          counter2++
      }
      else if(($(currentCell).attr("box_owned_by") === "0")){
          counter1++
      }
    }
  }
  var output=[counter1, counter2];
  return(output);
}


/*==============================Faction Select==============================*/
function statusBarFlag() {
    var playerList = houseList();
    //put coin image for now, need to change to flag
    var player1flag = $("<img>").attr("src", playerList[0].coinImage);
    var player2flag = $("<img>").attr("src", playerList[1].coinImage);

    $('.p1_flag_box').append(player1flag);
    $('.p2_flag_box').append(player2flag);
}

// function checkForWin(){
//     //create if statement checking for total coin?
//     if (counter1 === 64 || counter2 === 64) {
//         console.log("game over");
//     } else if (counter1 === 32 && counter2 === 32) {
//         console.log("this is a draw");
//     }
// }


/************  Init 4 coins  **************/

function initialFourCoins() {
  var playerList = houseList();
  var player1coin_1 = $("<img>").attr("src", playerList[0].coinImage);
  var player1coin_2 = $("<img>").attr("src", playerList[0].coinImage);
  var player2coin_1 = $("<img>").attr("src", playerList[1].coinImage);
  var player2coin_2 = $("<img>").attr("src", playerList[1].coinImage);

  $(game.cells[3][3].domElement[0])
    .append(player1coin_1)
    .attr("box_owned_by", "0");
  $(game.cells[4][4].domElement[0])
    .append(player1coin_2)
    .attr("box_owned_by", "0");
  $(game.cells[3][4].domElement[0])
    .append(player2coin_1)
    .attr("box_owned_by", "1");
  $(game.cells[4][3].domElement[0])
    .append(player2coin_2)
    .attr("box_owned_by", "1");
}

// var counter1=null;
// var counter2= null;

/*===========================================CHECK AVAIL SPACE========================================================*/
/*====================================================================================================================*/

function checkAvailableSpace(currentPlayer) {
    var needToBeFlipped = [];
    var viableSpace = [];
    var currentSpaceY = null;
    var currentSpaceX = null;


    //search for all boxes owned by player
    for (var y = 0; y < game.cells.length; y++) {
        for (var x = 0; x < game.cells[y].length; x++) {
            if ($(game.cells[y][x].domElement[0]).attr('box_owned_by') == currentPlayer) {
                currentSpaceY = y;
                currentSpaceX = x;
                //looks around the found player coin for enemy coins
                for(var xDelta=-1; xDelta<2; xDelta++){
                    for(var yDelta=-1; yDelta<2; yDelta++){
                        // if($(game.cells[currentSpaceY+yDelta][currentSpaceX+xDelta].domElement[0]).attr('box_owned_by') == 1-currentPlayer &&currentSpaceY<game.cells.length &&currentSpaceY>-1 && currentSpaceX<game.cells.length && currentSpaceX>-1){
                        //initial four conditions for corners
                        if(currentSpaceY+yDelta>-1 && currentSpaceX+xDelta>-1 &&currentSpaceX+xDelta<game.cells.length&&currentSpaceY+yDelta<game.cells.length&&  $(game.cells[currentSpaceY+yDelta][currentSpaceX+xDelta].domElement[0]).attr('box_owned_by') == 1-currentPlayer){
                            //if enemy coin found, searches all spaces through the same direction.
                            for(var y_vector=yDelta, x_vector=xDelta; y_vector<game.cells.length&& y_vector>-game.cells.length && x_vector<game.cells.length&&x_vector>-game.cells.length; y_vector=y_vector+yDelta, x_vector=x_vector+xDelta) {
                                if (currentSpaceY + y_vector > -1 && currentSpaceY + y_vector<game.cells.length && currentSpaceX + x_vector> - 1 &&currentSpaceX + x_vector<game.cells.length) {

                                    $(game.cells[currentSpaceY + y_vector][currentSpaceX + x_vector].domElement[0]).addClass('highlight');

                                    if ($(game.cells[currentSpaceY + y_vector][currentSpaceX + x_vector].domElement[0]).attr('box_owned_by') == 1 - currentPlayer) {
                                        //pushing as object enemy cell found location, current location, and vector direction.
                                        needToBeFlipped.push({
                                            "enemy_cell_found": [currentSpaceY + y_vector, currentSpaceX + x_vector],
                                            "current_location": [currentSpaceY, currentSpaceX],
                                            "vector_direction": [yDelta, xDelta]
                                        });
                                    } else if ($(game.cells[currentSpaceY + y_vector][currentSpaceX + x_vector].domElement[0]).attr('box_owned_by') == currentPlayer) {
                                        //to stop the loop if value found
                                        y_vector = game.cells.length + 8;
                                        x_vector = game.cells.length + 8;
                                    } else if ($(game.cells[currentSpaceY + y_vector][currentSpaceX + x_vector].domElement[0]).attr('box_owned_by') === undefined) {
                                        viableSpace.push([currentSpaceY + y_vector, currentSpaceX + x_vector]);
                                        y_vector = game.cells.length + 8;
                                        x_vector = game.cells.length + 8;
                                    }
                                    $(".highlight").removeClass('highlight');

                                }
                            }
                        }
                    }
                }

            }
        }
    }

    console.log(currentPlayer + ' \'s available positions are ' + viableSpace);
    console.log('spaces to be flipped ' + needToBeFlipped);
    return (viableSpace);
}

/*==============================================FLIP COIN=============================================================*/
/*====================================================================================================================*/
function flipCoin (y, x){

    currentSpaceY = y;
    currentSpaceX = x;
    var totalCellsToFlip = [];
    if(currentSpaceY > -1 && currentSpaceY < game.cells.length && currentSpaceX > -1 && currentSpaceX < game.cells.length) {
        for (var k = currentSpaceY - 1; k <= currentSpaceY + 1; k++) {
            for (var m = currentSpaceX - 1; m <= currentSpaceX + 1; m++) {
                // $(".highlight").removeClass('highlight');
                // $(game.cells[k][m].domElement[0]).addClass('highlight');
                // if (k > -1 && k < 8 && m > -1 && m < 8 && $(game.cells[k][m].domElement[0]).attr('box_owned_by') === (1 - game.currentPlayer).toString()) {
                if (k > -1 && k < game.cells.length && m > -1 && m < game.cells.length && $(game.cells[k][m].domElement[0]).attr('box_owned_by') == (1 - game.currentPlayer)) {

                    var y_axis = k - y;
                    var x_axis = m - x;
                    var y_direction = k + y_axis;
                    var x_direction = m + x_axis;
                    var possibleCells = [];
                    var a = y + y_axis, b = x + x_axis;
                    if (a > -1 && a < game.cells.length && b > -1 && b < game.cells.length) {
                        while (a > -1 && a < game.cells.length && b > -1 && b < game.cells.length && $(game.cells[a][b].domElement[0]).attr('box_owned_by') == (1 - game.currentPlayer) && $(game.cells[a][b].domElement[0]).attr('box_owned_by') !== undefined) {
                            if ($(game.cells[a][b].domElement[0]).attr('box_owned_by') !== undefined) {
                                possibleCells.push($(game.cells[a][b].domElement[0]));

                                a += y_axis;
                                b += x_axis;
                            }
                        }
                        if (a > -1 && a < game.cells.length && b > -1 && b < game.cells.length && $(game.cells[a][b].domElement[0]).attr('box_owned_by') == game.currentPlayer && $(game.cells[a][b].domElement[0]).attr('box_owned_by') !== undefined) {
                            totalCellsToFlip = totalCellsToFlip.concat(possibleCells);
                        }
                    }

                }

            }
        }
        for (var flipIndex = 0; flipIndex < totalCellsToFlip.length; flipIndex++) {
            var currentTurnPlayer = game.playerTurn[game.currentPlayer];
            totalCellsToFlip[flipIndex].attr('box_owned_by', game.currentPlayer).find('img').attr('src', currentTurnPlayer.coinImage);
        }


    }

}






function displayViable() {
  if (game.currentPlayer === "1") {
    checkAvailableSpace();
  }
}

var lastLocations;

function allowClickHandler(locations){
    for(var i=0; i<locations.length; i++){
        for(var j=0; j<1; j++){
            var clickableButton= game.cells[locations[i][j]][locations[i][j+1]];
            $(clickableButton.domElement[0]).addClass("available");
            $(clickableButton.domElement[0]).click(game.handleBlockClick.bind(clickableButton));
        }

    }
    //when there are no avail spaces to move triggers the no space function.
    if(locations.length===0){
        whenNoSpace();
    }
    lastLocations=locations;
    return locations;
}

function removeClickHandler(locations){
    for(var i=0; i<locations.length; i++){
        for(var j=0; j<1; j++){
            var clickableButton= game.cells[locations[i][j]][locations[i][j+1]];
            $(clickableButton.domElement[0]).unbind('click');
        }

    }
}

function whenNoSpace(){
    //need if statement to check if its the end of game or middle of game
    console.log("no available move");
    game.toggleCurrentPlayer();
}

/*==================================Sound=================================*/
var backgroundMusic= new Audio();
backgroundMusic.src = "sounds/main_song.mp3";

function playBackgroundMusic(){

    if(OstisPlaying){
        backgroundMusic.pause();
        OstisPlaying= false;
    }else {
        backgroundMusic.play();
        OstisPlaying= true;
    }
}
var OstisPlaying;


var playerSongPlaying;
var playerSong= new Audio();


function factionOst(){
    playerSong.src= $(game.playerTurn[game.currentPlayer]).attr("audio");
    if(game.currentPlayer ==="1"){
        playerSong.play();
    }else{
        playerSong.play();
    }
}




