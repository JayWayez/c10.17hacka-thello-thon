

$(document).ready(initializeApplication);

function initializeApplication() {

    window.game = new Othello();
    game.createBlocks(8, 8);
    initialFourCoins();
    allowClickHandler(checkAvailableSpace(game.currentPlayer));
    playerSelectionModal();
    playBackgroundMusic();
    $(".btn.btn-default").click(playBackgroundMusic);
    $(".btn.btn-default").click(statusBarFlag);
    $(".btn.btn-default").click(factionOst);
}
function playerSelectionModal (){
    $('#playerSelectModal').modal('show');
}

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
    this.checkForWin = function(){
        //create if statement checking for total coin?
    };

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
        //Removes Click Handler
        removeClickHandler(lastLocations);
        allowClickHandler(checkAvailableSpace(game.currentPlayer));
        score();
        displayOutput();
        factionOst();

    }
}

/************  Block  **************/
function IndBlock(locationObj){
    this.IndBlockSelf=this;
    this.location = locationObj;
    this.domElement = null;
    this.createDomElement = function(clickCallback){
        this.domElement = $("<div>",{
            'class': 'cell test'
        });
        return this.domElement;
    };
    this.setCurrentMark = function(mark){
        var currentTurnPlayer = game.playerTurn[game.currentPlayer];
        var playerCoin = $("<img>").attr("src", currentTurnPlayer.coinImage);
        var currentElement= this.domElement[0];
        currentElement.setAttribute('box_owned_by', game.currentPlayer);
        $(currentElement).append(playerCoin);
    };
    this.getCurrentMark = function(){
        return this.domElement[0].attributes.box_owned_by;
    }
}




/************  Block  **************/

function houseList (){


    var player1 = {
        'house' : 'stark',
        'coinImage': 'images/stark.png',
        'audio': 'sounds/stark2.mp3',
        'flagImage': 'image/flag/...',
        'backgroundImg': 'image/background/...',
        'score': null,
        "symbol": "0"
    }
    var player2 = {
        'house' : 'greyjoy',
        'coinImage': 'images/greyjoy.png',
        'audio': 'sounds/greyjoy.mp3',
        'flagImage': 'image/flag/...',
        'backgroundImg': 'image/background/...',
        'score': null,
         "symbol": "1"

};
    var lannister = {
        'house' : 'lannister',
        'coinImage': 'image/coin/...',
        'audio': 'audio/...',
        'flagImage': 'image/flag/...',
        'backgroundImg': 'image/background/...',
        'score': null
    }
    var targaryen= {
        'house' : 'targaryen',
        'coinImage': 'image/coin/...',
        'audio': 'audio/...',
        'flagImage': 'image/flag/...',
        'backgroundImg': 'image/background/...',
        'score': null
    }

    var houses = [player1, player2];
    return houses;
}

function displayOutput(){
    $(".p1_stat_box > p").text(counter1);
    $(".p2_stat_box > p").text(counter2);
}






///////score/////////////////////////////////////
var counter1=null;
var counter2= null;

function score(){

    var isClicked = false;

    for (var i = 0; i < game.cells.length; i++){
        for (var j = 0; j < game.cells[i].length; j++){
            var currentCell = game.cells[i][j].domElement[0];
            if($(currentCell).attr('box_owned_by')==="1" && $(currentCell).attr('isClicked') === undefined){
                isClicked = true;
                counter2++;
                $(currentCell).attr('isClicked', true);
            }else if($(currentCell).attr('box_owned_by')==="0" && $(currentCell).attr('isClicked') === undefined){
                isClicked = true;
                counter1++;
                $(currentCell).attr('isClicked', true);
            }
        }
    }
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



/************  Init 4 coins  **************/

function initialFourCoins() {
    let playerList = houseList();
    var player1coin_1 = $("<img>").attr("src", playerList[0].coinImage);
    var player1coin_2 = $("<img>").attr("src", playerList[0].coinImage);
    var player2coin_1 = $("<img>").attr("src", playerList[1].coinImage);
    var player2coin_2 = $("<img>").attr("src", playerList[1].coinImage);

    $(game.cells[3][3].domElement[0]).append(player1coin_1).attr("box_owned_by", "0");
    $(game.cells[4][4].domElement[0]).append(player1coin_2).attr("box_owned_by", "0");
    $(game.cells[3][4].domElement[0]).append(player2coin_1).attr("box_owned_by", "1");
    $(game.cells[4][3].domElement[0]).append(player2coin_2).attr("box_owned_by", "1");
}






// var counter1=null;
// var counter2= null;

function checkAvailableSpace(currentPlayer) {

    var currentSpaceY = null;
    var currentSpaceX = null;
    var currentPosition = [];
    var viableSpace = [];


    for (var y = 0; y < game.cells.length; y++) {
        for (var x = 0; x < game.cells[y].length; x++) {
            if($(game.cells[y][x].domElement[0]).attr('box_owned_by') === currentPlayer.toString()) {
                currentSpaceY = y;
                currentSpaceX = x;
                for( var k = currentSpaceY-1; k <= currentSpaceY+1; k++){
                    for( var m = currentSpaceX-1; m <= currentSpaceX+1; m++){
                        if(k > -1 && k < 8 && m > -1 && m < 8 && $(game.cells[k][m].domElement[0]).attr('box_owned_by') === (1-currentPlayer).toString()) {


                            var y_axis= k-y;
                            var x_axis = m-x;
                            var y_direction = k+y_axis;
                            var x_direction = m+x_axis;

                            // if(y_direction > -1 && y_direction < 8 && x_direction > -1 && x_direction < 8 && $(game.cells[y_direction][x_direction]).attr('box_owned_by') === undefined){
                            if(y_direction > -1 && y_direction < 8 && x_direction > -1 && x_direction < 8 && $(game.cells[y_direction][x_direction].domElement[0]).attr('box_owned_by') === undefined){
                                viableSpace.push([k+y_axis,m+x_axis]);
                            }

                        }
                    }

                }
            }
        }

    }
    console.log(currentPlayer +' \'s available positions are ' + viableSpace );
    return(viableSpace);
}

function displayViable(){
    if(game.currentPlayer === '1'){
        checkAvailableSpace()
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