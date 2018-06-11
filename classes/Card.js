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
            return game.getTargets(hero, minions, board, opponent, self)
        }
        return false;
    }
}
