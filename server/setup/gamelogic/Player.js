const Minion = require("./Minion");
const Hero = require("./Hero");
const Board = require('./Board');
module.exports = class Player {
    constructor(deck, hero, playerId){
        this.playerId = playerId;
        this.deck = deck;
        this.hand = [];
        this.board = new Board([]);
        this.hero = hero;
        this.turn = false;
        this.mana = 0;
        this.manaLeft = 0;
    }
    draw (number){
        for(let i = 0; i < number; i++){
            // console.log("drawing...")
            this.hand.push(this.deck.pop());
        }
    }
    findTargets(hero,minion,board, returnable, card){
        console.log('finding targets', hero,minion,board);
        if(hero){
            this.hero.isTargetable(card, this);
        }
        if(minion){
            // console.log("Board Minions", this.board)
            this.board.cards.forEach((minion, index)=>{
                minion.isTargetable(card, this)
            })

        }
        if(board){
            console.log('checking targets');
            this.board.isTargetable(card, this);
        }
    }
    releaseTargets(){
        this.hero.setToTarget = false;
        this.board.cards.forEach(minion=>{
            minion.setToTarget = false;
        })
        this.board.setToTarget = false;

    }
    destroyMinions(){
        this.board.cards.forEach((minion,index,arr)=>{
            if(minion.health <= 0){
                arr.splice(index,1);
            }
        })
    }
    playToBoard(actionParams){
        let boardSpot = actionParams[0];
        let cardNumber = actionParams[1];
        
        // console.log("Playing to board...")
        let card = this.hand[cardNumber];
        if(card.cost <= this.manaLeft){
            this.board.cards.splice(boardSpot, 0, this.hand.splice(cardNumber, 1)[0]);
            this.manaLeft -= card.cost;
            // console.log("Mana left is " + this.manaLeft)
            return true;
        }
        return false;
    }
    
    
}
