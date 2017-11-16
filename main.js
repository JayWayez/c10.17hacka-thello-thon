

$(document).ready(initializeApplication);

function initializeApplication() {

    window.game = new othello();
    game.createBlocks(8, 8);
    initialFourCoins();
    // playerSelectionModel();

}
/*********** Othello*************/
function playerSelectionModel (){
    $('#playerSelection').modal('show');
}
function othello(){
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
                    cell.domElement[0].style.backgroundColor="red";
                }else if(y%2!==0 && x%2!==0){
                    cell.domElement[0].style.backgroundColor="red";
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
    this.handleBlockClick = function(cell){
        var currentSymbol = this.getCurrentPlayerSymbol();
        if(cell.getCurrentMark()===''){
            cell.setCurrentMark(currentSymbol);
            // cell.domElement[0].classList.add("playeruniqueclassName"); // either add class;
            cell.domElement[0].setAttribute("faction","whatever"); // or either add attribute;
            this.toggleCurrentPlayer();
        }
        checkAvailableSpace(cell)
    }
}
/************  Block  **************/
function IndBlock(locationObj){
    this.location = locationObj;
    this.domElement = null;
    this.parentClickHandler = null;
    this.createDomElement = function(clickCallback){
        this.domElement = $("<div>",{
            'class': 'cell'
        });
        this.parentClickHandler = clickCallback;
        this.domElement.click( this.handleClick.bind(this) );
        return this.domElement;
    };
    this.handleClick = function(){
        this.parentClickHandler(this);
    };
    this.setCurrentMark = function(mark){
        var currentSymbol = game.playerTurn[game.currentPlayer];
        this.domElement.text(mark);
        this.domElement[0].setAttribute('box_owned_by', game.currentPlayer);

        // this.domElement[0].classList.remove("player2");
    };
    this.getCurrentMark = function(){
        return this.domElement.text();
    }
}




/************  Block  **************/

function houseList (){


    var player1 = {
        'house' : 'stark',
        'coinImage': 'images/stark.jpeg',
        'audio': 'audio/...',
        'flagImage': 'image/flag/...',
        'backgroundImg': 'image/background/...',
        'score': null,
        "symbol": "0"
    }
    var player2 = {
        'house' : 'greyjoy',
        'coinImage': 'images/greyjoy.jpeg',
        'audio': 'audio/...',
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





/************  Init 4 coins  **************/

function initialFourCoins() {
    let playerList = houseList();
    var player1coin_1 = $("<img>").attr("src", playerList[0].coinImage);
    var player1coin_2 = $("<img>").attr("src", playerList[0].coinImage);
    var player2coin_1 = $("<img>").attr("src", playerList[1].coinImage);
    var player2coin_2 = $("<img>").attr("src", playerList[1].coinImage);
    
    $(game.cells[3][3].domElement[0]).append(player1coin_1).attr("house", playerList[0].house);
    $(game.cells[4][4].domElement[0]).append(player1coin_2).attr("house", playerList[0].house);
    $(game.cells[3][4].domElement[0]).append(player2coin_1).attr("house", playerList[1].house);
    $(game.cells[4][3].domElement[0]).append(player2coin_2).attr("house", playerList[1].house);
    console.log("first 4 coins initialized");
}

var counter1=null;
var counter2= null;
function checkAvailableSpace(cell) {

    for (var y = 0; y < game.cells.length; y++) {
        for (var x = 0; x < game.cells[y].length; x++) {
            if(game.cells[y][x].domElement[0].innerHTML==="1"){
                counter2++;
            } else if(game.cells[y][x].domElement[0].innerHTML==="0"){
                counter1++;
            }
        }
    }
}
