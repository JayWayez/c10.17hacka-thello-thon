
$(document).ready(initializeApplication);

function initializeApplication() {

    window.game = new Othello();
    game.playerSelectionModal()
    $(".close_modal_button").prop('disabled', true)

    backgroundMusic.loop = true;
    backgroundMusic.play();

    $(".winModal").on('hidden.bs.modal', restartGame.bind(this));
    $("#noMoreMove").on('hidden.bs.modal', restartGame.bind(this));


}



/*********** GLOBAL VARIABLE ***************/
var counter = true;
var counterForRestart = true;
var counterForRestartDouble = true;

/**** SOUND ****/

var backgroundMusic = new Audio('sounds/bgm.mp3');
var winnerMusic = new Audio('sounds/winnerMusic.mp3');
var clickSound = new Audio('sounds/clickSound.mp3');

clickSound.volume = 0.5;



/*********** Othello*************/

function Othello(){
    // var selfOthello = this;
    this.containerElement = $("#gameBoard");
    this.currentPlayer = 0;
    this.playerTurn = [];
    this.cells = [ ];


    this.init = function(){
        if(counterForRestart) {
            game.createBlocks(8, 8);
            game.initialFourCoins();
            game.statusBarFlag();
            allowClickHandler(checkAvailableSpace(game.currentPlayer));
            $('.p1_flag_box :first-child').addClass('currentPlayerShow_' + game.playerTurn[0].house);
            $('.player1 > h3').text(game.playerTurn[0].house.toUpperCase());
            $('.player2 > h3').text(game.playerTurn[1].house.toUpperCase());
        }

    }

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
        $('#modal').modal({backdrop: true});
        $(".stark").on("click", this.players.bind(this,'stark'));
        $(".lannister").on("click", this.players.bind(this,'lannister'));
        $(".targaryen").on("click", this.players.bind(this,'targaryen'));
        $(".greyjoy").on("click", this.players.bind(this,'greyjoy'));
    }
    this.players = function(playerSelected){
        if(counter){
            game.playerTurn.push(game.houseList[playerSelected]);
            clickSound.play();

            $('.'+playerSelected).addClass('selected').removeClass('selection').siblings('.playerNumShow').text('Player1');
            $('.'+playerSelected).unbind('click');
            counter = false;
        }else {
            game.playerTurn.push(game.houseList[playerSelected]);
            clickSound.play();

            $('.'+playerSelected).addClass('selected').removeClass('selection').siblings('.playerNumShow').text('Player2');
            $('.'+playerSelected).unbind('click');

            $('.players').unbind('click');
            $('.selection').removeClass('selection');

            $(".close_modal_button").prop('disabled', false);
            $(".close_modal_button").on("click", function() {
                modal.style.display = "none";
                game.init();
                if(!counterForRestartDouble){
                   counterForRestart = false;
                }

            });
        }

    }
    this.statusBarFlag = function() {
        $('.p1_flag_box :first-child').css('background-image', 'url(' + this.playerTurn[0].flagImage + ')');
        $('.p2_flag_box :first-child').css('background-image', 'url(' + this.playerTurn[1].flagImage + ')');
    }

    this.showCurrentPlayer = function(){
        if(this.currentPlayer == 0){
            $('.p1_flag_box :first-child').addClass('currentPlayerShow_' + game.playerTurn[0].house)
            $('.p2_flag_box :first-child').removeClass('currentPlayerShow_' + game.playerTurn[1].house)
        }else if(this.currentPlayer == 1){
            $('.p2_flag_box :first-child').addClass('currentPlayerShow_' + game.playerTurn[1].house)
            $('.p1_flag_box :first-child').removeClass('currentPlayerShow_' + game.playerTurn[0].house)
        }
    }

    this.houseList = {
        stark : {
            house: "stark",
            coinImage: "images/stark.png",
            audio: "audio/...",
            flagImage: "images/stark_flag.png",
            backgroundImg: "image/background/...",
        },
        greyjoy : {
            house: "greyjoy",
            coinImage: "images/greyjoy.png",
            audio: "audio/...",
            flagImage: "images/greyjoy_flag.png",
            backgroundImg: "image/background/...",
        },
        lannister : {
            house: "lannister",
            coinImage: "images/lannister.png",
            audio: "audio/...",
            flagImage: "images/lannister_flag.png",
            backgroundImg: "image/background/...",
        },
        targaryen : {
            house: "targaryen",
            coinImage: "images/targaryen.png",
            audio: "audio/...",
            flagImage: "images/tagaryen_flag.png",
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
        clickSound.play();
        //check if the button has been clicked.
        if(this.getCurrentMark()=== undefined){
            this.setCurrentMark(currentSymbol);
            game.toggleCurrentPlayer();
        }
        var element= document.body.getElementsByClassName('available_' + game.playerTurn[1 - game.currentPlayer].house);
        $(element).removeClass('available_' + game.playerTurn[1 - game.currentPlayer].house);


        this.score();
        this.checkForWin();
        removeClickHandler(lastLocations);

        allowClickHandler(checkAvailableSpace(game.currentPlayer));
        game.showCurrentPlayer()

    }

}

/************  Block  **************/
function IndBlock(locationObj) {
    this.IndBlockSelf = this;
    this.location = locationObj;
    this.domElement = null;
    this.createDomElement = function () {
        this.domElement = $("<div>", {
            'class': 'cell test',
            // text: 'x:'+locationObj.x+',y:'+locationObj.y
        });
        return this.domElement;
    };
    this.setCurrentMark = function () {
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
                $("#"+game.playerTurn[0].house +"_win").modal({backdrop: true});
                backgroundMusic.muted = true;
                winnerMusic.muted = false;
                winnerMusic.play();
                // $("#"+game.playerTurn[0].house +"_win").on('hidden.bs.modal', restartGame());

            } else if (this.player1Score < this.player2Score) {
                $("#"+game.playerTurn[1].house +"_win").modal({backdrop: true});
                backgroundMusic.muted = true;
                winnerMusic.muted = false;

                winnerMusic.play();
                // $("#"+game.playerTurn[1].house +"_win").on('hidden.bs.modal', restartGame());

            }
        }else if(this.player1Score + this.player2Score === 64 && this.player1Score == this.player2Score){
            $("#tie").modal({backdrop: true});
            // $("#tie").on('hidden.bs.modal', restartGame());

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
                if (k > -1 && k < 8 && m > -1 && m < 8 && $(game.cells[k][m].domElement[0]).attr('box_owned_by') === (1 - game.currentPlayer).toString()) {
                    var y_axis = k - y;
                    var x_axis = m - x;
                    var possibleCells = []
                    var a = y + y_axis, b = x + x_axis;
                    if(a !== -1 && a !== 8 && b !== -1 && b !== 8) {
                        while (a !== -1 && a !== 8 && b !== -1 && b !== 8 && $(game.cells[a][b].domElement[0]) !== undefined && $(game.cells[a][b].domElement[0]).attr('box_owned_by') == (1 - game.currentPlayer)) {
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

/************** Check VIABLE SPACE *************/
function checkAvailableSpace(currentPlayer) {
    var currentSpaceY = null;
    var currentSpaceX = null;
    var viableSpace = [];
    for (var y = 0; y < game.cells.length; y++) {
        for (var x = 0; x < game.cells[y].length; x++) {
            if ($(game.cells[y][x].domElement[0]).attr('box_owned_by') == currentPlayer) {
                currentSpaceY = y;
                currentSpaceX = x;
                for (var k = currentSpaceY - 1; k <= currentSpaceY + 1; k++) {
                    for (var m = currentSpaceX - 1; m <= currentSpaceX + 1; m++) {
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
            $(clickableButton.domElement[0]).addClass('available_' + game.playerTurn[game.currentPlayer].house);
            $(clickableButton.domElement[0]).click(game.handleBlockClick.bind(clickableButton));
        }

    }
    //when there are no avail spaces to move triggers the no space function.
    if(locations.length===0 && parseFloat($('.score1').text()) + parseFloat($('.score2').text()) < 64){
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
    backgroundMusic.muted = true;
    winnerMusic.muted = false;
    winnerMusic.play();
    game.toggleCurrentPlayer();
    $("#noMoreMove").modal({backdrop: true});


    // return;
}


function restartGame(){
    backgroundMusic.muted = false;
    winnerMusic.muted = true;
    $('.players').bind('click').addClass('selection').removeClass('selected');
    $('.playerNumShow').text('');
    $('#gameBoard div').remove();
    counter = true;
    initializeApplication();
    counterForRestart = true;
    counterForRestartDouble = false;


}














