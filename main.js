$(document).ready(initializeApplication);

function initializeApplication() {
    window.game = new Othello();
    game.createBlocks(8, 8);
    game.initialize();
    game.view.playerSelectionModal();
    game.view.playBackgroundMusic();
    // playerSelectionModal();
    // game.view.playBackgroundMusic();
    $(".close_modal_button").click(game.view.playBackgroundMusic);
    // $(".btn.btn-default").click(game.view.statusBarFlag);
    // $(".btn.btn-default").click(game.view.factionOst);
    /*===========================================Global Variables=========================================================*/


}


/*********** Othello*************/

function Othello(){
    var selfOthello = this;
    this.containerElement = $("#gameBoard");
    this.currentPlayer = 0;
    this.cells = [ ];
    this.playerTurn = [];
    this.initialize= function(){

        this.modal= new Modal();
        this.modal.initialize;
        this.view= new View(selfOthello);

    }
    ;
    this.createBlocks = function(row,column){
        var width= row;
        var length= column;

        for(var y = 0; y<width; y++){
            var row = [];

            for(var x =0; x<length; x++){
                var cell = new IndBlock({'x': x, 'y':y});

                var cellDomElement = cell.createDomElement( this.handleBlockClick.bind(this) );
                if(y%2===0 && x%2===0 || y%2!==0 && x%2!==0) {
                    cell.domElement[0].style.backgroundImage = "url('images/bg_2.png')";
                }else {
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
    this.checkForWin = function(value){
        //create if statement checking for total coin?
        if (this.modal.currentScore1 === 64 || this.modal.currentScore2 === 64){
            console.log("game over");
        }else if (this.modal.currentScore1 === 32 && this.modal.currentScore2 === 32){
            console.log("this is a draw");
        }else if(value === 0){

        }

    };

    //this function not yet
    this.getCurrentPlayerSymbol = function(){
        return this.playerTurn[this.currentPlayer].symbol;
    };
    this.score= function () {
        var counter1 = null;
        var counter2 = null;
        for (var i = 0; i < this.cells.length; i++) {
            for (var j = 0; j < this.cells[i].length; j++) {
                var currentCell = this.cells[i][j].domElement[0];
                if($(currentCell).attr("box_owned_by") === "1"){
                    counter2++
                }
                else if(($(currentCell).attr("box_owned_by") === "0")){
                    counter1++
                }
            }
        }
        this.modal.currentScore1= counter1;
        this.modal.currentScore2= counter2;

    };
    this.placePlayersBanner= function(){
        var player1Banner=$('<img>',{src: this.modal.player1Flag, class: 'playerBanners1'});
        var player2Banner=$('<img>',{src: this.modal.player2Flag, class: 'playerBanners2'});

        $('.p1_flag_box div:first-child').append(player1Banner);
        $('.p2_flag_box div:first-child').append(player2Banner);

    };
    this.toggleTurnIndicator=function(){
        if(this.currentPlayer==0){
            $('.playerBanners1').animate({
                height: 'show'
            }, "slow");
            $('.playerBanners2').animate({
                height: 'hide'
            }, "slow");
        }else{
            $('.playerBanners2').animate({
                height: 'show'
            },"slow");
            $('.playerBanners1').animate({
                height: 'hide'
            }, "slow");
        }
    };
    this.makeBlink= function(){
        $(event.target).toggleClass('imgSelectDiv');
    };
    /*=====================================================clickHandlers=======================================================*/

    this.allowClickHandler= function(locations){
        for(var i=0; i<locations.length; i++){
            for(var j=0; j<1; j++){
                if( $(this.cells[locations[i][j]][locations[i][j+1]].domElement[0]).attr('box_owned_by') == 'noOne'){
                    var clickableButton = this.cells[locations[i][j]][locations[i][j + 1]];
                    $(clickableButton.domElement[0]).addClass("available");
                    // $(clickableButton.domElement[0]).click(this.handleBlockClick.bind(this));
                    $(clickableButton.domElement[0]).click(this.handleBlockClick.bind(this,clickableButton));
                }
            }

        }
        //when there are no avail spaces to move triggers the no space function.
        if(locations.length===0){
            this.whenNoSpace();
            this.checkForWin(locations.length)
        }
        lastLocations=locations;
        return locations;
    };
    this.removeClickHandler= function(locations){
        for(var i=0; i<locations.length; i++){
            for(var j=0; j<1; j++){
                var clickableButton= this.cells[locations[i][j]][locations[i][j+1]];
                $(clickableButton.domElement[0]).unbind('click');
            }

        }
    };

    /*=====================================================CheckAvailSpace=======================================================*/

    this.checkAvailableSpace =function(currentPlayer) {
        var needToBeFlipped = [];
        var viableSpace = [];
        var currentSpaceY = null;
        var currentSpaceX = null;


        //search for all boxes owned by player
        for (var y = 0; y < this.cells.length; y++) {
            for (var x = 0; x < this.cells[y].length; x++) {
                if ($(this.cells[y][x].domElement[0]).attr('box_owned_by') == currentPlayer) {
                    currentSpaceY = y;
                    currentSpaceX = x;
                    //looks around the found player coin for enemy coins
                    for(var xDelta=-1; xDelta<2; xDelta++){
                        for(var yDelta=-1; yDelta<2; yDelta++){
                            //initial four conditions for corners
                            if(currentSpaceY+yDelta>-1 && currentSpaceX+xDelta>-1 &&currentSpaceX+xDelta<this.cells.length&&currentSpaceY+yDelta<this.cells.length&&  $(this.cells[currentSpaceY+yDelta][currentSpaceX+xDelta].domElement[0]).attr('box_owned_by') == 1-currentPlayer){
                                //if enemy coin found, searches all spaces through the same direction.
                                for(var y_vector=yDelta, x_vector=xDelta; y_vector<this.cells.length&& y_vector>-this.cells.length && x_vector<this.cells.length&&x_vector>-this.cells.length; y_vector=y_vector+yDelta, x_vector=x_vector+xDelta) {
                                    if (currentSpaceY + y_vector > -1 && currentSpaceY + y_vector<this.cells.length && currentSpaceX + x_vector> - 1 &&currentSpaceX + x_vector<this.cells.length) {

                                        $(this.cells[currentSpaceY + y_vector][currentSpaceX + x_vector].domElement[0]).addClass('highlight');

                                        if ($(this.cells[currentSpaceY + y_vector][currentSpaceX + x_vector].domElement[0]).attr('box_owned_by') == 1 - currentPlayer) {
                                            //pushing as object enemy cell found location, current location, and vector direction.
                                            viableSpace.push([currentSpaceY + y_vector, currentSpaceX + x_vector]);
                                        } else if ($(this.cells[currentSpaceY + y_vector][currentSpaceX + x_vector].domElement[0]).attr('box_owned_by') == currentPlayer) {
                                            //to stop the loop if value found
                                            y_vector = this.cells.length + 8;
                                            x_vector = this.cells.length + 8;
                                        } else if ($(this.cells[currentSpaceY + y_vector][currentSpaceX + x_vector].domElement[0]).attr('box_owned_by') === 'noOne') {
                                            viableSpace.push([currentSpaceY + y_vector, currentSpaceX + x_vector]);
                                            y_vector = this.cells.length + 8;
                                            x_vector = this.cells.length + 8;
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

        //viableSpace contains both available moves and probable flip locations.
        return (viableSpace);
    };
    this.whenNoSpace=function (){
        //need if statement to check if its the end of game or middle of game
        console.log("no available move for Current Player");
        this.toggleCurrentPlayer();
    };
    /*=====================================================FlipCoin=======================================================*/

    this.flipCoin= function(y, x){

        var currentSpaceY = y;
        var currentSpaceX = x;
        var totalCellsToFlip = [];

        for( var k = currentSpaceY-1; k <= currentSpaceY+1; k++){
            for( var m = currentSpaceX-1; m <= currentSpaceX+1; m++){
                if(k !== -1 && k !== 8 && m !== -1 && m !== 8) {
                    // $(".checkFlip").removeClass('checkFlip');
                    // $(this.cells[k][m].domElement[0]).addClass('checkFlip');
                    if (k > -1 && k < 8 && m > -1 && m < 8 && $(this.cells[k][m].domElement[0]).attr('box_owned_by') === (1 - this.currentPlayer).toString()) {
                        var y_axis = k - y;
                        var x_axis = m - x;
                        var possibleCells = []
                        var a = y + y_axis, b = x + x_axis;
                        if(a !== -1 && a !== 8 && b !== -1 && b !== 8) {
                            while (a !== -1 && a !== 8 && b !== -1 && b !== 8 && $(this.cells[a][b].domElement[0]) !== undefined && $(this.cells[a][b].domElement[0]).attr('box_owned_by') == (1 - this.currentPlayer)) {
                                // $(".checkFlip2").removeClass('checkFlip2');
                                // $(game.cells[a][b].domElement[0]).addClass('checkFlip2');
                                possibleCells.push($(this.cells[a][b].domElement[0]));
                                a += y_axis;
                                b += x_axis;
                            }
                            if (a !== -1 && a !== 8 && b !== -1 && b !== 8 && $(this.cells[a][b].domElement[0]).attr('box_owned_by') == this.currentPlayer) {
                                totalCellsToFlip = totalCellsToFlip.concat(possibleCells);
                            }
                        }
                    }
                }
            }
        }
        for(var flipIndex=0; flipIndex<totalCellsToFlip.length; flipIndex++){
            var currentTurnPlayer = this.playerTurn[this.currentPlayer];
            totalCellsToFlip[flipIndex].attr('box_owned_by', this.currentPlayer).find('img').attr('src', currentTurnPlayer.coinImage);
        }
    };
    /*=============================================When clicked=======================================================*/
    /*=============================================When clicked=======================================================*/
    this.handleBlockClick = function(cell){
        var currentSymbol = this.getCurrentPlayerSymbol();
        //check if the button has been clicked.
        if(cell.getCurrentMark()=== 'noOne'){
            //chung's version flipCoin handler
            // flipCoin(checkAvailableSpace(game.currentPlayer),this.location.y,this.location.x, game.currentPlayer);
            this.flipCoin(cell.location.y,cell.location.x);
            cell.setCurrentMark(currentSymbol);
            this.toggleCurrentPlayer();
        }
        var element= document.body.getElementsByClassName('available');
        $(element).removeClass("available");
        this.removeClickHandler(lastLocations);
        this.allowClickHandler(this.checkAvailableSpace(this.currentPlayer));
        this.score();
        this.view.displayOutput([this.modal.currentScore1, this.modal.currentScore2]);
        this.checkForWin;
        this.view.factionOst();
        this.toggleTurnIndicator();

    }
}

/*=================================================================================================================*/
/*=================================================================================================================*/
function Modal(){
    this.currentScore1= null;
    this.currentScore2= null;
    this.counter = true;
    this.backgroundMusic= new Audio();
    this.backgroundMusic.src = "sounds/main_song.mp3";
    this.OstisPlaying=false;

    this.initialize= function(){
        this.lastLocations;
        this.playerSong1= new Audio();
        this.playerSong2= new Audio();
        this.playerSong1Src=$(game.playerTurn[0]).attr("audio");
        this.playerSong2Src=$(game.playerTurn[1]).attr("audio");
        this.playerSong1.src= this.playerSong1Src;
        this.playerSong2.src= this.playerSong2Src;

        this.player1Flag=$(game.playerTurn[0]).attr("flagImage");
        this.player2Flag=$(game.playerTurn[1]).attr("flagImage");
    };
    this.houseList={
        stark : {
            house: "stark",
            coinImage: "images/stark.png",
            audio: "sounds/stark.mp3",
            flagImage: "images/stark_flag.png",
            backgroundImg: "images/stark_flag.png",
            score: null,
            symbol: "0"
        },
        greyjoy : {
            house: "greyjoy",
            coinImage: "images/greyjoy.png",
            audio: "sounds/greyjoy.mp3",
            flagImage: "images/greyjoy_flag.png",
            backgroundImg: "images/greyjoy.png",
            score: null,
            symbol: "1"
        },
        lannister : {
            house: "lannister",
            coinImage: "images/lannister.png",
            audio: "sounds/lanister.mp3",
            flagImage: "images/lannister_flag.png",
            backgroundImg: "images/lannister_flag.png",
            score: null
        },
        targaryen : {
            house: "targaryen",
            coinImage: "images/targaryen.png",
            audio: "sounds/Targaryen.mp3",
            flagImage: "images/tagaryen_flag.png",
            backgroundImg: "images/tagaryen_flag.png",
            score: null
        }
    };

}

function View(){
    this.displayOutput =function (counters){
        var counter=counters;
        $(".p1_stat_box p:nth-child(2)").text(counter[0]);
        $(".p2_stat_box p:nth-child(2)").text(counter[1]);
    };
    /************  Init 4 coins  **************/

    this.initialFourCoins= function() {
        // var playerList = game.modal.houseList.player1;
        // var playerList2=game.modal.houseList.player2;
        var player1coin_1 = $("<img>").attr("src", game.playerTurn[0].coinImage);
        var player1coin_2 = $("<img>").attr("src", game.playerTurn[0].coinImage);
        var player2coin_1 = $("<img>").attr("src", game.playerTurn[1].coinImage);
        var player2coin_2 = $("<img>").attr("src", game.playerTurn[1].coinImage);

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
    };
    this.playerSelectionModal = function() {
        var modal = document.getElementById("modal");
        modal.style.display = "block";
        $(".stark").on("click", this.players.bind(game.modal,'stark'));
        $(".lannister").on("click", this.players.bind(game.modal,'lannister'));
        $(".targaryen").on("click", this.players.bind(game.modal,'targaryen'));
        $(".greyjoy").on("click", this.players.bind(game.modal,'greyjoy'));
        // close_modal_handle();
    };
    /*====================================================GameStart========================================================*/
    /*====================================================GameStart========================================================*/

    this.players = function(playerSelected){
        if(game.modal.counter){
            game.playerTurn.push(this.houseList[playerSelected]);
            game.modal.counter = false;
        }else {
            game.playerTurn.push(this.houseList[playerSelected]);
            $(".close_modal_button").on("click", function() {
                modal.style.display = "none";
                game.view.initialFourCoins();
                game.modal.initialize();
                game.placePlayersBanner();
                game.allowClickHandler(game.checkAvailableSpace(game.currentPlayer));
                game.toggleTurnIndicator();
                game.view.factionOst();

            });
        }
    };
    /*==================================================== Sounds  ========================================================*/

    this.factionOst=function (){
        if(game.currentPlayer === 1){
            game.modal.playerSong1.pause();
            game.modal.playerSong2.play();
        }else{
            game.modal.playerSong2.pause();
            game.modal.playerSong1.play();
        }
    };

    this.playBackgroundMusic=function (){

        if(game.modal.OstisPlaying){
            game.modal.backgroundMusic.pause();
            game.modal.OstisPlaying= false;
        }else {
            game.modal.backgroundMusic.play();
            game.modal.OstisPlaying= true;
        }
    };
    /*=================================================Faction Select=====================================================*/
    this.statusBarFlag=function () {
        var playerList = game.modal.houseList();
        //put coin image for now, need to change to flag
        var player1flag = $("<img>").attr("src", playerList[0].coinImage);
        var player2flag = $("<img>").attr("src", playerList[1].coinImage);

        $('.p1_flag_box').append(player1flag);
        $('.p2_flag_box').append(player2flag);
    }





}
/*==================================================== Block  ========================================================*/
/*====================================================================================================================*/

function IndBlock(locationObj){
    this.IndBlockSelf=this;
    this.location = locationObj;
    this.domElement = null;
    this.parentClickHandler = null;
    this.createDomElement = function(clickCallback){
        this.domElement = $("<div>",{
            'class': 'cell test',
            'box_owned_by': 'noOne',
            // text: 'x:'+locationObj.x+',y:'+locationObj.y
        });
        this.parentClickHandler = clickCallback;
        this.domElement.click( this.handleClick.bind(this));
        return this.domElement;
    };
    this.handleClick = function(){
        this.parentClickHandler(this);
    }
    this.setCurrentMark = function(mark){
        var currentTurnPlayer = game.playerTurn[game.currentPlayer];
        var playerCoin = $("<img>").attr("src", currentTurnPlayer.coinImage);
        var currentElement= this.domElement[0];
        currentElement.setAttribute('box_owned_by', game.currentPlayer);
        $(currentElement).append(playerCoin);
        // flipCoin(checkAvailableSpace(game.currentPlayer),this.location.y, this.location.x);

    };
    this.getCurrentMark = function(){
        return $(this.domElement[0]).attr("box_owned_by")
    }
}
/*====================================================================================================================*/
/*====================================================================================================================*/




/*==============================================FLIP COIN=============================================================*/
/*====================================================================================================================*/
//Chung's version, still needs to be fixed;
// function flipCoin (location,y,x, currentPlayer){
//     var locations=location;
//     var currentY=y;
//     var currentX=x;
//     var totalCellsToFlip = [];
//     var possibleCells = [];
//     for(var i=locations.length-1; i>=0; i--){
//         for(var j=0; j<1;j++){
//             if(locations[i][j]=== currentY &&locations[i][j+1]===currentX){
//                 locations.splice(i,locations.length-i);
//                 i=locations.length-1;
//                 j=0;
//                 for(var arraylocation_i=locations.length-1; arraylocation_i>=0; arraylocation_i--){
//                     for(var arrayIndex_j=0; arrayIndex_j<1; arrayIndex_j++){
//                         if($(game.cells[locations[arraylocation_i][arrayIndex_j]][locations[arraylocation_i][arrayIndex_j+1]].domElement[0]).attr('box_owned_by')==1-currentPlayer){
//                             possibleCells.push($(game.cells[locations[arraylocation_i][arrayIndex_j]][locations[arraylocation_i][arrayIndex_j+1]].domElement[0]));
//                             locations.pop();
//                         } else{
//                             //temporary patch;
//                             arraylocation_i=-1
//                         }
//                     }
//                 }
//             }
//         }
//
//     }
//     totalCellsToFlip = totalCellsToFlip.concat(possibleCells);
//     for (var flipIndex = 0; flipIndex < totalCellsToFlip.length; flipIndex++) {
//         var currentTurnPlayer = game.playerTurn[game.currentPlayer];
//         totalCellsToFlip[flipIndex].attr('box_owned_by', currentPlayer).find('img').attr('src', currentTurnPlayer.coinImage);
//     }
//
//
// }
