const Minion = require("./Minion");
const Hero = require("./Hero");
const Player = require("./Player");
const Game = require("./Game");
module.exports = class Main {
    constructor(socket1, socket2, room, io){
        this.socket1 = socket1;
        this.socket2 = socket2;
        this.room = room;
        this.io=io;
        let deck1 = []
        let deck2 = []
        for(let i = 0; i < 30; i++){
            deck1[i] = new Minion("smiley", ":)", 2, 3, 2)
            deck2[i] = new Minion("angry", ";(", 2, 2, 3)
        }
        let hero1 = new Hero("HAPPY", ":)", 0, 30, 0)
        let hero2 = new Hero("ANGRY", ";(", 0, 30, 0)
        let p1 = new Player(deck1, hero1, 0);
        let p2 = new Player(deck2, hero2, 1);
        this.game = new Game(p1, p2);

    }
    listen(params){
        // console.log('this',this)
        let result = this.game.doAction(params);
        // let gameInst = result.game;
        // let gameboard = `__________________________________________________________________________________________\n
        // ${displayHand(gameInst.p2.hand, false)}\n
        // [Deck ${gameInst.p2.deck.length}].....${displayHero(gameInst.p2)}\n
        // mana: ${gameInst.p2.manaLeft} \n
        // ${displayBoard(gameInst.p2.board)}\n
        // ${displayBoard(gameInst.p1.board)}\n
        // mana: ${gameInst.p1.manaLeft}\n
        // [Deck ${gameInst.p1.deck.length}].....${displayHero(gameInst.p1)}\n 
        // ${displayHand(gameInst.p1.hand, true)}\n
        // ____________________________________________________________________________________________________________\n
        // *${result.msg}*\n
        // ____________________________________________________________________________________________________________`
        // // console.log(gameboard)
        return result;
    }
}
    
displayHero = function(player) {
    return `A:${player.hero.attack} ${player.hero.name} H:${player.hero.health}`
}
displayHand = function(hand, faceUp){
    let display = ''

    hand.forEach(card => {
        if(faceUp){
            display += `[${card.name} C:${card.cost}]`
        }
        else{
            display += `[${card.emote}]`
        }
    });
    return display;
}

displayBoard = function(board){
    let display = '';
    board.cards.forEach(minion=>{
        display += `[A:${minion.attack} ${minion.name} H:${minion.health}]`
    })
    return display
}

