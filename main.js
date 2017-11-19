$(document).ready(initializeApplication);

function initializeApplication() {

    window.game = new Othello();
    game.playerSelectionModal();
    game.createBlocks(8, 8);
    // IndBlock.playerSelectionModal();
    // initialFourCoins();
    allowClickHandler(checkAvailableSpace(game.currentPlayer));

    // $(".stark").on("click", game.players('stark').bind(this));
    // $(".lannister").on("click", game.players('lannister').bind(this));
    // $(".targaryen").on("click", game.players('targaryen').bind(this));
    // $(".greyjoy").on("click", game.players('greyjoy').bind(this));



    $(".btn.btn-default").click(statusBarFlag);
    $(".btn.btn-default").click(factionOst);


    // playBackgroundMusic();
    // $(".btn.btn-default").click(playBackgroundMusic);

}
var counter = true;
/*********** Othello*************/

function Othello(){
    var selfOthello = this;
    this.containerElement = $("#gameBoard");
    this.currentPlayer = 0;
    this.playerTurn = [];
    this.cells = [ ];

    this.createBlocks = function(row,column){
        var width= row;
        var length= column;

        for(var y = 0; y<width; y++){
            var row = [];

            for(var x =0; x<length; x++){
                var cell = new IndBlock({'x': x, 'y':y});
                var cellDomElement = cell.createDomElement( this.handleBlockClick.bind(this) );
                if(y%2===0 && x%2===0 || y%2!==0 && x%2!==0){
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


    this.initialFourCoins = function() {

        var player1coin_1 = $("<img>").attr("src", this.playerTurn[0].coinImage);
        var player1coin_2 = $("<img>").attr("src", this.playerTurn[0].coinImage);
        var player2coin_1 = $("<img>").attr("src", this.playerTurn[1].coinImage);
        var player2coin_2 = $("<img>").attr("src", this.playerTurn[1].coinImage);

        $(game.cells[3][3].domElement[0])
            .attr("box_owned_by", "0")
            .append(player1coin_1)

        $(game.cells[4][4].domElement[0])
            .attr("box_owned_by", "0")
            .append(player1coin_2)

        $(game.cells[3][4].domElement[0])
            .attr("box_owned_by", "1")
            .append(player2coin_1)

        $(game.cells[4][3].domElement[0])
            .attr("box_owned_by", "1")
            .append(player2coin_2)

    }

    this.playerSelectionModal = function() {
        var modal = document.getElementById("modal");
        modal.style.display = "block";
        $(".stark").on("click", this.players.bind(this,'stark'));
        $(".lannister").on("click", this.players.bind(this,'lannister'));
        $(".targaryen").on("click", this.players.bind(this,'targaryen'));
        $(".greyjoy").on("click", this.players.bind(this,'greyjoy'));
        // close_modal_handle();
    }

    this.players = function(playerSelected){


        if(counter){
            game.playerTurn.push(game.houseList[playerSelected]);
            counter = false;
        }else {
            game.playerTurn.push(game.houseList[playerSelected]);
            $(".close_modal_button").on("click", function() {
                modal.style.display = "none";
                game.initialFourCoins();
            });
        }
    }
    this.houseList = {
        stark : {
            house: "stark",
            coinImage: "images/stark.png",
            audio: "audio/...",
            flagImage: "image/flag/...",
            backgroundImg: "image/background/...",
        },
        greyjoy : {
            house: "greyjoy",
            coinImage: "images/greyjoy.png",
            audio: "audio/...",
            flagImage: "image/flag/...",
            backgroundImg: "image/background/...",
        },
        lannister : {
            house: "lannister",
            coinImage: "images/lannister.png",
            audio: "audio/...",
            flagImage: "image/flag/...",
            backgroundImg: "image/background/...",
        },
        targaryen : {
            house: "targaryen",
            coinImage: "images/targaryen.png",
            audio: "audio/...",
            flagImage: "image/flag/...",
            backgroundImg: "image/background/...",
        }
    }
    this.toggleCurrentPlayer = function(){
        this.currentPlayer = 1 - this.currentPlayer;
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
        this.score();
        this.checkForWin();
        removeClickHandler(lastLocations);

        allowClickHandler(checkAvailableSpace(game.currentPlayer));
    }
}

/************  Block  **************/
function IndBlock(locationObj) {
    this.IndBlockSelf = this;
    this.location = locationObj;
    this.domElement = null;
    this.createDomElement = function (clickCallback) {
        this.domElement = $("<div>", {
            'class': 'cell test',
        });
        return this.domElement;
    };
    this.setCurrentMark = function (mark) {
        var currentTurnPlayer = game.playerTurn[game.currentPlayer];
        var playerCoin = $("<img>").attr("src", currentTurnPlayer.coinImage);
        var currentElement = this.domElement[0];
        currentElement.setAttribute('box_owned_by', game.currentPlayer);
        $(currentElement).append(playerCoin);
        flipCoin(this.location.y, this.location.x);
        console.log(this.location.y, this.location.x);

    };
    this.getCurrentMark = function () {
        return this.domElement[0].attributes.box_owned_by;
    }
    this.score = function () {
        this.player1Score = 0;
        this.player2Score = 0;
        for (var y_axis = 0; y_axis < game.cells.length; y_axis++) {
            for (var x_axis = 0; x_axis < game.cells[y_axis].length; x_axis++) {
                if ($(game.cells[y_axis][x_axis].domElement[0]).attr('box_owned_by') == '0') {
                    this.player1Score++
                } else if ($(game.cells[y_axis][x_axis].domElement[0]).attr('box_owned_by') == '1') {
                    this.player2Score++
                }
            }
        }
        $(".p1_stat_box p:nth-child(2)").text(this.player1Score);
        $(".p2_stat_box p:nth-child(2)").text(this.player2Score);
    }
    this.checkForWin = function () {
        if (this.player1Score + this.player2Score === 64) {
            if (this.player1Score > this.player2Score) {
                alert('Player1 is the Winner!!!')
            } else if (this.player1Score < this.player2Score) {
                alert('Player2 is the Winner!!!!')
            }
        }

    }
}


/*************** flipCoin **************/

function flipCoin (y, x){

    var currentSpaceY = y;
    var currentSpaceX = x;
    var totalCellsToFlip = [];

    for( var k = currentSpaceY-1; k <= currentSpaceY+1; k++){
        for( var m = currentSpaceX-1; m <= currentSpaceX+1; m++){
            if(k !== -1 && k !== 8 && m !== -1 && m !== 8) {
                // $(".checkFlip").removeClass('checkFlip');
                // $(game.cells[k][m].domElement[0]).addClass('checkFlip');
                if (k > -1 && k < 8 && m > -1 && m < 8 && $(game.cells[k][m].domElement[0]).attr('box_owned_by') === (1 - game.currentPlayer).toString()) {
                    var y_axis = k - y;
                    var x_axis = m - x;
                    var possibleCells = []
                    var a = y + y_axis, b = x + x_axis;
                    if(a !== -1 && a !== 8 && b !== -1 && b !== 8) {
                        while (a !== -1 && a !== 8 && b !== -1 && b !== 8 && $(game.cells[a][b].domElement[0]) !== undefined && $(game.cells[a][b].domElement[0]).attr('box_owned_by') == (1 - game.currentPlayer)) {
                            // $(".checkFlip2").removeClass('checkFlip2');
                            // $(game.cells[a][b].domElement[0]).addClass('checkFlip2');
                            possibleCells.push($(game.cells[a][b].domElement[0]));
                            a += y_axis;
                            b += x_axis;
                        }
                        if (a !== -1 && a !== 8 && b !== -1 && b !== 8 && $(game.cells[a][b].domElement[0]).attr('box_owned_by') == game.currentPlayer) {
                            totalCellsToFlip = totalCellsToFlip.concat(possibleCells);
                        }
                    }
                }
            }
        }
    }
    for(var flipIndex=0; flipIndex<totalCellsToFlip.length; flipIndex++){
        var currentTurnPlayer = game.playerTurn[game.currentPlayer];
        totalCellsToFlip[flipIndex].attr('box_owned_by', game.currentPlayer).find('img').attr('src', currentTurnPlayer.coinImage);
    }
}



/***********************  Faction Select   ************************/
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

    $(game.cells[3][3].domElement[0])
        .attr("box_owned_by", "0")
        .append(player1coin_1)

    $(game.cells[4][4].domElement[0])
        .attr("box_owned_by", "0")
        .append(player1coin_2)

    $(game.cells[3][4].domElement[0])
        .attr("box_owned_by", "1")
        .append(player2coin_1)

    $(game.cells[4][3].domElement[0])
        .attr("box_owned_by", "1")
        .append(player2coin_2)

}




function checkAvailableSpace(currentPlayer) {
    var currentSpaceY = null;
    var currentSpaceX = null;
    var viableSpace = [];
    for (var y = 0; y < game.cells.length; y++) {
        for (var x = 0; x < game.cells[y].length; x++) {
            // $(".checkSpace").removeClass('checkSpace');
            // $(game.cells[y][x].domElement[0]).addClass('checkSpace');
            if ($(game.cells[y][x].domElement[0]).attr('box_owned_by') == currentPlayer) {
                currentSpaceY = y;
                currentSpaceX = x;
                for (var k = currentSpaceY - 1; k <= currentSpaceY + 1; k++) {
                    for (var m = currentSpaceX - 1; m <= currentSpaceX + 1; m++) {
                        // $(".checkSpace").removeClass('checkSpace');
                        // $(game.cells[k][m].domElement[0]).addClass('checkSpace');
                        if (k > -1 && k < 8 && m > -1 && m < 8 && $(game.cells[k][m].domElement[0]).attr('box_owned_by') == (1 - currentPlayer)) {
                            var y_axis = k - y;
                            var x_axis = m - x;

                            var a = y + y_axis, b = x + x_axis;
                            if(a !== -1 && a !== 8 && b !== -1 && b !== 8) {
                                while (a !== -1 && a !== 8 && b !== -1 && b !== 8 && $(game.cells[a][b].domElement[0]) !== undefined && $(game.cells[a][b].domElement[0]).attr('box_owned_by') == (1 - currentPlayer) ) {
                                    a += y_axis;
                                    b += x_axis;
                                    if (a !== -1 && a !== 8 && b !== -1 && b !== 8 && $(game.cells[a][b].domElement[0]).attr('box_owned_by') === undefined) {
                                        viableSpace.push([a, b]);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    $(".foundSpace").removeClass('foundSpace');
    return (viableSpace);
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

/******************** SOUND ***********************/
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
