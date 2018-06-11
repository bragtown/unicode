module.exports = class Card {
    constructor (name, emote, cost){
        this.name = name;
        this.emote = emote;
        this.cost = cost;
    }
    findTargets(params, game){
        if(params[0] == "attack"){
            let minions = true;
            let hero = true;
            let board = false;
            let self = false;
            let opponent = true;
            return game.getTargets(hero, minions, board, opponent, self, this)
        }
        if(params[0] == "playCard"){
            console.log('playcard');
            let minions = false;
            let hero = false;
            let board = true;
            let self = true;
            let opponent = false;
            return game.getTargets(hero, minions, board, opponent, self, this)
            
        }
        return false;
    }
}
