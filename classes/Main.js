const Minion = require("./Minion");
const Hero = require("./Hero");
const Player = require("./Player");
const Game = require("./Game");
module.exports = class Main {
    constructor(){
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
    
        let result = this.game.doAction(params);
        let gameInst = result.game;
        let gameboard = `__________________________________________________________________________________________
        ${displayHand(gameInst.p2.hand, false)}
        [Deck ${gameInst.p2.deck.length}].....${displayHero(gameInst.p2)} 
        mana: ${gameInst.p2.manaLeft} 
        ${displayBoard(gameInst.p2.board)}
        ${displayBoard(gameInst.p1.board)}
        mana: ${gameInst.p1.manaLeft}
        [Deck ${gameInst.p1.deck.length}].....${displayHero(gameInst.p1)} 
        ${displayHand(gameInst.p1.hand, true)}
        ____________________________________________________________________________________________________________
        *${result.msg}*
        ____________________________________________________________________________________________________________`
        console.log(gameboard)
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
    board.forEach(minion=>{
        display += `[A:${minion.attack} ${minion.name} H:${minion.health}]`
    })
    return display
}

