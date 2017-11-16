

$(document).ready(initializeApplication);

function initializeApplication() {

    window.game = new othello();
    game.createBlocks(8, 8);
    // playerSelectionModel();

}
/*********** Othello*************/
// function playerSelectionModel (){
//     $('#playerSelection').modal('show');
// }
function othello(){
    this.containerElement = $("#gameBoard");
    this.currentPlayer = 0;
    this.playerTurn = [0,1];
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
        return this.playerTurn[this.currentPlayer];
    };
    this.handleBlockClick = function(cell){
        var currentSymbol = this.getCurrentPlayerSymbol();
        if(cell.getCurrentMark()===''){
            cell.setCurrentMark(currentSymbol);
            cell.domElement[0].classList.add("playeruniqueclassName"); // either add class;
            cell.domElement[0].setAttribute("faction","whatever"); // or either add attribute;
            this.toggleCurrentPlayer();
        }
        checkAvailableSpace()
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
        this.domElement.text(mark);
        this.domElement[0].classList.add("player1");

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
        'coinImage': 'image/coin/...',
        'audio': 'audio/...',
        'flagImage': 'image/flag/...',
        'backgroundImg': 'image/background/...',
        'score': null
    }
    var player2 = {
        'house' : 'greyjoy',
        'coinImage': 'image/coin/...',
        'audio': 'audio/...',
        'flagImage': 'image/flag/...',
        'backgroundImg': 'image/background/...',
        'score': null
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






///////score/////////////////////////////////////
function score(){

    var isClicked = false;

    for (var i = 0; i < game.cells.length; i++){
        for (var j = 0; j < game.cells[i].length; i++){
            var currentCell = game.cells[i][j].domElement[0];
            if(currentCell.innerHTML==="1" && $(currentCell).attr('isClicked') === undefined){
                    isClicked = true;
                    counter2++;
            }else if(currentCell.innerHTML==="0" && $(currentCell).attr('isClicked') === undefined){
                isClicked = true;
                counter1++;
            }
        }
    }
}


var counter1=null;
var counter2= null;
function checkAvailableSpace() {
    var isClicked = false;
    for (var y = 0; y < game.cells.length; y++) {
        for (var x = 0; x < game.cells[y].length; x++) {
            var currentCell = game.cells[y][x].domElement[0];

            if(currentCell.innerHTML==="1" && $(currentCell).attr('isClicked') === undefined){
                counter2++;
                // isClicked = true;
                $(currentCell).attr('isClicked', true);
            } else if(currentCell.innerHTML==="0" && $(currentCell).attr('isClicked') === undefined){
                counter1++;
                // isClicked = true;
                $(currentCell).attr('isClicked', true);
            }
        }
    }
}
