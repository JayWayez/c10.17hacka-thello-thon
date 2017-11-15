$(document).ready(initializeApplication);

function initializeApplication(){
    window.game = new othello();
    game.createBlocks(8,8);
/*********** Othello*************/

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
}}